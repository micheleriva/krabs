import { Request, Response, Express } from 'express';
import Server from 'next/types';
import { getTenantConfig } from './config';
import findTenant from './tenants/findTenant';

function krabs(req: Request, res: Response, handle: Server, app: Express): void {
  const { tenants } = getTenantConfig();
  const { hostname } = req;

  const tenant = findTenant(tenants, hostname);

}

export default krabs;
