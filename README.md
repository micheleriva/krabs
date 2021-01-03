<img src="/misc/krabs-cover.png" />

[![Build Status](https://www.travis-ci.com/micheleriva/krabs.svg?branch=main)](https://www.travis-ci.com/micheleriva/krabs)
[![codecov](https://codecov.io/gh/micheleriva/krabs/branch/main/graph/badge.svg?token=s46QYu6uUJ)](https://codecov.io/gh/micheleriva/krabs)

**Krabs** is an enterprise-ready Express.js middleware for serving hundreds of different websites from a single Next.js instance.

# Installation

Krabs is available on **npm** and can be installed as follows:

```bash
yarn add krabs

# or

npm install --save krabs
```

# Roadmap

| Feature | Status |
| ------- | ------ |
| Multiple domains support | ✅ Released         |
| Regex-based domains      | ✅ Released         |
| Dynamic paths            | ✅ Released         |
| Force ISR reload         | 🚧 Work in progress |
| Tenant props injection   | 🚧 Work in progress |

Overall status: 🎉 production ready

# Things to know

- Krabs forces you to use a custom server. Therefore, deployments to Vercel are not supported.
- `_app` and `_document` pages are common to every website.

# Getting Started

Let's say that we want to support three different websites with just one Next.js instance, and serve them using just one Express.js server.
Write the following configuration inside a `.krabs.js` file inside of the root of your project:

```js
module.exports = {
  tenants: [
    {
      name: 'website-1',
      domains: [
        {
          dev: /dev\.[a-z]*\.local\.website-1\.com/, // Regex supported!
          stage: 'stage.website-1.com',
          prod: 'website-1.com',
        },
      ],
    },
    {
      name: 'website-2',
      domains: [
        {
          dev: 'local.website-2.com',
          stage: 'stage.website-2.com',
          prod: /[\w|\d|-|_]+\.website-2.com/, // Regex supported!
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

Inside of our `.krabs.js` file we configured two tenants with two different `name` properties: `website-1` and `website-2`.
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
  return <div> About website 1 </div>
}

export default About;
```

and the following code to `pages/website-2/about.js`:

```jsx
function About() {
  return <div> This is website 2 </div>
}

export default About;
```

Map `local.website-1.com` and `local.website-2.com` in your hosts file, then boot the server by typing:

```bash
node index.js
```

going to http://local.website-1.com/about and http://local.website-2.com/about, you will see the components above rendered by the same Next.js instance!

# Documentation

Please refer to the [wiki](https://github.com/micheleriva/krabs/wiki) section for documentation about **Krabs**!

# License

Krabs is _free as freedom_ and licensed under the [**GPL V3** license](/LICENSE.md).
