export const currentEnv = process.env?.NODE_ENV;
export const safeEnv = currentEnv ?? 'development';
