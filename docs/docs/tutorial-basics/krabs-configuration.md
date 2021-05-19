---
sidebar_position: 2
title: Krabs Configuration
---

As written in the previous section, we can create a file called `.krabs.js` (or `.krabs.config.js`) inside of the root folder of our project, and krabs will automatically import the configuration from this file.

```javascript
module.exports = {
  tenants: [
    {
      name: 'website-1',
      domains: [
        {
          development: /dev\.[a-z]*\.local\.website-1\.com/, // Regex supported!
          stage: 'stage.website-1.com',
          production: 'website-1.com',
        },
      ],
    },
    {
      name: 'website-2',
      domains: [
        {
          development: 'local.website-2.com',
          stage: 'stage.website-2.com',
          production: /[\w|\d|-|_]+\.website-2.com/, // Regex supported!
        },
      ],
    },
  ],
};
```

The configuration file can export one of the following:

- `Plain object`
- `Function`
- `Async function`

so the following configurations are fully supported:

**Object configuration**
```javascript
module.exports = {
  // ...configuration
}
```

**Function configuration**
```javascript
module.exports = () => ({
  // ...configuration
})
```

**Async function configuration**
```javascript
module.exports = async () => ({
  // ...configuration
})
```

With the configuration above, we're adding support for two different tenants:

- `website-1`
- `website-2`

we also write down three different domains for each tenant.
As you can see, in a local environment, **website-1** will support all the routes matching  the `/dev.[a-z]*.local.website-1.com/` regular expression.
That means that we can set up our `hosts` file as follows:

```txt
127.0.0.1 dev.mywebsite.local.website-1.com
127.0.0.1 dev.ilovepizza.local.website-1.com
127.0.0.1 dev.foo.local.website-1.com
```

and still, be served with the same Next.js website.