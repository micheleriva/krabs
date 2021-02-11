import dynamic from 'next/dynamic';

const VeggiesLayout = dynamic(() => import('../components/Layouts/Veggies'));
const EnglishsetterloversLayout = dynamic(() =>
  import('../components/Layouts/EnglishSetterLovers'),
);

function getLayout(tenant) {
  switch (tenant) {
    case 'local.cabbage.eat.com':
    case 'local.pumpkin.eat.com':
    case 'local.veggies.eat.com':
    case 'cabbage.krabs.eat.micheleriva.com':
    case 'pumpkin.krabs.eat.micheleriva.com':
    case 'veggies.krabs.eat.micheleriva.com':
      return VeggiesLayout;
    case 'local.englishsetterlovers.com':
    case 'englishsetterlovers.krabs.micheleriva.com':
      return EnglishsetterloversLayout;
  }
}

function App({ Component, pageProps }) {
  const TenantLayout = getLayout(pageProps.tenant);

  return (
    <TenantLayout>
      <Component {...pageProps} />
    </TenantLayout>
  );
}

App.getInitialProps = async ({ Component, ctx }) => {
  const tenant = ctx?.req?.hostname;
  let pageProps = {};

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  return {
    pageProps: {
      ...pageProps,
      tenant,
    },
  };
};

export default App;
