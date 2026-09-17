"use client";

import { useMemo, useState } from "react";

import Icon from "@/components/Icon";
import { cafe } from "@/data/site";
import { formatDateLong } from "@/lib/format";
import { buildReservationMessage, openWhatsApp, waLink } from "@/lib/whatsapp";

const areas = [
  { id: "indoor", label: "Indoor (AC)" },
  { id: "outdoor", label: "Outdoor / taman" },
  { id: "bar", label: "Meja bar (dekat barista)" },
  { id: "any", label: "Bebas, apa saja" },
];

const guestsOptions = [
  ...Array.from({ length: 10 }, (_, index) => `${index + 1} orang`),
  "11 - 15 orang",
  "Lebih dari 15 orang",
];

function buildTimeSlots() {
  const slots = [];
  for (let hour = 9; hour <= 21; hour += 1) {
    slots.push(`${String(hour).padStart(2, "0")}:00`);
    if (hour !== 21) slots.push(`${String(hour).padStart(2, "0")}:30`);
  }
  return slots;
}

const todayISO = () => {
  const now = new Date(Date.now() + 7 * 60 * 60 * 1000); // WIB
  return now.toISOString().slice(0, 10);
};

export default function ReservationForm() {
  const timeSlots = useMemo(buildTimeSlots, []);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    date: "",
    time: "19:00",
    guests: "2 orang",
    area: "indoor",
    notes: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const update = (key) => (event) => {
    setForm((current) => ({ ...current, [key]: event.target.value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Nama wajib diisi.";
    if (!/^[0-9+\-\s()]{8,}$/.test(form.phone.trim())) {
      next.phone = "Masukkan nomor WhatsApp yang valid (minimal 8 angka).";
    }
    if (!form.date) next.date = "Pilih tanggal reservasi.";
    else if (form.date < todayISO()) next.date = "Tanggal tidak boleh di masa lalu.";
    if (!form.time) next.time = "Pilih jam kedatangan.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const message = buildReservationMessage({
    name: form.name,
    phone: form.phone,
    date: form.date,
    time: form.time,
    guests: form.guests,
    area: areas.find((entry) => entry.id === form.area)?.label ?? "",
    notes: form.notes,
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validate()) return;
    openWhatsApp(message);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="card p-8 text-center">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-matcha/15 text-matcha">
          <Icon name="check" className="h-8 w-8" strokeWidth={2.4} />
        </span>
        <h2 className="mt-4 font-display text-2xl font-semibold">Pengajuan reservasi dikirim</h2>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-cocoa/85">
          Terima kasih, {form.name || "kamu"}. WhatsApp sudah terbuka dengan detail reservasi.
          Reservasi <span className="font-semibold">menunggu konfirmasi</span> dari pihak{" "}
          {cafe.name} - biasanya kami balas dalam 1 x 24 jam.
        </p>

        <dl className="mx-auto mt-6 max-w-md space-y-2 rounded-2xl bg-beige/60 p-5 text-left text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-mocha">Tanggal</dt>
            <dd className="font-semibold">{formatDateLong(form.date)}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-mocha">Jam</dt>
            <dd className="font-semibold">{form.time} WIB</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-mocha">Jumlah orang</dt>
            <dd className="font-semibold">{form.guests}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-mocha">Area</dt>
            <dd className="font-semibold">
              {areas.find((entry) => entry.id === form.area)?.label}
            </dd>
          </div>
        </dl>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a
            href={waLink(message)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp"
          >
            <Icon name="whatsapp" className="h-4 w-4" />
            Buka WhatsApp lagi
          </a>
          <button type="button" onClick={() => setSubmitted(false)} className="btn-outline">
            Buat reservasi baru
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="card p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-1">
          <label className="field-label" htmlFor="res-name">
            Nama lengkap *
          </label>
          <input
            id="res-name"
            type="text"
            value={form.name}
            onChange={update("name")}
            placeholder="Nama untuk reservasi"
            className="field"
            aria-invalid={Boolean(errors.name)}
          />
          {errors.name ? <p className="mt-1.5 text-xs text-clay">{errors.name}</p> : null}
        </div>

        <div className="sm:col-span-1">
          <label className="field-label" htmlFor="res-phone">
            Nomor WhatsApp *
          </label>
          <input
            id="res-phone"
            type="tel"
            value={form.phone}
            onChange={update("phone")}
            placeholder="08xx xxxx xxxx"
            className="field"
            aria-invalid={Boolean(errors.phone)}
          />
          {errors.phone ? <p className="mt-1.5 text-xs text-clay">{errors.phone}</p> : null}
        </div>

        <div>
          <label className="field-label" htmlFor="res-date">
            Tanggal *
          </label>
          <input
            id="res-date"
            type="date"
            min={todayISO()}
            value={form.date}
            onChange={update("date")}
            className="field"
            aria-invalid={Boolean(errors.date)}
          />
          {errors.date ? <p className="mt-1.5 text-xs text-clay">{errors.date}</p> : null}
        </div>

        <div>
          <label className="field-label" htmlFor="res-time">
            Jam kedatangan *
          </label>
          <select id="res-time" value={form.time} onChange={update("time")} className="field">
            {timeSlots.map((slot) => (
              <option key={slot} value={slot}>
                {slot} WIB
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="field-label" htmlFor="res-guests">
            Jumlah orang *
          </label>
          <select id="res-guests" value={form.guests} onChange={update("guests")} className="field">
            {guestsOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="field-label" htmlFor="res-area">
            Preferensi area
          </label>
          <select id="res-area" value={form.area} onChange={update("area")} className="field">
            {areas.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label className="field-label" htmlFor="res-notes">
            Catatan tambahan
          </label>
          <textarea
            id="res-notes"
            rows={4}
            value={form.notes}
            onChange={update("notes")}
            placeholder="Contoh: butuh meja bundar untuk acara ulang tahun, ada 1 kursi bayi"
            className="field resize-none"
          />
        </div>
      </div>

      <div className="mt-5 flex items-start gap-2.5 rounded-2xl border border-caramel/25 bg-caramel/10 p-4 text-xs leading-relaxed text-clay">
        <Icon name="clock" className="mt-0.5 h-4 w-4 shrink-0" />
        <p>
          Reservasi bersifat pengajuan dan perlu dikonfirmasi pihak cafe. Kami akan membalas lewat
          WhatsApp maksimal 1 x 24 jam. Untuk grup lebih dari 15 orang, silakan hubungi kami langsung
          di {cafe.whatsapp.display}.
        </p>
      </div>

      <button type="submit" className="btn-whatsapp mt-5 w-full">
        <Icon name="whatsapp" className="h-4 w-4" />
        Ajukan Reservasi via WhatsApp
      </button>
    </form>
  );
}
