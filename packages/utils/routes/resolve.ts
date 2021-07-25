export function resolveRoutes(tenantName: string, pathname: string): string {
  return pathname === '/' ? `/${tenantName}` : `/${tenantName}${pathname}`;
}

export default resolveRoutes;
