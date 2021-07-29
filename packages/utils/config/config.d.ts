export type DomainSpec = string | RegExp;

export type Domain = {
  [key: string]: DomainSpec;
};

type NonEmptyArray<A> = A[] & { 0: A };
export type Tenant = {
  name: string;
  domains: NonEmptyArray<Domain>;
};

export type Config = {
  tenants: Tenant[];
  port: number | string;
  enableVhostHeader: boolean;
};

export type ConfigEntry = (() => Config) | (() => Promise<Config>) | Config;

export default Config;
