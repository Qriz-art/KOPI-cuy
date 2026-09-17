import ContactForm from "@/components/ContactForm";
import Icon from "@/components/Icon";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { cafe } from "@/data/site";
import { waLink } from "@/lib/whatsapp";

export const metadata = {
  title: "Contact",
  description:
    "Alamat, nomor WhatsApp, jam operasional, email, dan Instagram Kopi Cuy. Lengkap dengan peta lokasi dan form pertanyaan.",
  alternates: { canonical: "/contact" },
};

const waHref = waLink(`Halo ${cafe.name}! Saya mau bertanya.`);

const cards = [
  {
    title: "Alamat",
    icon: "map",
    lines: [cafe.address.line1, cafe.address.line2, cafe.address.city],
    action: { label: "Buka Google Maps", href: cafe.address.mapsUrl, external: true },
  },
  {
    title: "WhatsApp",
    icon: "whatsapp",
    lines: [cafe.whatsapp.display, "Respon cepat 08.00 - 22.00 WIB"],
    action: { label: "Chat sekarang", href: waHref, external: true },
  },
  {
    title: "Jam operasional",
    icon: "clock",
    lines: cafe.hours.map((entry) => `${entry.day}: ${entry.time}`),
  },
  {
    title: "Email & sosial media",
    icon: "mail",
    lines: [cafe.email, `Instagram: @${cafe.instagram}`],
    action: { label: "Kirim email", href: `mailto:${cafe.email}`, external: false },
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Hubungi kami"
        title="Ada pertanyaan? Kami siap bantu"
        description="Untuk pertanyaan menu, pesanan besar, kerja sama, atau reservasi grup, hubungi kami lewat WhatsApp atau email. Kami balas secepat mungkin di jam operasional."
        breadcrumb={[{ label: "Contact" }]}
      >
        <a href={waHref} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
          <Icon name="whatsapp" className="h-4 w-4" />
          Chat WhatsApp
        </a>
        <a href={`mailto:${cafe.email}`} className="btn-outline">
          <Icon name="mail" className="h-4 w-4" />
          Kirim email
        </a>
      </PageHero>

      <section className="shell py-12 lg:py-16">
        <div className="grid gap-6 sm:grid-cols-2">
          {cards.map((card, index) => (
            <Reveal key={card.title} delay={(index % 2) * 80}>
              <article className="card flex h-full flex-col p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-beige text-clay">
                  <Icon name={card.icon} className="h-5 w-5" />
                </span>
                <h2 className="mt-4 font-display text-lg font-semibold">{card.title}</h2>
                <div className="mt-2 space-y-1 text-sm leading-relaxed text-cocoa/85">
                  {card.lines.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
                {card.action ? (
                  <a
                    href={card.action.href}
                    {...(card.action.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="mt-4 text-sm font-semibold text-clay transition hover:text-caramel"
                  >
                    {card.action.label}
                  </a>
                ) : null}
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.1fr]">
          <Reveal>
            <div className="card overflow-hidden p-0">
              <div className="flex items-center justify-between gap-4 border-b border-espresso/[0.07] px-6 py-4">
                <div>
                  <h2 className="font-display text-lg font-semibold">Lokasi Kopi Cuy</h2>
                  <p className="mt-0.5 text-xs text-mocha">
                    {cafe.address.line1}, {cafe.address.city}
                  </p>
                </div>
                <a
                  href={cafe.address.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary px-4 py-2 text-xs"
                >
                  <Icon name="map" className="h-3.5 w-3.5" />
                  Google Maps
                </a>
              </div>

              <iframe
                title={`Peta lokasi ${cafe.name}`}
                src={cafe.address.embedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-[22rem] w-full border-0"
              />

              <div className="grid gap-3 border-t border-espresso/[0.07] px-6 py-5 sm:grid-cols-2">
                <div className="flex gap-3">
                  <Icon name="clock" className="mt-0.5 h-4 w-4 shrink-0 text-caramel" />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-mocha">
                      Jam buka
                    </p>
                    <p className="mt-1 text-sm text-cocoa/85">{cafe.hoursShort}</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Icon name="wifi" className="mt-0.5 h-4 w-4 shrink-0 text-caramel" />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-mocha">
                      Fasilitas
                    </p>
                    <p className="mt-1 text-sm text-cocoa/85">
                      Wifi, colokan, area outdoor, parkir motor
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <ContactForm />
          </Reveal>
        </div>

        <p className="mt-6 text-xs italic text-mocha">
          Catatan: alamat, nomor WhatsApp, email, dan Instagram di atas masih data contoh. Semua bisa
          diganti dari satu file konfigurasi data cafe.
        </p>
      </section>
    </>
  );
}
