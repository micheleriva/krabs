module.exports = {
  tenants: [
    {
      name: 'englishsetterlovers',
      domains: [
        {
          development: 'local.englishsetterlovers.com',
          prod: 'englishsetterlovers.krabs.micheleriva.com',
        },
      ],
    },
    {
      name: 'veggies',
      domains: [
        {
          development: /local\.(cabbage|pumpkin|veggies)\.eat\.com/,
          prod: /(cabbage|pumpkin|veggies)\.krabs\.eat\.micheleriva\.com/,
        },
      ],
    },
  ],
};
