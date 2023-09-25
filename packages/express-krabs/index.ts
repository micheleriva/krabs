import { Request, Response } from 'express';
import { parse } from 'url';
import * as path from 'path';
import { getTenantConfig } from '../utils/config';
import { Config } from '../utils/config/config';
import findTenant from '../utils/tenants/findTenant';
import resolveRoutes from '../utils/routes/resolve';
import { currentEnv, environmentWarningMessage } from '../utils/env';
import { normalizeLocalePath } from '../utils/i18n/normalize-locale-path';
import { getAcceptPreferredLocale } from '../utils/i18n/get-accept-preferred-locale';

if (!currentEnv) {
  console.warn(environmentWarningMessage);
}

async function krabs(
  req: Request,
  res: Response,
  handle: any,
  app: any,
  config?: Config,
): Promise<void> {
  // @ts-ignore
  req.locale = null;

  const { tenants, enableVhostHeader } = config ?? (await getTenantConfig());

  const { hostname } = req;
  const vhostHeader = enableVhostHeader && (req.headers['x-vhost'] as string);
  const host = vhostHeader || hostname;

  const parsedUrl = parse(req.url, true);

  let { pathname = '/', query } = parsedUrl;

  const tenant = findTenant(tenants, host);

  if (!tenant) {
    res.status(500);
    res.end();
    return;
  }

  if (pathname?.startsWith('/_next')) {
    handle(req, res);
    return;
  }

  if (pathname?.startsWith('/api/')) {
    try {
      const APIPath = pathname.replace(/^\/api\//, '');
      const { default: APIhandler } = require(path.join(
        process.cwd(),
        `pages/${tenant.name}/api/${APIPath}`,
      ));
      APIhandler(req, res);
    } catch (_) {
      handle(req, res);
    }
    return;
  }

  if (
    tenant?.i18n?.locales.length &&
    tenant?.i18n?.defaultLocale &&
    tenant?.i18n?.locales.includes(tenant?.i18n?.defaultLocale)
  ) {
    const newPath = normalizeLocalePath(pathname as string, tenant.i18n.locales);
    const preferredLocale = getAcceptPreferredLocale(tenant.i18n, req.headers);

    const detectedLocale = newPath?.detectedLocale || preferredLocale || tenant.i18n.defaultLocale;

    if (
      detectedLocale.toLowerCase() !== newPath?.detectedLocale &&
      detectedLocale.toLowerCase() !== tenant.i18n.defaultLocale
    ) {
      const redirectUrl = `/${detectedLocale}${pathname}${parsedUrl.search ?? ''}`;
      res.redirect(redirectUrl);
    }

    if (detectedLocale) {
      // @ts-ignore
      req.locale = detectedLocale;
    }

    pathname = newPath.pathname;
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
