"use client";

export type FilterTab<T extends string> = {
  id: T;
  label: string;
  count: number;
};

export function FilterTabs<T extends string>({
  label,
  tabs,
  value,
  onChange,
  className = "",
}: {
  label: string;
  tabs: FilterTab<T>[];
  value: T;
  onChange: (id: T) => void;
  className?: string;
}) {
  return (
    <div
      role="tablist"
      aria-label={label}
      className={`flex flex-wrap gap-x-6 gap-y-3 border-b border-line pb-4 ${className}`}
    >
      {tabs.map((tab) => {
        const active = value === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(tab.id)}
            className={`relative flex min-h-11 min-w-11 items-center gap-2 text-[15px] font-medium transition-colors after:absolute after:inset-x-0 after:-bottom-[17px] after:h-0.5 after:transition-colors ${
              active
                ? "text-ink after:bg-accent"
                : "text-muted after:bg-transparent hover:text-ink"
            }`}
          >
            {tab.label}
            <span className="font-mono text-label">{tab.count}</span>
          </button>
        );
      })}
    </div>
  );
}
