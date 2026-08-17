import type { ReactNode } from "react";

type IconTone = "pink" | "orange" | "yellow" | "teal" | "blue" | "violet";

export function IconBadge({
  icon,
  tone = "violet",
  size = "small",
}: {
  icon: ReactNode;
  tone?: IconTone;
  size?: "small" | "large";
}) {
  return (
    <span
      className={`icon-badge icon-badge--${tone} icon-badge--${size}`}
      aria-hidden="true"
    >
      {icon}
    </span>
  );
}
