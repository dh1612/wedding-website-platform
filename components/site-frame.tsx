import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { type SiteMode } from "@/lib/site-navigation";
import { type CSSProperties, type ReactNode } from "react";
import type { WeddingData } from "@/types/wedding";

type SiteFrameProps = {
  children: ReactNode;
  currentPath: string;
  mode: SiteMode;
  themeId: string;
  themeStyle: CSSProperties;
  adminView?: boolean;
  portalType?: "couple" | "operator";
  adminNavItemsOverride?: Array<{ label: string; path: string }>;
  weddingData?: WeddingData;
};

export function SiteFrame({
  children,
  currentPath,
  mode,
  themeId,
  themeStyle,
  adminView = false,
  portalType = "couple",
  adminNavItemsOverride,
  weddingData
}: SiteFrameProps) {
  return (
    <main data-theme={themeId} data-admin={adminView ? "true" : "false"} style={themeStyle}>
      <SiteHeader
        currentPath={currentPath}
        mode={mode}
        themeId={themeId}
        adminView={adminView}
        portalType={portalType}
        adminNavItemsOverride={adminNavItemsOverride}
        weddingData={weddingData}
      />
      {children}
      <SiteFooter />
    </main>
  );
}
