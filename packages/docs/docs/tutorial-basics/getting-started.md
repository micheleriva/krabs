---
sidebar_position: 1
title: Getting Started
---

## Project Setup

We'll start by using create-next-app for creating a new Next.js app.

```bash
npx create-next-app my-app && cd my-app
```

now we will add two more dependencies: Express.js and Krabs:

```bash
yarn add express krabs
```

We will also need to create a custom server for handling our Next.js instance. If you haven't already, please read the [caveats](/docs/intro#caveats) section.

Let's create a new file called `server.js`. It will be the entry point of our custom Express.js server.

```javascript
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

As you can see, the krabs function accepts four parameters:

- `req`: Express.js request object
- `res`: Express.js response object
- `handle`: the Next.js route handler
- `app`:  the Next.js app object

It can actually accept one more argument, the krabs configuration, which is basically a JavaScript object. There's another way for configuring the multi-tenant settings for our krabs middleware: by creating a .krabs.js file inside of the root folder, and we'll proceed like that.