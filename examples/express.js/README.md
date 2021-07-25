# Advanced Krabs Example

In this example we're going to see how to host two very different websites under a common Next.js/Express.js instance.
We're going to support the following URLs:

**englishsetterlovers**

- http://local.englishsetterlovers.com (dev)
- https://englishsetterlovers.krabs.micheleriva.com (prod)

**veggies**

- http://local.cabbage.eat.com (dev)
- http://local.pumpkin.eat.com (dev)
- http://local.veggies.eat.com (dev)
- http://cabbage.krabs.eat.micheleriva.com (prod)
- http://pumpkin.krabs.eat.micheleriva.com (prod)
- http://veggies.krabs.eat.micheleriva.com (prod)

make sure to map those URLs inside your **hosts** file:

```txt
127.0.0.1 local.englishsetterlovers.com
127.0.0.1 englishsetterlovers.krabs.micheleriva.com
127.0.0.1 local.cabbage.eat.com
127.0.0.1 local.pumpkin.eat.com
127.0.0.1 local.veggies.eat.com
127.0.0.1 cabbage.krabs.eat.micheleriva.com
127.0.0.1 pumpkin.krabs.eat.micheleriva.com
127.0.0.1 veggies.krabs.eat.micheleriva.com
```

Boot the server by typing:

```sh
node index.js
```

and go to one of the URLs above (remember to add `:3000` as port!)
