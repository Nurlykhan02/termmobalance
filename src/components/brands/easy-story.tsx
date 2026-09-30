import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { SpecLabel } from "@/components/ui/spec-label";
import { asset } from "@/lib/asset";
import { EASY_STORY, shotByNumber } from "@/lib/brands-content";

export function EasyStory({ index }: { index: string }) {
  return (
    <section id="story" className="section-y bg-background text-ink">
      <div className="container-x">
        <SectionHeading
          index={index}
          eyebrow="Собственный бренд"
          title={EASY_STORY.title}
          lead={EASY_STORY.lead}
        />

        <ol className="mt-16 space-y-20 sm:mt-24 lg:space-y-32">
          {EASY_STORY.chapters.map((chapter, i) => {
            const shot = shotByNumber(chapter.shot);
            const flip = i % 2 === 1;
            return (
              <li
                key={chapter.year}
                className="grid grid-cols-4 gap-x-4 gap-y-6 md:grid-cols-8 lg:grid-cols-12 lg:items-center lg:gap-x-6"
              >
                <Reveal
                  variant="clip"
                  className={`relative col-span-4 aspect-[4/5] overflow-hidden bg-raised md:col-span-5 ${
                    flip ? "md:col-start-4 lg:col-span-6 lg:col-start-7" : "lg:col-span-6"
                  }`}
                >
                  <Image
                    src={asset(shot.src)}
                    alt={shot.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                    style={{ objectPosition: shot.focus }}
                  />
                </Reveal>
                <Reveal
                  className={`col-span-4 md:col-span-6 lg:col-span-4 ${
                    flip
                      ? "lg:col-start-2 lg:row-start-1"
                      : "lg:col-start-8"
                  }`}
                >
                  <SpecLabel>
                    <span className="text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {chapter.year}
                  </SpecLabel>
                  <h3 className="mt-4 font-display text-h3 font-semibold">
                    {chapter.title}
                  </h3>
                  <p className="mt-3 max-w-[42ch] text-muted">{chapter.text}</p>
                </Reveal>
              </li>
            );
          })}
        </ol>

        <Reveal className="mt-20 border-t border-line pt-10 sm:mt-32 sm:pt-14">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-10">
            <div className="lg:col-span-7">
              <SpecLabel className="text-accent">Итог первого года</SpecLabel>
              <dl className="mt-5">
                {EASY_STORY.stats.map((stat) => (
                  <div key={stat.label} className="border-l border-line pl-4 sm:pl-5">
                    <dd className="font-display text-[clamp(2.5rem,8vw,4.5rem)] leading-none font-semibold tracking-[-0.04em]">
                      {stat.value}
                    </dd>
                    <dt className="mt-3 font-mono text-label text-muted uppercase">
                      {stat.label}
                    </dt>
                  </div>
                ))}
              </dl>
            </div>

            <div className="lg:col-span-5">
              <SpecLabel>Продаём через</SpecLabel>
              <ul className="mt-3 flex flex-wrap gap-2">
                {EASY_STORY.channels.map((channel) => (
                  <li key={channel}>
                    <SpecLabel boxed className="text-ink">
                      {channel}
                    </SpecLabel>
                  </li>
                ))}
              </ul>
              <p className="mt-5 max-w-[40ch] text-[15px] leading-relaxed text-muted sm:text-base">
                {EASY_STORY.details}
              </p>
              <p className="mt-6 font-mono text-label text-accent uppercase">
                2EASY · Шымкент
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
