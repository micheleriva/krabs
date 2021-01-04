import Head from 'next/head';
import Navbar from '../Navbar';

function Layout(props) {
  return (
    <>
      <Head>
        <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet" />
      </Head>
      <Navbar />
      <div className="m-auto max-w-7xl mt-5" style={{ width: 1200 }}>
        {props.children}
      </div>
    </>
  );
}

export default Layout;
