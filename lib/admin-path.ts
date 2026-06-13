const ADMIN_PATH_TOKEN = "cjksofighfjdksaoifughfjdksaosidufhgfjdksjfhgb";

function trimTrailingSlash(value: string) {
  return value.replace(/\/+$/, "") || "/";
}

export function getAdminPathToken() {
  return ADMIN_PATH_TOKEN;
}

export function getAdminBasePath() {
  return `/admin/${ADMIN_PATH_TOKEN}`;
}

export function getAdminDashboardPath() {
  return getAdminBasePath();
}

export function getAdminProductionPath() {
  return `${getAdminBasePath()}/production`;
}

export function getAdminWeddingWorkspacePath(slug: string) {
  return `${getAdminBasePath()}/weddings/${slug}`;
}

export function getAdminWeddingEditPath(slug: string) {
  return `${getAdminBasePath()}/weddings/${slug}/edit`;
}

export function getAdminWeddingInvitationPath(slug: string) {
  return `${getAdminBasePath()}/weddings/${slug}/invitation`;
}

export function normaliseAdminInternalPath(pathname: string) {
  const normalised = trimTrailingSlash(pathname);
  const base = getAdminBasePath();

  if (normalised === base) {
    return "/admin";
  }

  if (normalised === `${base}/production`) {
    return "/production";
  }

  if (normalised.startsWith(`${base}/weddings/`)) {
    return `/admin${normalised.slice(base.length)}`;
  }

  return null;
}

export function isHiddenAdminPath(pathname: string) {
  return normaliseAdminInternalPath(pathname) !== null;
}
