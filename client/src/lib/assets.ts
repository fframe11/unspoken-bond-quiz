export const ASSET_VERSION = "20260508-asset-fix-1";

export function withAssetVersion(src: string, retryKey?: string | number) {
  const separator = src.includes("?") ? "&" : "?";
  const retry = retryKey ? `&r=${retryKey}` : "";
  return `${src}${separator}v=${ASSET_VERSION}${retry}`;
}
