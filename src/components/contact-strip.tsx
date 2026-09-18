import Image from "next/image";
import Link from "next/link";

export function ContactStrip() {
  return (
    <section
      id="contact"
      className="bg-ink px-4 py-14 text-white sm:px-[30px] sm:py-16"
    >
      <div className="mx-auto flex max-w-[1380px] flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-[560px]">
          <p className="text-[11px] font-semibold tracking-[0.12em] text-accent uppercase">
            Контакты
          </p>
          <h2 className="mt-2 text-[clamp(1.5rem,3vw,2.2rem)] leading-tight font-semibold tracking-[-0.03em]">
            Бесплатная консультация и образец
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-white/70">
            Шымкент, ул. Жибек-Жолы 66/3. Работаем со швейными фабриками и
            государственными заказчиками по всему Казахстану.
          </p>
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
            className="inline-flex items-center gap-2 text-[14px] font-medium text-white/80 underline-offset-4 transition-colors hover:text-white hover:underline"
          >
            trmblnc0005@gmail.com
            <Image
              src="/images/arrow.svg"
              alt=""
              width={14}
              height={14}
              className="brightness-0 invert opacity-70"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
