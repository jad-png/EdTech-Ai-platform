import type { ReactNode } from "react";

export function PageHeader({
  title,
  description,
  actions,
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="page-header">
      <div>
        <div className="page-header__eyebrow">
          <span aria-hidden="true">✦</span> Your learning space
        </div>
        <h1 className="page-header__title">{title}</h1>
        {description && (
          <p className="page-header__description">{description}</p>
        )}
      </div>
      {actions && <div className="page-header__actions">{actions}</div>}
    </div>
  );
}
