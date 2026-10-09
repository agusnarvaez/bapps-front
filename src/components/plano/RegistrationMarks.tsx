interface RegistrationMarksProps {
  className?: string;
  tone?: "light" | "dark";
}

/** A single crosshair + circle, the print/drafting registration mark. */
function Mark({ tone }: { tone: "light" | "dark" }) {
  const stroke = tone === "light" ? "rgba(242,236,220,0.55)" : "rgba(14,47,90,0.4)";
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="6" stroke={stroke} strokeWidth="1" />
      <path d="M12 0v24M0 12h24" stroke={stroke} strokeWidth="1" />
    </svg>
  );
}

/**
 * Four corner registration marks, the print/plotter convention for aligning
 * a sheet. Pure chrome — no copy, no claims — signaling "this is a drawing
 * sheet" at every viewport without adding invented labels.
 */
export default function RegistrationMarks({ className = "", tone = "light" }: RegistrationMarksProps) {
  return (
    <div className={`pointer-events-none absolute inset-4 sm:inset-6 ${className}`} aria-hidden="true">
      <div className="absolute left-0 top-0">
        <Mark tone={tone} />
      </div>
      <div className="absolute right-0 top-0">
        <Mark tone={tone} />
      </div>
      <div className="absolute bottom-0 left-0">
        <Mark tone={tone} />
      </div>
      <div className="absolute bottom-0 right-0">
        <Mark tone={tone} />
      </div>
    </div>
  );
}
