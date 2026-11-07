import type { ReactNode } from "react";

interface PageShellProps {
  title: ReactNode;
  subtitle?: ReactNode;
  actions?: ReactNode;
  children: ReactNode;
}

export function PageShell({ title, subtitle, actions, children }: PageShellProps) {
  return (
    <div className="page-container">
      <header className="page__header">
        <div>
          <h1 className="page__title">{title}</h1>
          {subtitle ? <p className="page__subtitle">{subtitle}</p> : null}
        </div>
        {actions ? <div className="page__actions">{actions}</div> : null}
      </header>
      {children}
    </div>
  );
}
