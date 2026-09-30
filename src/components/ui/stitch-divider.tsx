export function StitchDivider({ className = "" }: { className?: string }) {
  return (
    <hr
      aria-hidden
      className={`h-px border-0 ${className}`}
      style={{
        backgroundImage:
          "repeating-linear-gradient(90deg, var(--line) 0 6px, transparent 6px 12px)",
      }}
    />
  );
}
