import type { ReactNode } from "react";

export function Badge({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: "neutral" | "accent" | "success";
}) {
  return <span className={`ui-badge ui-badge--${tone}`}>{children}</span>;
}
