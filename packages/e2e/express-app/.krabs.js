module.exports = {
  enableVhostHeader: true,
  tenants: [
    {
      name: 'website-1',
      domains: [
        {
          production: /(e2e\.)?website-1.com/,
        },
      ],
    },
    {
      name: 'website-2',
      domains: [
        {
          production: 'website-2.com'
        },
      ],
    },
  ],
};