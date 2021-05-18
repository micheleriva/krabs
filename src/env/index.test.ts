import { currentEnv, safeEnv } from '.';

// @todo: Mock undefined env variable
test('Testing NODE_ENV environment variable resolution', () => {
  expect(currentEnv).toMatch('test');
  expect(safeEnv).toBe('test');
});
