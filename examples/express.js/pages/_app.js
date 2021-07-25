import dynamic from 'next/dynamic';

const VeggiesLayout = dynamic(() => import('../components/Layouts/Veggies'));
const EnglishsetterloversLayout = dynamic(() =>
  import('../components/Layouts/EnglishSetterLovers'),
);

const layout = {
  veggies: VeggiesLayout,
  englishsetterlovers: EnglishsetterloversLayout,
};
function App({ Component, pageProps }) {
  const TenantLayout = layout[pageProps.tenant];

  return (
    <TenantLayout>
      <Component {...pageProps} />
    </TenantLayout>
  );
}

App.getInitialProps = async ({ Component, ctx }) => {
  const tenant = ctx?.req?.tenant?.name;
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
