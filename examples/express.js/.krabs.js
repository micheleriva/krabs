module.exports = {
  tenants: [
    {
      name: 'englishsetterlovers',
      domains: [
        {
          development: 'local.englishsetterlovers.com',
          production: 'englishsetterlovers.krabs.micheleriva.com',
        },
      ],
    },
    {
      name: 'veggies',
      domains: [
        {
          development: /local\.(cabbage|pumpkin|veggies)\.eat\.com/,
          production: /(cabbage|pumpkin|veggies)\.krabs\.eat\.micheleriva\.com/,
        },
      ],
    },
  ],
};
