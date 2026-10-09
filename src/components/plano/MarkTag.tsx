interface MarkTagProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * A drawing "mark" — the code a technical drawing gives each callout,
 * fixture, or sheet (S-01, A-02...). Language-neutral by convention, so it
 * carries the section's numbering without needing translation.
 */
export default function MarkTag({ children, className = "" }: MarkTagProps) {
  return (
    <span
      className={`inline-flex items-center justify-center border font-[family-name:var(--font-plano-mono)] text-xs font-medium tracking-wide ${className}`}
    >
      {children}
    </span>
  );
}
