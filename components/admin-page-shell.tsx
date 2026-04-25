import { type ReactNode } from "react";

type AdminPageShellProps = {
  children: ReactNode;
};

export function AdminPageShell({ children }: AdminPageShellProps) {
  return (
    <div data-admin-panel className="min-h-screen">
      {children}
    </div>
  );
}
