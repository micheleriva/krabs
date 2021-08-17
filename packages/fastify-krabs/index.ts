import type { FastifyRequest, FastifyReply } from 'fastify';
import { getTenantConfig } from '../utils/config';
import { Config } from '../utils/config/config';
import findTenant from '../utils/tenants/findTenant';
import resolveRoutes from '../utils/routes/resolve';
import { currentEnv, environmentWarningMessage } from '../utils/env';

if (!currentEnv) {
  console.warn(environmentWarningMessage);
}

export default async function krabs(
  request: FastifyRequest,
  reply: FastifyReply,
  handle: any,
  app: any,
  config?: Config): Promise<void> {

  const { tenants, enableVhostHeader } = config ?? (await getTenantConfig());
    
  const vhostHeader = enableVhostHeader && request.headers['x-vhost'] as string;
  const rawHostname = request.hostname;
  const pathName = request.url;
  const query = request.query;

  const hostname = rawHostname.replace(/:\d+$/, '');
  const host = vhostHeader || hostname;
  const tenant = findTenant(tenants, host);

  if (!tenant) {
    reply.status(500).send({
      error: 'Invalid tenant',
    });
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
};