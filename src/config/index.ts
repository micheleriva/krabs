import { join } from 'path';
import { Env, Config } from './config.d';

export function getTenantConfig(): Config {
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

export function getCurrentEnv(): Env {
  const currentEnv = process.env.NODE_ENV || 'dev';
  const validEnvs: Env[] = ['dev', 'stage', 'prod', 'development', 'staging', 'production'];

  if (!validEnvs.includes(currentEnv as Env)) {
    console.error(`Invalid Node process environment: ${currentEnv}`);
    process.exit(1);
  }
  return currentEnv as Env;
}
