export const ASSET_VERSION = "20260508-asset-fix-1";

export function withAssetVersion(src: string, retryKey?: string | number) {
  const separator = src.includes("?") ? "&" : "?";
  const retry = retryKey ? `&r=${retryKey}` : "";
  return `${src}${separator}v=${ASSET_VERSION}${retry}`;
}

export function preloadImage(src: string) {
  if (typeof window === "undefined") return;

  const image = new Image();
  image.decoding = "async";
  image.src = withAssetVersion(src);
}

export function preloadImages(sources: string[]) {
  sources.forEach(preloadImage);
}
