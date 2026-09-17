"use client";

import { useState } from "react";

import Icon from "@/components/Icon";
import { cafe } from "@/data/site";
import { buildContactMessage, openWhatsApp, waLink } from "@/lib/whatsapp";

const topics = [
  "Pertanyaan menu",
  "Reservasi grup besar",
  "Kerja sama / kolaborasi",
  "Event & komunitas",
  "Lainnya",
];

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", subject: topics[0], message: "" });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const update = (key) => (event) => {
    setForm((current) => ({ ...current, [key]: event.target.value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Nama wajib diisi.";
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) {
      next.email = "Format email belum benar.";
    }
    if (form.message.trim().length < 10) next.message = "Tulis pesan minimal 10 karakter.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const message = buildContactMessage(form);
  const mailtoHref = `mailto:${cafe.email}?subject=${encodeURIComponent(
    `[${form.subject}] Pertanyaan dari ${form.name || "pelanggan"}`
  )}&body=${encodeURIComponent(form.message)}`;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validate()) return;
    openWhatsApp(message);
    setSent(true);
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="card p-6 sm:p-8">
      <h2 className="font-display text-xl font-semibold">Kirim pertanyaan</h2>
      <p className="mt-1 text-sm text-cocoa/80">
        Isi form di bawah, lalu pesan otomatis terkirim ke WhatsApp kami. Bisa juga dikirim via email.
      </p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div>
          <label className="field-label" htmlFor="ct-name">
            Nama *
          </label>
          <input
            id="ct-name"
            type="text"
            value={form.name}
            onChange={update("name")}
            placeholder="Nama kamu"
            className="field"
            aria-invalid={Boolean(errors.name)}
          />
          {errors.name ? <p className="mt-1.5 text-xs text-clay">{errors.name}</p> : null}
        </div>

        <div>
          <label className="field-label" htmlFor="ct-email">
            Email (opsional)
          </label>
          <input
            id="ct-email"
            type="email"
            value={form.email}
            onChange={update("email")}
            placeholder="nama@email.com"
            className="field"
            aria-invalid={Boolean(errors.email)}
          />
          {errors.email ? <p className="mt-1.5 text-xs text-clay">{errors.email}</p> : null}
        </div>

        <div className="sm:col-span-2">
          <label className="field-label" htmlFor="ct-subject">
            Topik
          </label>
          <select id="ct-subject" value={form.subject} onChange={update("subject")} className="field">
            {topics.map((topic) => (
              <option key={topic} value={topic}>
                {topic}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label className="field-label" htmlFor="ct-message">
            Pesan *
          </label>
          <textarea
            id="ct-message"
            rows={5}
            value={form.message}
            onChange={update("message")}
            placeholder="Tulis pertanyaan atau kebutuhanmu di sini"
            className="field resize-none"
            aria-invalid={Boolean(errors.message)}
          />
          {errors.message ? <p className="mt-1.5 text-xs text-clay">{errors.message}</p> : null}
        </div>
      </div>

      {sent ? (
        <div className="mt-5 flex items-start gap-2.5 rounded-2xl border border-matcha/30 bg-matcha/10 p-4 text-xs leading-relaxed text-cocoa">
          <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-matcha" strokeWidth={2.4} />
          <p>
            Pesan sudah disiapkan. Kalau WhatsApp belum terbuka otomatis,{" "}
            <a
              href={waLink(message)}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold underline underline-offset-4"
            >
              klik link ini
            </a>{" "}
            untuk mengirimnya.
          </p>
        </div>
      ) : null}

      <div className="mt-5 flex flex-col gap-2 sm:flex-row">
        <button type="submit" className="btn-whatsapp w-full sm:w-auto">
          <Icon name="whatsapp" className="h-4 w-4" />
          Kirim via WhatsApp
        </button>
        <a href={mailtoHref} className="btn-outline w-full sm:w-auto">
          <Icon name="mail" className="h-4 w-4" />
          Kirim via email
        </a>
      </div>
    </form>
  );
}
