export type Env = 'test' | 'dev' | 'development' | 'prod' | 'production' | 'stage' | 'staging';

export type DomainSpec = string | RegExp;

export type Domain = {
  [key in Env]: DomainSpec
};

type NonEmptyArray<A> = A[]
export type Tenant = {
  name: string;
  domains: NonEmptyArray<Domain>;
};

export type Config = {
  tenants: Tenant[];
  port: number | string;
};

export default Config;
