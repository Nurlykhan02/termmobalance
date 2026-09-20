import Image from "next/image";
import { asset } from "@/lib/asset";

/** Logos from https://termmobalance.net/ — блок «Наши клиенты» */
const CLIENTS = Array.from({ length: 20 }, (_, i) => {
  const n = String(i + 1).padStart(2, "0");
  return {
    id: `client-${n}`,
    src: asset(`/images/trusted/client-${n}.png`),
    width: 285,
    height: 117,
  };
});

function ClientLogo({
  client,
}: {
  client: (typeof CLIENTS)[number];
}) {
  return (
    <div className="trusted-by-item flex items-center justify-center rounded-2xl px-3 py-2 transition-colors">
      <Image
        src={client.src}
        alt=""
        width={client.width}
        height={client.height}
        className="trusted-by-logo h-auto max-h-10 w-auto max-w-[150px] object-contain sm:max-h-12 sm:max-w-[170px]"
      />
    </div>
  );
}

export function TrustedBy() {
  return (
    <section
      id="trusted"
      className="trusted-by relative overflow-hidden bg-surface pt-4 pb-16 text-center sm:pt-6 sm:pb-24"
      aria-label="С кем мы работаем"
    >
      <div className="relative mx-auto mb-10 max-w-[720px] px-4 sm:mb-12 sm:px-[30px]">
        <h2 className="font-display text-[clamp(1.7rem,4.2vw,3.1rem)] leading-[1.08] font-semibold tracking-[-0.035em] text-ink">
          С кем мы работаем
        </h2>
      </div>

      <div className="trusted-by-marquee overflow-hidden">
        <div className="trusted-by-track flex w-max items-center gap-[clamp(20px,4vw,56px)] pr-[clamp(20px,4vw,56px)]">
          {[0, 1].map((copy) => (
            <div
              key={copy}
              className="flex items-center gap-[clamp(20px,4vw,56px)]"
            >
              {CLIENTS.map((client) => (
                <ClientLogo key={`${copy}-${client.id}`} client={client} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
