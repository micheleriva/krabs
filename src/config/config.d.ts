export type Env = 'dev' | 'development' | 'prod' | 'production' | 'stage' | 'staging';

export type DomainSpec = string | RegExp;

export type Domain = {
  // @ts-ignore
  [env: Env]: DomainSpec;
};

export type Tenant = {
  name: string;
  domains: Domain[];
};

export type Config = {
  tenants: Tenant[];
  port: number | string;
};

export default Config;
