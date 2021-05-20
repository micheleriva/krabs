/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'Krabs',
  tagline: 'Express.js middleware for multi-tenant Next.js applications',
  url: 'https://micheleriva.github.io/krabs',
  baseUrl: '/krabs/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'micheleriva', // Usually your GitHub org/user name.
  projectName: 'krabs', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'Krabs',
      logo: {
        alt: 'Krabs',
        src: 'img/krabs-small.png',
      },
      items: [
        {
          to: '/docs/intro',
          label: 'Docs',
          position: 'left',
        },
        {
          to: '/docs/tutorial-basics/getting-started',
          position: 'left',
          label: 'Tutorial',
        },
        {
          href: 'https://github.com/micheleriva/krabs',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Tutorial',
              to: '/docs/intro',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Issues',
              href: 'https://github.com/micheleriva/krabs/issues',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/MicheleRivaCode',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/facebook/docusaurus',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Michele Riva. Built with Docusaurus.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: 'https://github.com/facebook/docusaurus/edit/master/website/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl: 'https://github.com/facebook/docusaurus/edit/master/website/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
