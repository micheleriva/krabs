import { Env } from './packages/utils/config/config';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      [key: string]: string | undefined;
      NODE_ENV?: Env;
    }
  }
}
