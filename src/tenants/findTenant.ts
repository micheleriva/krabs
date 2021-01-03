import { Tenant, DomainSpec } from '../config/config.d';

export function findTenant(tenants: Tenant[], hostname: string): Tenant | undefined {
  return tenants.find((tenant: Tenant) => {
    // @ts-ignore
    const domains: DomainSpec[] = tenant.domains.reduce(
      // @ts-ignore
      (acc, current) => [...acc, ...Object.values(current)],
      [],
    );

    if (domains.includes(hostname)) {
      return true;
    } else {
      // @ts-ignore
      const regexDomains: RegExp[] = domains.filter(
        (domain: DomainSpec) => domain instanceof RegExp,
      );
      const match = regexDomains.map((domain: RegExp) => domain.test(hostname)).filter(Boolean);
      return match.length;
    }
  });
}

export default findTenant;
