import { Env } from './src/config/config';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      [key: string]: string | undefined;
      NODE_ENV?: Env;
    }
  }
}
