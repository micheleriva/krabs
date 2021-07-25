import { findTenant } from './findTenant';

describe('findTenant', () => {
  it('should find the right tenant', () => {
    const config = [
      {
        name: 'website-1',
        domains: [
          {
            dev: 'local.website-1.com',
            test: 'test.website-1.com',
          },
          {
            development: 'local.dev.website-2.com',
            prod: 'prod.website-2.com',
            test: 'test.website-2.com',
          },
        ],
      },
      {
        name: 'website-2',
        domains: [
          {
            dev: /local\.website-2\.[a-z]*\.com/,
            test: /test\.website-2\.[a-z]*\.com/,
          },
        ],
      },
    ];

    expect(findTenant(config, 'test.website-1.com')).toMatchSnapshot();
    expect(findTenant(config, 'test.website-2.example.com')).toMatchSnapshot();
    expect(findTenant(config, 'test.website-2.foo.com')).toMatchSnapshot();
    expect(findTenant(config, 'test.website-2.bar.com')).toMatchSnapshot();
    expect(findTenant(config, 'test.website-2.krabs.com')).toMatchSnapshot();
  });
});

test('Testing Krabs "findTenant" against a large number of vhosts', async () => {
  let config = [];

  for (let i = 0; i < 1_000_000; i++) {
    config.push({
      name: `website-${i}.com`,
      domains: [
        {
          test: `test.${i}.website.com`,
          dev: `local.${i}.website.com`,
        },
        {
          test: `test.${i}.${i}.website.com`,
        },
      ],
    });
  }

  expect(await findTenant(config, 'test.1.website.com')).toMatchSnapshot();
  expect(await findTenant(config, 'test.999.999.website.com')).toMatchSnapshot();
  expect(await findTenant(config, 'test.99999.website.com')).toMatchSnapshot();
  expect(await findTenant(config, 'test.9999999.website.com')).toMatchSnapshot();
  expect(await findTenant(config, 'test.9999999.9999.website.com')).toMatchSnapshot();
});
