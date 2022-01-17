import type { FastifyRequest, FastifyReply } from 'fastify';
import { getTenantConfig } from '../utils/config';
import { Config } from '../utils/config/config';
import findTenant from '../utils/tenants/findTenant';
import resolveRoutes from '../utils/routes/resolve';
import { currentEnv, environmentWarningMessage } from '../utils/env';
import { normalizeLocalePath } from '../utils/i18n/normalize-locale-path';
import { getAcceptPreferredLocale } from '../utils/i18n/get-accept-preferred-locale';
import { parse } from 'url';

if (!currentEnv) {
  console.warn(environmentWarningMessage);
}

export default async function krabs(
  request: FastifyRequest,
  reply: FastifyReply,
  handle: any,
  app: any,
  config?: Config,
): Promise<void> {
  // @ts-ignore
  request.raw.locale = null;

  const { tenants, enableVhostHeader } = config ?? (await getTenantConfig());

  const vhostHeader = enableVhostHeader && (request.headers['x-vhost'] as string);
  const rawHostname = request.hostname;
  let pathName = request.url;
  const query = request.query;

  const hostname = rawHostname.replace(/:\d+$/, '');
  const host = vhostHeader || hostname;
  const tenant = findTenant(tenants, host);
  const parsedUrl = parse(request.url, true);

  if (!tenant) {
    reply.status(500).send({
      error: 'Invalid tenant',
    });
  }

  if (pathName?.startsWith('/_next')) {
    handle(request.raw, reply.raw);
    return;
  }

  if (
    tenant?.i18n?.locales.length &&
    tenant?.i18n?.defaultLocale &&
    tenant?.i18n?.locales.includes(tenant?.i18n?.defaultLocale)
  ) {
    const newPath = normalizeLocalePath(pathName as string, tenant.i18n.locales);
    const preferredLocale = getAcceptPreferredLocale(tenant.i18n, request.headers);

    const detectedLocale = newPath?.detectedLocale || preferredLocale || tenant.i18n.defaultLocale;

    if (
      detectedLocale.toLowerCase() !== newPath?.detectedLocale &&
      detectedLocale.toLowerCase() !== tenant.i18n.defaultLocale
    ) {
      const redirectUrl = `/${detectedLocale}${pathName}${parsedUrl.search ?? ''}`;
      reply.redirect(redirectUrl);
    }

    if (detectedLocale) {
      // @ts-ignore
      request.raw.locale = detectedLocale;
    }

    pathName = newPath.pathname;
  }

  const route = resolveRoutes(tenant?.name as string, pathName);

  if (route) {
    // @ts-ignore
    request.tenant = tenant;
    app.render(request.raw, reply.raw, route, query);
    return;
  }

  handle(request, reply);
  return;
}
