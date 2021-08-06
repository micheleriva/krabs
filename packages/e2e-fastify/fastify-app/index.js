const fastify = require('fastify')({ trustProxy: true });
const next = require('next');
const krabs = require('../../fastify-krabs/dist/fastify-krabs/index').default;

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });

async function main() {
  try {
    await app.prepare();
    const handle = app.getRequestHandler();

    fastify
      .get('/', (_, reply) => reply.send('200 status code for Cypress'))
      .get('*', (request, reply) => krabs(request, reply, handle, app))
      .listen(3300, () => console.log('server ready'));
  } catch (err) {
    console.log(err.stack);
  }
}

main();
