const express = require('express');
const next = require('next');
const krabs = require('../../express-krabs/dist/express-krabs').default;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });

async function main() {
  try {
    await app.prepare();

    const handle = app.getRequestHandler();
    const server = express();

    server
      .get('/', (req, res) => res.send('200 status code for Cypress'))
      .get('*', (req, res) => krabs(req, res, handle, app))
      .listen(3400, () => console.log('server ready'));
  } catch (err) {
    console.log(err.stack);
  }
}

main();
