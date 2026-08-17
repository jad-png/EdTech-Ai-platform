import type { ReactNode } from "react";

export function Card({
  children,
  className = "",
  featured = false,
  radius = "default",
  elevation = "soft",
}: {
  children: ReactNode;
  className?: string;
  featured?: boolean;
  radius?: "default" | "large";
  elevation?: "none" | "soft";
}) {
  return (
    <div
      className={`ui-card ui-card--radius-${radius} ui-card--elevation-${elevation}${featured ? " ui-card--featured" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
