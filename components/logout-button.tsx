"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type LogoutButtonProps = {
  redirectTo?: string;
};

export function LogoutButton({ redirectTo }: LogoutButtonProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogout() {
    setIsLoading(true);

    try {
      await fetch("/api/portal-logout", {
        method: "POST"
      });
      const nextDestination = redirectTo?.trim()
        ? `/portal-login?next=${encodeURIComponent(redirectTo.trim())}`
        : "/";
      router.replace(nextDestination);
      router.refresh();
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <button
      onClick={handleLogout}
      disabled={isLoading}
      className="accent-panel rounded-full px-4 py-2 text-sm disabled:opacity-60"
    >
      {isLoading ? "Signing out..." : "Sign out"}
    </button>
  );
}
