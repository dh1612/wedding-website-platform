export function shouldBypassImageOptimization(src: string | undefined | null) {
  return typeof src === "string" && /^https?:\/\//i.test(src);
}
