<img src="/misc/krabs-cover.png" />

[![Build Status](https://github.com/micheleriva/krabs/actions/workflows/coverage.yml/badge.svg)](https://github.com/micheleriva/krabs/actions/workflows/coverage.yml)
[![codecov](https://codecov.io/gh/micheleriva/krabs/branch/main/graph/badge.svg?token=s46QYu6uUJ)](https://codecov.io/gh/micheleriva/krabs)
[![NPM Downloads](https://img.shields.io/npm/dt/krabs)](https://www.npmjs.com/package/krabs)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

**Krabs** is an enterprise-ready Express.js/Fastify middleware for serving **thousands** of different websites from a single Next.js instance.

- [Installation](#installation)
- [Things to know](#things-to-know)
- [Installation](#installation)
- [Getting started](#getting-started)
  - [Examples](#examples)
- [Documentation](#documentation)
- [License](#license)

# Installation

Krabs is available on **npm** and can be installed as follows:

**For Express.js** (see on [npm](https://www.npmjs.com/package/krabs))

```bash
yarn add krabs

# or

npm install --save krabs
```

**For Fastify** (see on [npm](https://www.npmjs.com/package/fastify-krabs))

```bash
yarn add fastify-krabs

# or

npm insall --save fastify-krabs
```

# Things to know

- Krabs forces you to use a custom server. Therefore, deployments to Vercel are not supported.
- `_app` and `_document` pages are common to every website.

# Getting Started

You can watch a video introduction on **YouTube**:

<a href="https://www.youtube.com/watch?v=71NRAnT4G4Q" target="_blank">
  <img src="/misc/krabs-yt-intro.png" />
</a>

## Examples

<details>
  <summary><b>Express.js example</b></summary>

Let's say that we want to support two different websites with just one Next.js instance, and serve them using just one Express.js server.
Write the following configuration inside a `.krabs.js` or `.krabs.config.js` file inside of the root of your project:

```js
module.exports = {
  tenants: [
    {
      name: 'website-1',
      domains: [
        {
          development: /dev\.[a-z]*\.local\.website-1\.com/, // Regex supported!
          staging: 'stage.website-1.com',
          production: 'website-1.com',
        },
      ],
    },
    {
      name: 'website-2',
      domains: [
        {
          development: 'local.website-2.com',
          staging: 'stage.website-2.com',
          production: /[\w|\d|-|_]+\.website-2.com/, // Regex supported!
        },
      ],
    },
  ],
};
```

Create an `index.js` file and fill it with the following content:

```js
const express = require('express');
const next = require('next');
const krabs = require('krabs').default;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });

async function main() {
  try {
    await app.prepare();

    const handle = app.getRequestHandler();
    const server = express();

    server
      .get('*', (req, res) => krabs(req, res, handle, app))
      .listen(3000, () => console.log('server ready'));
  } catch (err) {
    console.log(err.stack);
  }
}

main();
```

Inside our `.krabs.js` file, we configured two tenants with two different `name` properties: `website-1` and `website-2`.
So now let's create two new folders inside of the Next.js' default `pages/` directory:

```txt
pages/
  - _app.js
  - website-1
  - website-2
```

Feel free to add any page you want inside both of these folders, as they will be treated as they were the default Next.js' `pages/` folder.
Let's add the following content to `pages/website-1/about.js`:

```jsx
function About() {
  return <div> About website 1 </div>;
}

export default About;
```

and the following code to `pages/website-2/about.js`:

```jsx
function About() {
  return <div> This is website 2 </div>;
}

export default About;
```

Map `local.website-1.com` and `local.website-2.com` in your hosts file, then boot the server by typing:

```bash
node index.js
```

going to http://dev.pizza.local.website-1.com/about and http://local.website-2.com/about, you will see the components above rendered by the same Next.js instance!

</details>

<details>
  <summary><b>Fastify example</b></summary>

Let's say that we want to support two different websites with just one Next.js instance, and serve them using just one Express.js server.
Write the following configuration inside a `.krabs.js` or `.krabs.config.js` file inside of the root of your project:

```js
module.exports = {
  tenants: [
    {
      name: 'website-1',
      domains: [
        {
          development: /dev\.[a-z]*\.local\.website-1\.com/, // Regex supported!
          staging: 'stage.website-1.com',
          production: 'website-1.com',
        },
      ],
    },
    {
      name: 'website-2',
      domains: [
        {
          development: 'local.website-2.com',
          staging: 'stage.website-2.com',
          production: /[\w|\d|-|_]+\.website-2.com/, // Regex supported!
        },
      ],
    },
  ],
};
```

Create an `index.js` file and fill it with the following content:

```js
const fastify = require('fastify')({ trustProxy: true });
const next = require('next');
const krabs = require('../dist/fastify-krabs').default;

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });

async function main() {
  try {
    await app.prepare();
    const handle = app.getRequestHandler();

    fastify
      .get('*', (request, reply) => krabs(request, reply, app, handle))
      .listen(3000, () => console.log('server ready'));
  } catch (err) {
    console.log(err.stack);
  }
}

main();
```

Inside our `.krabs.js` file, we configured two tenants with two different `name` properties: `website-1` and `website-2`.
So now let's create two new folders inside of the Next.js' default `pages/` directory:

```txt
pages/
  - _app.js
  - website-1
  - website-2
```

Feel free to add any page you want inside both of these folders, as they will be treated as they were the default Next.js' `pages/` folder.
Let's add the following content to `pages/website-1/about.js`:

```jsx
function About() {
  return <div> About website 1 </div>;
}

export default About;
```

and the following code to `pages/website-2/about.js`:

```jsx
function About() {
  return <div> This is website 2 </div>;
}

export default About;
```

Map `local.website-1.com` and `local.website-2.com` in your hosts file, then boot the server by typing:

```bash
node index.js
```

going to http://dev.pizza.local.website-1.com/about and http://local.website-2.com/about, you will see the components above rendered by the same Next.js instance!

</details>

# Documentation

You can find the full documentation (with real code examples) [here](https://micheleriva.github.io/krabs/)!

# License

Krabs is _free as in freedom_ and licensed under the [**MIT** license](/LICENSE.md).

<br />

<img src="/misc/krabs-bottom.png" />
