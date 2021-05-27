import { Request, Response } from 'express';
import { default as chalk } from 'chalk';
import { parse } from 'url';
import memoize from 'fast-memoize';
import { getTenantConfig } from './config';
import { Config } from './config/config.d';
import findTenant from './tenants/findTenant';
import resolveRoutes from './routes/resolve';
import { currentEnv, safeEnv } from './env';

if (!currentEnv) {
  const warningMessage = `
    \u{26A0}\u{FE0F} ${chalk.bold(' Warning ')}
    The ${chalk.bold('NODE_ENV')} environment variable is ${chalk.bold('undefined')}.
    Krabs will run in ${chalk.bold(safeEnv)} mode, meaning it will only serve
    tenants domains set as ${chalk.bold(safeEnv)} domains.
  `
    .split('\n')
    .map((line) => line.trimLeft())
    .join('\n');

  console.warn(chalk.yellow(warningMessage));
}

async function krabs(
  req: Request,
  res: Response,
  handle: any,
  app: any,
  config?: Config,
): Promise<void> {
  const { tenants } = await (await memoize(async () => config ?? (await getTenantConfig())))();
  const { hostname } = req;
  const parsedUrl = parse(req.url, true);
  const { pathname = '/', query } = parsedUrl;
  const tenant = (await memoize(() => findTenant(tenants, hostname)))();

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
