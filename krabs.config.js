module.exports = {
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
