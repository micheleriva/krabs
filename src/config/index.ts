import { join } from 'path';
import { Config, ConfigEntry } from './config.d';

function getCwdConfig() {
  try {
    const configFile = join(process.cwd(), '.krabs.js');
    return require(configFile);
  } catch (err) {
    if (err.code === 'MODULE_NOT_FOUND')
      console.error('Unable to find krabs.js configuration file.');

    console.log(err);
    process.exit(1);
  }
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
