import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getFontPresetById } from "@/lib/font-presets";
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
  showFooter?: boolean;
  homeHref?: string;
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
  weddingData,
  showFooter = true,
  homeHref
}: SiteFrameProps) {
  const fontPresetStyle = weddingData
    ? getFontPresetById(weddingData.fontPreset).style
    : {};

  return (
    <main
      data-theme={themeId}
      data-admin={adminView ? "true" : "false"}
      style={{ ...themeStyle, ...fontPresetStyle } as CSSProperties}
    >
      <SiteHeader
        currentPath={currentPath}
        mode={mode}
        themeId={themeId}
        adminView={adminView}
        portalType={portalType}
        adminNavItemsOverride={adminNavItemsOverride}
        weddingData={weddingData}
        homeHref={homeHref}
      />
      {children}
      {showFooter ? <SiteFooter weddingData={weddingData} /> : null}
    </main>
  );
}
