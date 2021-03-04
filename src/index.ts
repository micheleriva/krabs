import { Request, Response } from 'express';
import { parse } from 'url';
import { getTenantConfig } from './config';
import { Config } from './config/config.d';
import findTenant from './tenants/findTenant';
import resolveRoutes from './routes/resolve';

async function krabs(
  req: Request,
  res: Response,
  handle: any,
  app: any,
  config?: Config,
): Promise<void> {
  const { tenants } = config || (await getTenantConfig());
  const { hostname } = req;
  const parsedUrl = parse(req.url, true);
  const { pathname = '/', query } = parsedUrl;
  const tenant = findTenant(tenants, hostname);

  if (!tenant) {
    res.status(500);
    res.end();
    return;
  }

  if (pathname?.startsWith('/_next')) {
    handle(req, res);
    return;
  }

  const route = resolveRoutes(tenant.name, String(pathname));

  if (route) {
    // @ts-ignore
    req.tenant = tenant;
    app.render(req, res, route, query);
    return;
  }

  handle(req, res);
  return;
}

export default krabs;
