export const isAdminUiEnabled = process.env.NODE_ENV === "development";

export function isLoopbackHostname(hostHeader: string): boolean {
  let host = hostHeader.trim().toLowerCase();

  if (host.startsWith("[")) {
    const end = host.indexOf("]");
    host = end === -1 ? host.slice(1) : host.slice(1, end);
  } else {
    host = host.split(":")[0];
  }

  return host === "localhost" || host === "127.0.0.1" || host === "::1";
}

export function canAccessAdmin(hostHeader: string | null | undefined): boolean {
  if (!isAdminUiEnabled || !hostHeader) {
    return false;
  }

  return isLoopbackHostname(hostHeader);
}
