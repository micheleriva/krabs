---
sidebar_position: 1
title: Intro
---

Krabs is an Express.js middleware that allows you to serve hundreds of different websites using only one Express.js and Next.js instance.

> Multitenancy is a reference to the mode of operation of software where multiple independent instances of one or multiple applications operate in a shared environment. The instances (tenants) are logically isolated, but physically integrated. ([source](https://www.gartner.com/en/information-technology/glossary/multitenancy#:~:text=Multitenancy%20is%20a%20reference%20to,logically%20isolated%2C%20but%20physically%20integrated.))

Thanks to Krabs, we can host multiple websites inside of our Next.js instance and serve them separately depending on the domain that the user is browsing:

![Multitenant Example](/img/multitenant-example.png)

## Use Cases

There are different reasons why you may want to achieve multi-tenancy with Next.js.
First of all, it's probably the best React framework out there, and working with it is a pleasure.

### Small Agency
If you're working in a small agency, there are times where you want to save your money without degrading your customer websites' performances. Using a multi-tenant approach allows you to develop multiple websites reusing components, tests, CI/CD pipelines, and so on. It is also way cheaper to host a multi-tenant application on a single server than hosting 100 different websites on 100 other EC2/VPS instances. You have to scale just one server, and if you start to receive more traffic than expected, you have to configure only one CDN.

### Big Corporate
Big corporates may also be interested in adopting a multi-tenant approach for their websites. Think of companies like IBM, Microsoft, or Adobe; they all have their design and component libraries. Every time they fix a bug or introduce any enhancement, they may want to deploy this new update directly on all of their websites. Well, using a multi-tenant approach, you only have to run one deployment task for updating hundreds of websites in just one move.

## Caveats

There are some caveats you have to keep in mind when you're working with Krabs and Next.js.

**You have to set up a custom server.** <br />
Krabs is an express.js middleware, so it requires a custom Express.js server to run. This will make Vercel deployments not available. Alternatives are DigitalOcean Apps, Heroku, or your custom server.

**Common entry points** <br />
Both `_document` and `_app` pages will be common for all of your websites.