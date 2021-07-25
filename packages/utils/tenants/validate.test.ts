import { validateTenants, getDuplicatedDomains, concatDomains } from './validate';

const validTenants = [
  {
    name: 'website-1',
    domains: [
      {
        dev: 'local.website-1.com',
        stage: 'stage.website-1.com',
        prod: 'website-1.com',
      },
      {
        development: 'local.test.website-1.com',
        staging: 'stage.test.website-1.com',
        production: 'prod.website-1.com',
      },
    ],
  },
  {
    name: 'website-2',
    domains: [
      {
        dev: /local\.website-1\.com/,
        stage: 'stage.website-2.com',
        prod: 'website-2.com',
      },
      {
        development: /local\.([a-z][0-9])*\.website-2\.com/,
        staging: 'stage.test.website-2.com',
        production: 'prod.website-2.com',
      },
    ],
  },
];

const notValidTenants = [
  {
    name: 'website-1',
    domains: [
      {
        dev: /local\.website-1\.com/,
        stage: 'stage.website-1.com',
        prod: 'website-2.com',
      },
      {
        development: 'local.test.website-1.com',
        staging: 'stage.test.website-1.com',
        production: 'prod.website-1.com',
      },
    ],
  },
  {
    name: 'website-2',
    domains: [
      {
        dev: /local\.website-1\.com/,
        stage: 'stage.website-2.com',
        prod: 'website-2.com',
      },
      {
        development: /local\.([a-z][0-9])*\.website-2\.com/,
        staging: 'stage.test.website-2.com',
        production: 'prod.website-2.com',
      },
    ],
  },
];

describe('validateTenants', () => {
  it('should correctly validate the "validTenants" configuration', () => {
    expect(validateTenants(validTenants)).toBeTruthy();
  });
  it('should throw an error because of duplicated domains', () => {
    expect(() => validateTenants(notValidTenants)).toThrowErrorMatchingInlineSnapshot(
      `"Found some duplicated domains in the multitenant configuration: /local\\\\.website-1\\\\.com/, website-2.com"`,
    );
  });
});

describe('getDuplicatedDomains', () => {
  it('should return a list of duplicated domains inside a given array', () => {
    expect(getDuplicatedDomains(['website-1.com', 'website-2.com'])).toBeNull();
    expect(getDuplicatedDomains([/website-1\.com/, /website-2\.com/])).toBeNull();
    expect(getDuplicatedDomains(['website-1.com', 'website-2', 'website-1.com']))
      .toMatchInlineSnapshot(`
      Array [
        "website-1.com",
      ]
    `);
  });
});

describe('concatDomains', () => {
  it('should concatenate a list of domain transforming regex to strings', () => {
    expect(concatDomains([], { dev: 'website-1.com', prod: 'website-2.com' }))
      .toMatchInlineSnapshot(`
      Array [
        "website-1.com",
        "website-2.com",
      ]
    `);
    expect(
      concatDomains(['website-3'], {
        dev: /website-1\.com/,
        prod: /www\.([a-z]*)+\.website-2\.com/,
      }),
    ).toMatchInlineSnapshot(`
      Array [
        "website-3",
        "/website-1\\\\.com/",
        "/www\\\\.([a-z]*)+\\\\.website-2\\\\.com/",
      ]
    `);
  });
});
