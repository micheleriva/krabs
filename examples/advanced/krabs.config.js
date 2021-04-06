module.exports = {
  tenants: [
    {
      name: 'englishsetterlovers',
      domains: [
        {
          dev: 'local.englishsetterlovers.com',
          prod: 'englishsetterlovers.krabs.micheleriva.com',
        },
      ],
    },
    {
      name: 'veggies',
      domains: [
        {
          dev: /local\.(cabbage|pumpkin|veggies)\.eat\.com/,
          prod: /(cabbage|pumpkin|veggies)\.krabs\.eat\.micheleriva\.com/,
        },
      ],
    },
  ],
};
