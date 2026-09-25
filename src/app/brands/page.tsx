import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Пошив одежды и 2EASY — Termmo Balance",
  description:
    "Шьём одежду под ваш бренд и развиваем собственный fashion-бренд 2EASY.",
};

/** Placeholder page — content coming later */
export default function BrandsPage() {
  return (
    <main className="min-h-[100svh] bg-surface text-ink">
      <div className="mx-auto flex min-h-[100svh] max-w-[1380px] flex-col px-4 py-6 sm:px-[30px]">
        <Link
          href="/"
          className="inline-flex w-fit text-[13px] font-medium text-muted transition-colors hover:text-ink"
        >
          ← Termmo Balance
        </Link>
      </div>
    </main>
  );
}
