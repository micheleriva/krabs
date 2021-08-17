---
sidebar_position: 3
title: Creating Pages
---

Remember the tenant names we wrote in the previous section?

1. **website-1**
2. **website-2**

inside of our default `pages/` directory, we will need to create two new folders:

```
+ pages/
|   +-- _app.js
|   +-- website-1/
|   +-- website-2/
```

Now let's say that **website-1** will need to support the following routes: 

- `/`
- `/about`
- `/blog`
- `/blog/[date]/[slug]`

we will just need to add those pages inside of the **website-1** folder as we've always done with any default Next.js project:

```
+ pages/
|   +-- _app.js
|   +-- website-1/
|   |     + index.js
|   |     + blog/
|   |     |   + index.js
|   |     |   + [date]/
|   |     |   |   + [slug].js
|   +-- website-2/
```

when you'll browse `http://dev.mywebsite.local.website-1.com:3000/blog/2021-01-01/my-blog-post`, krabs will map this URL with the `/website-1/blog/[date]/[slug].js` file, so you can think of your `pages/<tenant-name>/` folder as the root of your single website.