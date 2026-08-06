/** Prefixed public path (matches next.config basePath). */
export const asset = (path: string) =>
  `/Vetro-Studio${path.startsWith("/") ? path : `/${path}`}`;
