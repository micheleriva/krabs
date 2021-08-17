import React from 'react';
import styles from './HomepageFeatures.module.css';

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          <div className={styles['multitenant-image']}>
            <img src="/img/multitenant-example.png" alt="Multi-tenant example" />
          </div>
          <div className={styles.description}>
            Serve thousands of different websites from a single Next.js installation
          </div>
        </div>
      </div>
    </section>
  );
}
