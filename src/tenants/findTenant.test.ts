import { findTenant } from './findTenant';

describe('findTenant', () => {
  it('should find the right tenant', () => {
    const config = [
      {
        name: 'website-1',
        domains: [
          {
            dev: 'local.website-1.com',
          },
          {
            development: 'local.dev.website-2.com',
          },
        ],
      },
      {
        name: 'website-2',
        domains: [
          {
            dev: /local\.website-2\.[a-z]*\.com/,
          },
        ],
      },
    ];

    expect(findTenant(config, 'local.website-1.com')).toMatchInlineSnapshot(`
      Object {
        "domains": Array [
          Object {
            "dev": "local.website-1.com",
          },
          Object {
            "development": "local.dev.website-2.com",
          },
        ],
        "name": "website-1",
      }
    `);

    expect(findTenant(config, 'local.website-2.example.com')).toMatchInlineSnapshot(`
      Object {
        "domains": Array [
          Object {
            "dev": /local\\\\\\.website-2\\\\\\.\\[a-z\\]\\*\\\\\\.com/,
          },
        ],
        "name": "website-2",
      }
    `);

    expect(findTenant(config, 'local.website-2.foo.com')).toMatchInlineSnapshot(`
      Object {
        "domains": Array [
          Object {
            "dev": /local\\\\\\.website-2\\\\\\.\\[a-z\\]\\*\\\\\\.com/,
          },
        ],
        "name": "website-2",
      }
    `);
  });
});
