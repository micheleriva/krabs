import express from 'express';
import next from 'next';
import krabs from './src';
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const config = require('./krabs.config');

async function main() {
  try {
    await app.prepare();

    const handle = app.getRequestHandler();
    const server = express();

    server
      .get('*', (req, res) => krabs(req, res, handle, app, config))
      .listen(3000, () => console.log('server ready'));
  } catch (err) {
    console.log(err.stack);
  }
}

main();
