import { bold, yellow } from 'chalk';
import type { FastifyRequest, FastifyReply } from 'fastify';
import { currentEnv, safeEnv } from '../utils/env';
import { getTenantConfig } from '../utils/config';
import { Config } from '../utils/config/config';
import findTenant from '../utils/tenants/findTenant';
import resolveRoutes from '../utils/routes/resolve';

if (!currentEnv) {
  const warningMessage = `
    \u{26A0}\u{FE0F} ${bold(' Warning ')}
    The ${bold('NODE_ENV')} environment variable is ${bold('undefined')}.
    Krabs will run in ${bold(safeEnv)} mode, meaning it will only serve
    tenants domains set as ${bold(safeEnv)} domains.
  `
    .split('\n')
    .map((line) => line.trimLeft())
    .join('\n');

  console.warn(yellow(warningMessage));
}

export default async function krabs(
  request: FastifyRequest,
  reply: FastifyReply,
  app: any,
  handle: any,
  config?: Config): Promise<void> {

  const { tenants } = config ?? (await getTenantConfig());
    
  const rawHostname = request.hostname;
  const pathName = request.url;
  const query = request.query;

  const hostname = rawHostname.replace(/:\d+$/, '');
  const tenant = findTenant(tenants, hostname);

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