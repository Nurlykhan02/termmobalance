"use client";

import { useId, useState, type ReactNode } from "react";
import { ButtonLink } from "@/components/ui/button-link";
import { Icon } from "@/components/ui/icon";
import { SectionHeading } from "@/components/ui/section-heading";
import { SpecLabel } from "@/components/ui/spec-label";
import { BRIEF, COMPANY, waLink } from "@/lib/brands-content";

type Brief = {
  products: string[];
  techniques: string[];
  quantity: string;
  deadline: string;
  brand: string;
  comment: string;
};

const EMPTY: Brief = {
  products: [],
  techniques: [],
  quantity: "",
  deadline: "",
  brand: "",
  comment: "",
};

const STEPS = ["Изделие", "Тираж и срок", "О бренде"] as const;

function toggle(list: string[], value: string) {
  return list.includes(value)
    ? list.filter((item) => item !== value)
    : [...list, value];
}

function briefMessage(brief: Brief) {
  const lines = [
    "Здравствуйте! Хотим отшить одежду под наш бренд.",
    brief.brand && `Бренд: ${brief.brand}`,
    brief.products.length && `Изделия: ${brief.products.join(", ")}`,
    brief.techniques.length && `Нанесение: ${brief.techniques.join(", ")}`,
    brief.quantity && `Тираж: ${brief.quantity}`,
    brief.deadline && `Срок: ${brief.deadline}`,
    brief.comment && `Комментарий: ${brief.comment}`,
  ];
  return lines.filter(Boolean).join("\n");
}

function Chips({
  legend,
  options,
  value,
  onChange,
}: {
  legend: string;
  options: string[];
  value: string[];
  onChange: (next: string[]) => void;
}) {
  return (
    <fieldset>
      <legend className="font-mono text-label text-muted uppercase">
        {legend}
      </legend>
      <div className="mt-4 flex flex-wrap gap-2">
        {options.map((option) => {
          const on = value.includes(option);
          return (
            <button
              key={option}
              type="button"
              aria-pressed={on}
              onClick={() => onChange(toggle(value, option))}
              className={`inline-flex min-h-11 cursor-pointer items-center gap-2 border px-4 text-[14px] transition-[color,background-color,border-color,transform] duration-200 active:scale-[0.97] ${
                on
                  ? "border-accent bg-accent text-background"
                  : "border-line text-ink hover:border-ink/50 hover:bg-ink/5"
              }`}
            >
              {on ? <Icon name="close" className="size-3.5" /> : <Icon name="plus" className="size-3.5" />}
              {option}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

function Field({
  label,
  children,
  htmlFor,
}: {
  label: string;
  htmlFor: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="font-mono text-label text-muted uppercase"
      >
        {label}
      </label>
      <div className="mt-3">{children}</div>
    </div>
  );
}

const INPUT =
  "w-full border-0 border-b border-line bg-transparent py-3 text-[16px] text-ink placeholder:text-muted/70 focus:border-accent focus:outline-none";

export function StudioBrief({ index }: { index: string }) {
  return (
    <section id="contact" className="section-y bg-background text-ink">
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:grid-rows-[auto_1fr] lg:gap-x-6">
        <SectionHeading
          index={index}
          eyebrow="Бриф"
          title="Расскажите о коллекции"
          lead="Три коротких шага — и готовое сообщение уйдёт нам в WhatsApp."
          stacked
          className="lg:col-span-5"
        />

        <BriefForm />

        <dl className="space-y-5 border-t border-line pt-6 lg:col-span-5 lg:self-start">
          <div>
            <dt className="font-mono text-label text-muted uppercase">Телефон</dt>
            <dd className="mt-1">
              <a href={COMPANY.phoneHref} className="hover:text-accent">
                {COMPANY.phone}
              </a>
            </dd>
          </div>
          <div>
            <dt className="font-mono text-label text-muted uppercase">Почта</dt>
            <dd className="mt-1">
              <a href={`mailto:${COMPANY.email}`} className="hover:text-accent">
                {COMPANY.email}
              </a>
            </dd>
          </div>
          <div>
            <dt className="font-mono text-label text-muted uppercase">Производство</dt>
            <dd className="mt-1">
              <a
                href={COMPANY.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent"
              >
                {COMPANY.address}
              </a>
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}

function BriefForm() {
  const uid = useId();
  const [step, setStep] = useState(0);
  const [brief, setBrief] = useState<Brief>(EMPTY);
  const update = (patch: Partial<Brief>) =>
    setBrief((current) => ({ ...current, ...patch }));
  const last = step === STEPS.length - 1;

  return (
    <form
      className="border border-line p-5 sm:p-8 lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-1"
      onSubmit={(event) => event.preventDefault()}
      aria-label="Бриф на пошив"
    >
      <ol className="flex gap-2" aria-label="Шаги брифа">
        {STEPS.map((label, i) => (
          <li key={label} className="flex-1">
            <button
              type="button"
              onClick={() => setStep(i)}
              aria-current={i === step ? "step" : undefined}
              className="min-h-11 w-full cursor-pointer text-left transition-opacity duration-200 hover:opacity-80 active:scale-[0.98]"
            >
              <span
                className={`block h-px ${i <= step ? "bg-accent" : "bg-line"}`}
              />
              <SpecLabel className={`mt-3 ${i === step ? "text-ink" : ""}`}>
                {String(i + 1).padStart(2, "0")}
                <span className="max-sm:hidden">{label}</span>
              </SpecLabel>
            </button>
          </li>
        ))}
      </ol>

      <div className="mt-10 min-h-[260px] space-y-10">
        {step === 0 ? (
          <>
            <Chips
              legend="Что шьём"
              options={BRIEF.products}
              value={brief.products}
              onChange={(products) => update({ products })}
            />
            <Chips
              legend="Нанесение"
              options={BRIEF.techniques}
              value={brief.techniques}
              onChange={(techniques) => update({ techniques })}
            />
          </>
        ) : null}

        {step === 1 ? (
          <>
            <Field label="Тираж" htmlFor={`${uid}-qty`}>
              <input
                id={`${uid}-qty`}
                className={INPUT}
                inputMode="numeric"
                placeholder="Сколько изделий планируете"
                value={brief.quantity}
                onChange={(event) => update({ quantity: event.target.value })}
              />
            </Field>
            <Field label="Срок" htmlFor={`${uid}-deadline`}>
              <input
                id={`${uid}-deadline`}
                className={INPUT}
                placeholder="Когда нужна партия"
                value={brief.deadline}
                onChange={(event) => update({ deadline: event.target.value })}
              />
            </Field>
          </>
        ) : null}

        {step === 2 ? (
          <>
            <Field label="Бренд" htmlFor={`${uid}-brand`}>
              <input
                id={`${uid}-brand`}
                className={INPUT}
                placeholder="Название или ссылка на Instagram"
                value={brief.brand}
                onChange={(event) => update({ brand: event.target.value })}
              />
            </Field>
            <Field label="Комментарий" htmlFor={`${uid}-comment`}>
              <textarea
                id={`${uid}-comment`}
                rows={3}
                className={`${INPUT} resize-none`}
                placeholder="Ткань, цвета, референсы"
                value={brief.comment}
                onChange={(event) => update({ comment: event.target.value })}
              />
            </Field>
          </>
        ) : null}
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
        <button
          type="button"
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
          className="inline-flex min-h-11 cursor-pointer items-center gap-2 text-[14px] text-muted transition-[color,transform] duration-200 hover:text-ink active:scale-[0.97] disabled:invisible"
        >
          <Icon name="chevron-left" />
          Назад
        </button>
        {last ? (
          <ButtonLink href={waLink(briefMessage(brief))}>
            Отправить в WhatsApp
          </ButtonLink>
        ) : (
          <button
            type="button"
            onClick={() => setStep((s) => s + 1)}
            className="group inline-flex h-12 cursor-pointer items-center gap-3 rounded-[var(--radius)] bg-ink px-5 text-[14px] font-medium text-surface shadow-[0_1px_0_rgb(0_0_0/0.08)] transition-[color,background-color,transform,box-shadow] duration-200 hover:bg-ink/88 hover:shadow-[0_10px_28px_-14px] hover:shadow-ink/50 active:scale-[0.97]"
          >
            Дальше
            <Icon
              name="arrow-right"
              className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
            />
          </button>
        )}
      </div>
    </form>
  );
}
