const MAPS_URL =
  "https://2gis.kz/shymkent/search/" +
  encodeURIComponent("Жибек-Жолы 66/3");

export function ContactStrip() {
  return (
    <section
      id="contact"
      className="bg-ink px-4 py-14 text-white sm:px-[30px] sm:py-16"
    >
      <div className="mx-auto max-w-[1380px]">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[560px]">
            <p className="text-[12px] font-medium tracking-[0.08em] text-accent uppercase">
              Образец — бесплатно
            </p>
            <h2 className="mt-2 text-[clamp(1.5rem,3vw,2.2rem)] leading-tight font-semibold tracking-[-0.03em]">
              Консультация по материалу и пошиву
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-white/70">
              Подберём линейку утеплителя или рассчитаем спецодежду. Работаем со
              швейными фабриками и государственными заказчиками по всему
              Казахстану.
            </p>

            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-[14px] text-white/80 underline-offset-4 transition-colors hover:text-white hover:underline"
            >
              Шымкент, ул. Жибек-Жолы 66/3
              <span aria-hidden className="text-white/45">
                ↗
              </span>
            </a>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <a
              href="tel:+77781200084"
              className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-[14px] font-semibold text-ink transition-opacity hover:opacity-90"
            >
              +7 778 120 00 84
            </a>
            <a
              href="https://wa.me/77781200084"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-white/30 px-5 py-3 text-[14px] font-medium text-white transition-colors hover:bg-white/10"
            >
              WhatsApp
            </a>
            <a
              href="mailto:trmblnc0005@gmail.com"
              className="inline-flex items-center justify-center rounded-full border border-white/20 px-5 py-3 text-[14px] font-medium text-white/85 transition-colors hover:bg-white/10 hover:text-white"
            >
              trmblnc0005@gmail.com
            </a>
          </div>
        </div>

        <p className="mt-10 border-t border-white/10 pt-5 text-[12px] text-white/40">
          © {new Date().getFullYear()} Termmo Balance · производство в Шымкенте
        </p>
      </div>
    </section>
  );
}
