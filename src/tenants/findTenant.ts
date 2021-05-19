import { Tenant, DomainSpec } from '../config/config.d';
import { safeEnv } from '../env';

export function findTenant(tenants: Tenant[], hostname: string): Tenant | undefined {
  return tenants.find((tenant: Tenant) => {
    const domains = tenant.domains.reduce((acc, current) => {
      const currentEnvDomains = current?.[safeEnv] ?? {};
      return [...acc, currentEnvDomains] as never;
    }, []) as DomainSpec[];

    if (domains.includes(hostname)) {
      return true;
    } else {
      const regexDomains = domains.filter(
        (domain: DomainSpec) => domain instanceof RegExp,
      ) as RegExp[];
      const match = regexDomains.map((domain: RegExp) => domain.test(hostname)).filter(Boolean);
      return match.length;
    }
  });
}

export default findTenant;
