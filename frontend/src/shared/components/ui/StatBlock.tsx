import type { ReactNode } from "react";

export function StatBlock({
  value,
  label,
  icon,
  tone = "violet",
}: {
  value: string | number;
  label: string;
  icon?: ReactNode;
  tone?: "pink" | "orange" | "yellow" | "teal" | "blue" | "violet";
}) {
  return (
    <div className={`stat-block stat-block--${tone}`}>
      {icon && (
        <span className="stat-block__icon" aria-hidden="true">
          {icon}
        </span>
      )}
      <strong className="stat-block__value">{value}</strong>
      <span className="stat-block__label">{label}</span>
    </div>
  );
}
