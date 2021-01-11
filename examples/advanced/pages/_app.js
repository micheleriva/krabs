import dynamic from 'next/dynamic';

const VeggiesLayout = dynamic(() => import('../components/Layouts/Veggies'));
const EnglishsetterloversLayout = dynamic(() =>
  import('../components/Layouts/EnglishSetterLovers'),
);

const Layout = {
  'local.cabbage.eat.com': VeggiesLayout,
  'local.pumpkin.eat.com': VeggiesLayout,
  'local.veggies.eat.com': VeggiesLayout,
  'cabbage.krabs.eat.micheleriva.com': VeggiesLayout,
  'pumpkin.krabs.eat.micheleriva.com': VeggiesLayout,
  'veggies.krabs.eat.micheleriva.com': VeggiesLayout,
  'local.englishsetterlovers.com': EnglishsetterloversLayout,
  'englishsetterlovers.krabs.micheleriva.com': EnglishsetterloversLayout,
};

function App({ Component, pageProps }) {
  const TenantLayout = Layout[pageProps.tenant];

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
