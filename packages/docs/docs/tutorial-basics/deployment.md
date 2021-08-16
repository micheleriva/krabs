---
sidebar_position: 4
title: Deployment
---

# Deployment

:::caution You cannot deploy a Krabs application to Vercel.
Given that you'll need a custom server, you won't be able to deploy your application to Vercel, the platform Next.js has been built for. So please keep that in consideration when choosing the tech stack for your project.
:::

Deploying an Express.js + Next.js + Krabs application is as easy as deploying a basic Express.js web server. <br />
Depending on where you want to host your app, there might be some differences in the deployment pipeline, but the concept will always remain the same.

## Building the application

To build your Express.js + Krabs application, you just need to run the `yarn next build` command,  which creates an optimized production build for the Next.js pages.
Now you're able to start your Express.js server with a `NODE_ENV=production` environment variable, and you're ready to go.

## Deployment

Deploying Express.js + Krabs is not different from deploying Express.js alone. Please refer to the following guides for releasing your webserver to production:

- [Deploying to a Ubuntu server](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-20-04)
- [Deploying to Heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs)
- [Dockerizing Node.js](https://medium.com/openmindonline/js-monday-13-dockerizing-node-js-e09d5f8bf945)
