import { join } from 'path';
import { Config, ConfigEntry } from './config.d';

export function getCwdConfig() {
  const configFile = join(process.cwd(), '.krabs.js');
  return require(configFile);
}

export async function getTenantConfig(conf?: ConfigEntry): Promise<Config> {
  if (!conf) conf = getCwdConfig();
  const confType = typeof conf;

  switch (confType) {
    case 'function':
      // @ts-expect-error
      return conf();
    case 'object':
      return (conf as unknown) as Promise<Config>;
    default:
      throw Error(
        `Unknown configuration type. Expected one of: function, object, JSON, got: ${confType}`,
      );
  }
}
