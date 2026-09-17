/**
 * Smoke test end-to-end untuk website Kopi Cuy.
 *
 * Cara pakai:
 *   1. npm run build && npm run start        (atau npm run dev)
 *   2. npm run smoke                         (default http://localhost:3000)
 *      PORT=3124 npm run smoke
 *
 * Tidak butuh dependency tambahan: skrip ini mengendalikan Google Chrome yang
 * sudah terpasang lewat Chrome DevTools Protocol dan WebSocket bawaan Node.
 * Set CHROME_PATH kalau Chrome ada di lokasi lain.
 */
import { spawn } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

const BASE_URL = process.env.BASE_URL ?? `http://localhost:${process.env.PORT ?? 3000}`;
const DEBUG_PORT = Number(process.env.CDP_PORT ?? 9334);

const chromeCandidates = {
  win32: [
    process.env.CHROME_PATH,
    "C:/Program Files/Google/Chrome/Application/chrome.exe",
    "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  ],
  darwin: [
    process.env.CHROME_PATH,
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  ],
  linux: [
    process.env.CHROME_PATH,
    "/usr/bin/google-chrome",
    "/usr/bin/chromium",
    "/usr/bin/chromium-browser",
  ],
};

const results = [];
const consoleErrors = [];

function check(name, condition, detail = "") {
  results.push({ name, ok: Boolean(condition), detail });
  const status = condition ? "PASS" : "FAIL";
  console.log(`${status}  ${name}${detail ? ` — ${detail}` : ""}`);
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/* --------------------------------------------------------------- CDP client */
class CdpClient {
  constructor(wsUrl) {
    this.wsUrl = wsUrl;
    this.id = 0;
    this.pending = new Map();
    this.handlers = new Map();
  }

  connect() {
    return new Promise((resolve, reject) => {
      this.ws = new WebSocket(this.wsUrl);
      this.ws.onopen = () => resolve();
      this.ws.onerror = (event) => reject(new Error(`WebSocket gagal: ${event.message ?? "error"}`));
      this.ws.onmessage = (event) => {
        const message = JSON.parse(event.data);
        if (message.id && this.pending.has(message.id)) {
          const { resolve: done, reject: fail } = this.pending.get(message.id);
          this.pending.delete(message.id);
          if (message.error) fail(new Error(message.error.message));
          else done(message.result);
          return;
        }
        const listeners = this.handlers.get(message.method) ?? [];
        listeners.forEach((listener) => listener(message.params));
      };
    });
  }

  send(method, params = {}) {
    this.id += 1;
    const id = this.id;
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }

  on(method, listener) {
    const listeners = this.handlers.get(method) ?? [];
    listeners.push(listener);
    this.handlers.set(method, listeners);
  }

  close() {
    this.ws?.close();
  }
}

/* ------------------------------------------------------------------ helpers */
const setInput = `
function setInput(selector, value) {
  const node = document.querySelector(selector);
  if (!node) return false;
  const prototype = node instanceof HTMLTextAreaElement
    ? HTMLTextAreaElement.prototype
    : node instanceof HTMLSelectElement
      ? HTMLSelectElement.prototype
      : HTMLInputElement.prototype;
  const setter = Object.getOwnPropertyDescriptor(prototype, "value").set;
  setter.call(node, value);
  node.dispatchEvent(new Event("input", { bubbles: true }));
  node.dispatchEvent(new Event("change", { bubbles: true }));
  return true;
}
function byText(selector, text) {
  return [...document.querySelectorAll(selector)].find((node) =>
    (node.textContent ?? "").trim().toLowerCase().includes(text.toLowerCase())
  );
}
function clickByText(selector, text) {
  const node = byText(selector, text);
  if (!node) return false;
  node.click();
  return true;
}
`;

async function main() {
  const candidates = chromeCandidates[process.platform] ?? chromeCandidates.linux;
  const chromePath = candidates.find((candidate) => candidate && candidate.length);
  const userDataDir = mkdtempSync(path.join(tmpdir(), "kopicuy-smoke-"));

  const chrome = spawn(
    chromePath,
    [
      "--headless=new",
      "--disable-gpu",
      "--no-first-run",
      "--no-default-browser-check",
      `--remote-debugging-port=${DEBUG_PORT}`,
      `--user-data-dir=${userDataDir}`,
      "--window-size=1366,900",
      "about:blank",
    ],
    { stdio: "ignore" }
  );

  // Chrome harus selalu dimatikan, termasuk kalau ada pemeriksaan yang error.
  globalCleanup.push(() => {
    try {
      chrome.kill();
    } catch {
      /* ignore */
    }
  });

  const cleanup = () => {
    try {
      chrome.kill();
    } catch {
      /* ignore */
    }
    try {
      rmSync(userDataDir, { recursive: true, force: true });
    } catch {
      /* ignore */
    }
  };

  // Tunggu Chrome siap dan ambil target halaman.
  let target = null;
  for (let attempt = 0; attempt < 40 && !target; attempt += 1) {
    await delay(250);
    try {
      const list = await fetch(`http://127.0.0.1:${DEBUG_PORT}/json/list`).then((res) => res.json());
      target = list.find((entry) => entry.type === "page");
    } catch {
      /* Chrome belum siap */
    }
  }

  if (!target) {
    cleanup();
    throw new Error("Tidak bisa terhubung ke Chrome untuk smoke test.");
  }

  const client = new CdpClient(target.webSocketDebuggerUrl);
  await client.connect();

  client.on("Runtime.exceptionThrown", (params) => {
    consoleErrors.push(`exception: ${params.exceptionDetails?.text ?? "unknown"}`);
  });
  client.on("Runtime.consoleAPICalled", (params) => {
    if (params.type === "error") {
      consoleErrors.push(
        `console.error: ${(params.args ?? []).map((arg) => arg.value ?? arg.description).join(" ")}`
      );
    }
  });

  await client.send("Page.enable");
  await client.send("Runtime.enable");

  const evaluate = async (expression) => {
    const result = await client.send("Runtime.evaluate", {
      expression: `(async () => { ${setInput}\n${expression} })()`,
      awaitPromise: true,
      returnByValue: true,
    });
    if (result.exceptionDetails) {
      throw new Error(result.exceptionDetails.text ?? "evaluate gagal");
    }
    return result.result.value;
  };

  const visit = async (route, waitMs = 1400) => {
    await client.send("Page.navigate", { url: `${BASE_URL}${route}` });
    await delay(waitMs);
  };

  /* ------------------------------------------------------------- 1. Beranda */
  await visit("/", 2600);
  const home = await evaluate(`
    // scroll supaya gambar lazy ikut dimuat
    window.scrollTo(0, document.body.scrollHeight);
    await new Promise((resolve) => setTimeout(resolve, 2500));
    window.scrollTo(0, 0);
    await new Promise((resolve) => setTimeout(resolve, 400));
    const images = [...document.querySelectorAll("img")];
    const text = document.body.textContent ?? "";
    return {
      headline: text.includes("Ngopi Santai"),
      cta: [...document.querySelectorAll("a")].some((a) => a.getAttribute("href") === "/menu"),
      images: images.length,
      loaded: images.filter((img) => img.naturalWidth > 0).length,
      fallbacks: document.querySelectorAll("div.bg-gradient-to-br.from-beige").length,
      sections: text.includes("Paling sering dipesan"),
      footer: text.includes("Jam Operasional") && text.includes("Kopi Cuy"),
      whatsapp: [...document.querySelectorAll("a")].some((a) => (a.href ?? "").includes("wa.me/")),
    };
  `);
  check("Beranda - headline hero tampil", home.headline);
  check("Beranda - tombol Lihat Menu ke /menu", home.cta);
  check("Beranda - section menu & footer tampil", home.sections && home.footer);
  check("Beranda - link WhatsApp tersedia", home.whatsapp);
  check(
    "Beranda - foto termuat tanpa placeholder fallback",
    home.images > 0 && home.loaded === home.images && home.fallbacks === 0,
    `${home.loaded}/${home.images} foto, fallback ${home.fallbacks}`
  );

  /* ---------------------------------------------------------- 2. Filter menu */
  await visit("/menu", 1800);
  const totalCards = await evaluate(
    `return document.querySelectorAll("article:has(button[aria-label^='Lihat detail'])").length;`
  );
  check("Menu - semua kartu menu tampil", totalCards === 36, `${totalCards} kartu`);

  await evaluate(`return clickByText("button", "Coffee");`);
  await delay(500);
  const coffeeCards = await evaluate(
    `return document.querySelectorAll("article:has(button[aria-label^='Lihat detail'])").length;`
  );
  check("Menu - filter kategori Coffee", coffeeCards === 9, `${coffeeCards} kartu`);

  await evaluate(`return clickByText("button", "Semua");`);
  await delay(400);
  await evaluate(`return setInput("input[type='search']", "croffle");`);
  await delay(500);
  const searchCards = await evaluate(
    `return document.querySelectorAll("article:has(button[aria-label^='Lihat detail'])").length;`
  );
  check("Menu - pencarian 'croffle'", searchCards === 2, `${searchCards} hasil (Croffle + Croffle Nutella)`);

  await evaluate(`return setInput("input[type='search']", "menu yang tidak ada");`);
  await delay(500);
  const emptyState = await evaluate(`
    return {
      text: document.body.textContent.includes("Menu tidak ditemukan"),
      reset: [...document.querySelectorAll("button")].some((b) => b.textContent.includes("Reset pencarian")),
    };
  `);
  check("Menu - empty state saat pencarian kosong", emptyState.text && emptyState.reset);
  await evaluate(`return clickByText("button", "Reset pencarian");`);
  await delay(400);
  await evaluate(`return setInput("input[type='search']", "croffle");`);
  await delay(500);

  /* ------------------------------------------------------- 3. Modal & keranjang */
  await evaluate(`return clickByText("button", "Pilih");`);
  await delay(700);
  const modal = await evaluate(`
    const dialog = document.querySelector("div[role='dialog'][aria-modal='true']");
    return {
      open: Boolean(dialog),
      name: dialog?.textContent.includes("Croffle") ?? false,
      composition: dialog?.textContent.includes("Komposisi") ?? false,
      related: dialog?.textContent.includes("sering dipesan") ?? false,
    };
  `);
  check("Menu - modal detail produk terbuka", modal.open && modal.name);
  check("Menu - modal menampilkan komposisi & rekomendasi", modal.composition && modal.related);

  await evaluate(`return clickByText("div[role='dialog'] button", "Tambah ke Pesanan");`);
  await delay(700);
  const afterAdd = await evaluate(`
    const badge = document.querySelector("button[aria-label^='Buka keranjang']");
    const stored = window.localStorage.getItem("kopicuy.cart.v1") ?? "";
    return {
      toast: document.body.textContent.includes("Ditambahkan ke pesanan"),
      badge: badge?.textContent.trim() ?? "",
      stored: stored.includes("Croffle") && stored.includes("qty\\":1"),
    };
  `);
  check("Keranjang - notifikasi toast muncul", afterAdd.toast);
  check("Keranjang - badge navbar bertambah", afterAdd.badge === "1", `badge: ${afterAdd.badge}`);
  check("Keranjang - tersimpan di localStorage", afterAdd.stored);

  await evaluate(`
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
    return true;
  `);
  await delay(500);
  const modalClosed = await evaluate(
    `return !document.querySelector("div[role='dialog'][aria-modal='true']");`
  );
  check("Menu - modal tertutup dengan tombol Escape", modalClosed);

  /* -------------------------------------------------------- 4. Drawer keranjang */
  await evaluate(
    `document.querySelector("button[aria-label^='Buka keranjang']").click(); return true;`
  );
  await delay(700);
  const drawer = await evaluate(`
    const panel = document.querySelector("aside[role='dialog']");
    return {
      visible: panel ? !panel.className.includes("translate-x-full") : false,
      hasItem: panel?.textContent.includes("Croffle") ?? false,
      subtotal: panel?.textContent.includes("Subtotal") ?? false,
      checkout: panel ? [...panel.querySelectorAll("a")].some((a) => a.getAttribute("href") === "/order") : false,
    };
  `);
  check("Keranjang - drawer terbuka dengan item", drawer.visible && drawer.hasItem);
  check("Keranjang - subtotal & tombol ke /order", drawer.subtotal && drawer.checkout);

  /* ------------------------------------------------------- 5. Pesanan WhatsApp */
  await visit("/order", 2000);
  const orderReady = await evaluate(`
    return {
      item: document.body.textContent.includes("Croffle"),
      total: document.body.textContent.includes("Total estimasi"),
      empty: document.body.textContent.includes("Keranjang masih kosong"),
    };
  `);
  check(
    "Pesanan - item keranjang tersimpan dari halaman menu",
    orderReady.item && orderReady.total && !orderReady.empty
  );

  const orderSubmit = await evaluate(`
    window.__opened = [];
    window.open = (url) => { window.__opened.push(url); return null; };
    setInput("#order-name", "Rani Puspita");
    setInput("#order-phone", "081298765432");
    setInput("#order-table", "7");
    setInput("#order-notes", "es sedikit, gula terpisah");
    await new Promise((resolve) => setTimeout(resolve, 300));
    clickByText("button", "Pesan via WhatsApp");
    await new Promise((resolve) => setTimeout(resolve, 600));
    const url = decodeURIComponent(window.__opened[0] ?? "");
    return {
      opened: window.__opened.length,
      wa: (window.__opened[0] ?? "").includes("wa.me/6281234567890"),
      message: url,
      success: document.body.textContent.includes("Pesanan dikirim ke WhatsApp"),
    };
  `);
  check("Pesanan - WhatsApp terbuka saat submit", orderSubmit.opened === 1 && orderSubmit.wa);
  check("Pesanan - panel sukses tampil", orderSubmit.success);
  console.log("\n--- contoh pesan pesanan yang dikirim ke WhatsApp ---");
  console.log(orderSubmit.message);
  console.log("--- akhir contoh pesan ---\n");

  check(
    "Pesanan - pesan berisi nama, item, metode, meja, catatan, total",
    [
      "Rani Puspita",
      "081298765432",
      "Croffle",
      "Dine-in",
      "Nomor meja: 7",
      "gula terpisah",
      "*TOTAL: Rp",
    ].every((part) => orderSubmit.message.includes(part)),
    orderSubmit.message.split("\n").slice(0, 2).join(" / ")
  );

  /* ------------------------------------------------------------ 6. Reservasi */
  await visit("/reservation", 1600);
  const reservation = await evaluate(`
    window.__opened = [];
    window.open = (url) => { window.__opened.push(url); return null; };
    const tomorrow = new Date(Date.now() + 86400000).toISOString().slice(0, 10);
    setInput("#res-name", "Bima Ardiansyah");
    setInput("#res-phone", "081211112222");
    setInput("#res-date", tomorrow);
    setInput("#res-guests", "6 orang");
    setInput("#res-notes", "Meja bundar, ada 1 kursi bayi");
    await new Promise((resolve) => setTimeout(resolve, 300));
    clickByText("button", "Ajukan Reservasi via WhatsApp");
    await new Promise((resolve) => setTimeout(resolve, 500));
    return {
      opened: window.__opened.length,
      message: decodeURIComponent(window.__opened[0] ?? ""),
      confirmNote: document.body.innerText.includes("menunggu konfirmasi"),
    };
  `);
  check("Reservasi - WhatsApp terbuka saat submit", reservation.opened === 1);
  check("Reservasi - catatan konfirmasi cafe tampil", reservation.confirmNote);
  console.log("--- contoh pesan reservasi yang dikirim ke WhatsApp ---");
  console.log(reservation.message);
  console.log("--- akhir contoh pesan ---\n");

  check(
    "Reservasi - pesan berisi detail lengkap",
    ["Bima Ardiansyah", "081211112222", "19:", "6 orang", "kursi bayi"].every((part) =>
      reservation.message.includes(part)
    )
  );

  const reservationValidation = await evaluate(`
    clickByText("button", "Buat reservasi baru");
    await new Promise((resolve) => setTimeout(resolve, 500));
    setInput("#res-name", "");
    await new Promise((resolve) => setTimeout(resolve, 200));
    clickByText("button", "Ajukan Reservasi via WhatsApp");
    await new Promise((resolve) => setTimeout(resolve, 400));
    return document.body.textContent.includes("Nama wajib diisi");
  `);
  check("Reservasi - validasi form wajib diisi", reservationValidation);

  /* --------------------------------------------------------------- 7. Gallery */
  await visit("/gallery", 1800);
  const galleryFilter = await evaluate(`
    clickByText("button", "Events");
    await new Promise((resolve) => setTimeout(resolve, 500));
    const tiles = document.querySelectorAll("button[aria-label^='Perbesar foto']").length;
    clickByText("button", "Semua");
    await new Promise((resolve) => setTimeout(resolve, 400));
    return { events: tiles, all: document.querySelectorAll("button[aria-label^='Perbesar foto']").length };
  `);
  check("Gallery - filter kategori bekerja", galleryFilter.events === 2 && galleryFilter.all === 14,
    `events ${galleryFilter.events}, semua ${galleryFilter.all}`);

  const lightbox = await evaluate(`
    document.querySelector("button[aria-label^='Perbesar foto']").click();
    await new Promise((resolve) => setTimeout(resolve, 600));
    const opened = Boolean(document.querySelector("button[aria-label='Tutup galeri']"));
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
    await new Promise((resolve) => setTimeout(resolve, 500));
    return { opened, closed: !document.querySelector("button[aria-label='Tutup galeri']") };
  `);
  check("Gallery - lightbox terbuka & tertutup", lightbox.opened && lightbox.closed);

  /* ----------------------------------------------------------------- 8. Promo */
  await visit("/promo", 1800);
  const promo = await evaluate(`
    const cards = document.querySelectorAll("article[id]");
    return {
      count: cards.length,
      wa: [...document.querySelectorAll("a")].filter((a) => (a.href ?? "").includes("wa.me/")).length,
      code: document.body.textContent.includes("CUYKUMPUL"),
    };
  `);
  check("Promo - daftar promo tampil", promo.count === 5, `${promo.count} promo`);
  check("Promo - kode & tombol WhatsApp tersedia", promo.code && promo.wa > 0);

  /* ------------------------------------------------------------------ 9. 404 */
  await visit("/halaman-tidak-ada", 1200);
  const notFound = await evaluate(`
    return {
      status: true,
      text: document.body.textContent.includes("tidak ditemukan"),
      home: [...document.querySelectorAll("a")].some((a) => a.getAttribute("href") === "/"),
    };
  `);
  check("404 - halaman not found tampil", notFound.text && notFound.home);

  /* ---------------------------------------------------- 10. Tidak ada error JS */
  const relevantErrors = consoleErrors.filter(
    (entry) => !/favicon|Download the React DevTools/i.test(entry)
  );
  check(
    "Tidak ada error JavaScript / hydration di console",
    relevantErrors.length === 0,
    relevantErrors.slice(0, 4).join(" | ")
  );

  client.close();
  cleanup();

  const failed = results.filter((result) => !result.ok);
  console.log(
    `\n${results.length - failed.length}/${results.length} pemeriksaan lolos untuk ${BASE_URL}`
  );
  if (failed.length) {
    console.log("Gagal:");
    failed.forEach((result) => console.log(` - ${result.name}`));
    process.exitCode = 1;
  }
}

const globalCleanup = [];
process.on("exit", () => globalCleanup.forEach((fn) => fn()));
process.on("SIGINT", () => {
  globalCleanup.forEach((fn) => fn());
  process.exit(130);
});

main().catch((error) => {
  console.error(`Smoke test berhenti: ${error.message}`);
  process.exitCode = 1;
});
