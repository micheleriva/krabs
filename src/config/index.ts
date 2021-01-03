import path from 'path';
import chalk from 'chalk';
import { Env, Config } from './config.d';

export function getTenantConfig(): Config {
  try {
    const configFile = path.join(process.cwd(), 'krabs.js');
    return require(configFile);
  } catch (err) {
    if (err.code === 'MODULE_NOT_FOUND')
      console.log(chalk.bgRedBright('Unable to find krabs.js configuration file.'));

    console.log(err);
    process.exit(1);
  }
}

export function getCurrentEnv(): Env {
  const currentEnv = process.env.NODE_ENV || 'dev';
  const validEnvs: Env[] = ['dev', 'stage', 'prod'];

  if (!validEnvs.includes(currentEnv)) {
    chalk.bgRedBright(`Invalid Node process environment: ${currentEnv}`);
    process.exit(1);
  }

  return currentEnv;
}
