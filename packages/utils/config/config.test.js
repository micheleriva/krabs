import mockFs from 'mock-fs';
import * as conf from './';

const configExampleAsObj = {
  tenants: [
    {
      name: 'website-1',
      domains: [
        {
          dev: 'local.website-1.com',
          stage: 'stage.website-1.com',
          prod: 'website-1.com',
        },
      ],
    },
    {
      name: 'website-2',
      domains: [
        {
          dev: 'local.website-2.com',
          stage: 'stage.website-2.com',
          prod: 'website-2.com',
        },
      ],
    },
    {
      name: 'website-3',
      domains: [
        {
          dev: 'local.website-3.com',
          stage: 'stage.website-3.com',
          prod: 'website-3.com',
        },
      ],
    },
  ],
};

const configExampleAsFn = () => ({
  tenants: [
    {
      name: 'website-1',
      domains: [
        {
          dev: 'local.website-1.com',
          stage: 'stage.website-1.com',
          prod: 'website-1.com',
        },
      ],
    },
    {
      name: 'website-2',
      domains: [
        {
          dev: 'local.website-2.com',
          stage: 'stage.website-2.com',
          prod: 'website-2.com',
        },
      ],
    },
    {
      name: 'website-3',
      domains: [
        {
          dev: 'local.website-3.com',
          stage: 'stage.website-3.com',
          prod: 'website-3.com',
        },
      ],
    },
  ],
});

const configExampleAsAsyncFn = async () => ({
  tenants: [
    {
      name: 'website-1',
      domains: [
        {
          dev: 'local.website-1.com',
          stage: 'stage.website-1.com',
          prod: 'website-1.com',
        },
      ],
    },
    {
      name: 'website-2',
      domains: [
        {
          dev: 'local.website-2.com',
          stage: 'stage.website-2.com',
          prod: 'website-2.com',
        },
      ],
    },
    {
      name: 'website-3',
      domains: [
        {
          dev: 'local.website-3.com',
          stage: 'stage.website-3.com',
          prod: 'website-3.com',
        },
      ],
    },
  ],
});

test('getTenantConfig', async () => {
  expect(await conf.getTenantConfig(configExampleAsObj)).toMatchSnapshot();
  expect(await conf.getTenantConfig(configExampleAsFn)).toMatchSnapshot();
  expect(await conf.getTenantConfig(configExampleAsAsyncFn)).toMatchSnapshot();

  try {
    await conf.getTenantConfig('Wrong config');
  } catch (e) {
    // eslint-disable-next-line
    expect(e).toMatchInlineSnapshot(
      `[Error: Unknown configuration type. Expected one of: function, object, JSON, got: string]`,
    );
  }
});

test('getCwdConfig throwing an error', () => {
  mockFs({
    '.k.config.js': {}, // wrong file name, should not be resolved
  });
  expect(conf.getCwdConfig).toThrowErrorMatchingInlineSnapshot(`"No configuration file found"`);
  mockFs.restore();
});

test('getCwdConfig on .krabs.config.js file', () => {
  mockFs({
    '.krabs.config.js': configExampleAsFn(),
  });
  expect(conf.getCwdConfig).toMatchSnapshot();
  mockFs.restore();
});

test('getCwdConfig on .krabs.js file', () => {
  mockFs({
    '.krabs.js': configExampleAsFn(),
  });
  expect(conf.getCwdConfig).toMatchSnapshot();
  mockFs.restore();
});

test('Testing Krabs config against a large number of vhosts', async () => {
  let config = [];

  for (let i = 0; i < 10_000; i++) {
    config.push({
      name: `website-${i}.com`,
      domains: [
        {
          test: `test.${i}.website.com`,
          dev: `local.${i}.website.com`,
        },
      ],
    });
  }

  expect(await conf.getTenantConfig(config)).toMatchSnapshot();
});
