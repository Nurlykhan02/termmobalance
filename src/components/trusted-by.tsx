import Image from "next/image";
import { asset } from "@/lib/asset";

type Client = {
  name: string;
  src: string;
  width: number;
  height: number;
  variant: "ink" | "ink-light" | "mark";
};

const CLIENTS: Client[] = [
  {
    name: "Magnum",
    src: asset("/images/trusted/magnum.svg"),
    width: 176,
    height: 43,
    variant: "ink",
  },
  {
    name: "Казатомпром",
    src: asset("/images/trusted/kazatomprom.svg"),
    width: 279,
    height: 55,
    variant: "ink",
  },
  {
    name: "LiftEd",
    src: asset("/images/trusted/lifted.svg"),
    width: 618,
    height: 160,
    variant: "ink",
  },
  {
    name: "KEGOC",
    src: asset("/images/trusted/kegoc.svg"),
    width: 77,
    height: 40,
    variant: "ink-light",
  },
  {
    name: "Kaizen Club",
    src: asset("/images/trusted/kaizen-club.svg"),
    width: 150,
    height: 15,
    variant: "ink-light",
  },
  {
    name: "Kusto Group",
    src: asset("/images/trusted/kusto-group.svg"),
    width: 218,
    height: 90,
    variant: "ink",
  },
  {
    name: "Almaty Marathon",
    src: asset("/images/trusted/almaty-marathon.webp"),
    width: 128,
    height: 119,
    variant: "mark",
  },
  {
    name: "Astana Group",
    src: asset("/images/trusted/astana-group.svg"),
    width: 304,
    height: 30,
    variant: "ink",
  },
  {
    name: "jua.ai",
    src: asset("/images/trusted/jua-ai.png"),
    width: 160,
    height: 80,
    variant: "ink-light",
  },
  {
    name: "sellerbox.ai",
    src: asset("/images/trusted/sellerbox.svg"),
    width: 32,
    height: 32,
    variant: "mark",
  },
  {
    name: "DreamBody.ai",
    src: asset("/images/trusted/dreambody.webp"),
    width: 96,
    height: 96,
    variant: "mark",
  },
  {
    name: "PocketFM",
    src: asset("/images/trusted/pocketfm.svg"),
    width: 256,
    height: 256,
    variant: "mark",
  },
  {
    name: "Parasat Business Club",
    src: asset("/images/trusted/parasat.svg"),
    width: 698,
    height: 152,
    variant: "ink",
  },
];

function ClientLogo({ client }: { client: Client }) {
  const showName = client.variant === "mark";

  return (
    <div
      className="trusted-by-item flex items-center gap-3 rounded-2xl px-4 py-3 transition-colors"
      aria-label={client.name}
    >
      <Image
        src={client.src}
        alt=""
        width={client.width}
        height={client.height}
        className={
          client.variant === "mark"
            ? "trusted-by-logo trusted-by-logo--mark h-auto max-h-[32px] w-auto max-w-[32px] rounded-[8px]"
            : client.variant === "ink-light"
              ? "trusted-by-logo trusted-by-logo--ink-light h-auto max-h-7 w-auto max-w-[140px]"
              : "trusted-by-logo trusted-by-logo--ink h-auto max-h-7 w-auto max-w-[140px]"
        }
      />
      {showName ? (
        <span className="trusted-by-name font-display text-[14px] font-medium tracking-[-0.02em] whitespace-nowrap text-muted transition-colors sm:text-[15px]">
          {client.name}
        </span>
      ) : null}
    </div>
  );
}

export function TrustedBy() {
  const label = CLIENTS.map((c) => c.name).join(", ");

  return (
    <section
      id="trusted"
      className="trusted-by relative overflow-hidden bg-surface pt-4 pb-16 text-center sm:pt-6 sm:pb-24"
    >
      <div className="relative mx-auto mb-10 max-w-[720px] px-4 sm:mb-12 sm:px-[30px]">
        <h2 className="font-display text-[clamp(1.7rem,4.2vw,3.1rem)] leading-[1.08] font-semibold tracking-[-0.035em] text-ink">
          С кем мы работаем
        </h2>
      </div>

      <div className="trusted-by-marquee overflow-hidden" aria-label={label}>
        <div className="trusted-by-track flex w-max items-center gap-[clamp(28px,5vw,72px)] pr-[clamp(28px,5vw,72px)]">
          {[0, 1].map((copy) => (
            <div
              key={copy}
              className="flex items-center gap-[clamp(28px,5vw,72px)]"
            >
              {CLIENTS.map((client) => (
                <ClientLogo key={`${copy}-${client.name}`} client={client} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
