import Image from "next/image";
import { asset } from "@/lib/asset";

/** Logos from https://termmobalance.net/ — блок «Наши клиенты» */
const CLIENTS = Array.from({ length: 20 }, (_, i) => {
  const n = String(i + 1).padStart(2, "0");
  return { id: `client-${n}`, src: asset(`/images/trusted/client-${n}.png`) };
});

/**
 * Logos are drawn on opaque white, so they sit on a paper tile and multiply:
 * the white drops out and every logo reads at the same weight.
 */
export function ClientLogos({ className = "" }: { className?: string }) {
  return (
    <ul
      className={`grid grid-cols-2 gap-px bg-black/10 sm:grid-cols-4 lg:grid-cols-5 ${className}`}
    >
      {CLIENTS.map((client) => (
        <li
          key={client.id}
          className="flex aspect-[5/3] items-center justify-center bg-[#f4f0ea] p-5 sm:p-7"
        >
          <Image
            src={client.src}
            alt=""
            width={285}
            height={117}
            className="h-auto max-h-14 w-auto max-w-full object-contain opacity-85 mix-blend-multiply"
          />
        </li>
      ))}
    </ul>
  );
}
