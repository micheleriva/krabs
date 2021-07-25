import { Request, Response } from 'express';
import * as chalk from 'chalk';
import { parse } from 'url';
import * as path from 'path';
import { getTenantConfig } from '../utils/config';
import { Config } from '../utils/config/config';
import findTenant from '../utils/tenants/findTenant';
import resolveRoutes from '../utils/routes/resolve';
import { currentEnv, safeEnv } from '../utils/env';

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
  const { tenants } = config ?? (await getTenantConfig());
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
