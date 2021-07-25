import { Tenant, Domain, DomainSpec } from '../config/config';
import 'array-flat-polyfill';

export function concatDomains(acc: string[], domain: Domain): string[] {
  const domainsAsStrings = Object.values(domain).map((domain) =>
    domain instanceof RegExp ? domain.toString() : domain,
  );
  return [...acc, ...domainsAsStrings];
}

export function getDuplicatedDomains(domains: DomainSpec[]): DomainSpec[] | null {
  const duplicated = domains.filter((item: DomainSpec, i: number) => domains.includes(item, i + 1));
  return duplicated.length ? duplicated : null;
}

export function validateTenants(tenants: Tenant[]): boolean {
  const domains = tenants
    .flatMap((tenant: Tenant) => tenant.domains)
    .reduce(concatDomains, [])
    .flat();

  const duplicated = getDuplicatedDomains(domains);

  if (duplicated) {
    throw Error(
      `Found some duplicated domains in the multitenant configuration: ${duplicated.join(', ')}`,
    );
  }

  return true;
}
