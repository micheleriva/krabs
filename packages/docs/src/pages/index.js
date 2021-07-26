import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
import HomepageFeatures from '../components/HomepageFeatures';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={styles.heroBanner}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">
          Krabs is an enterprise-ready Express.js middleware <br />
          for serving <b>thousands*</b> of different websites from a single Next.js instance.
        </p>
        <p>*Tested up to 3M tenants!</p>
        <div className={styles.buttons}>
          <Link className="button button--secondary button--lg" to="/docs/intro">
            Krabs Tutorial - 5min&nbsp;
            <span role="image" aria-label="5min tutorial">
              ⏱️
            </span>
          </Link>
        </div>
        <div className={styles['krabs-image']}>
          <img src="/krabs/img/krabs-small.png" alt="Mr Krabs" />
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title={`${siteConfig.title} - ${siteConfig.tagline}`} description={siteConfig.tagline}>
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
