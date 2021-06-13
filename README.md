This is the companion github repo for the [How to build your first SaaS](https://www.freecodecamp.org/news/how-to-build-your-first-saas/) article.

## Description

A minimal foundation upon which you can putter your first full-stack application. :rowboat:

## Features

:revolving_hearts: Server and client are already setup

:blossom: Lighter footprint than CRA on your machine

:christmas_tree: Preact(alternatively, I suggest [Sinuous](https://sinuous.dev/) which doesn't use virtual dom)

:vhs: Supports IE11

:golf: Serves ES modules(less code shipped) to modern browsers

:saxophone: Use the web platform as much as possible(e.g. Not using SCSS. Leverage standard CSS with PostCSS)

## Development

Clone this repo,

```
git clone https://github.com/kilgarenone/boileroom.git
```

Then enter the directory of the repo:

```
cd boileroom
```

Then 'npm install'. This will install npm packages of client and server too.

```
npm install
```

When the npm install is done, we can now start our full-stack development environment. At the root,

```
npm run dev
```

- **Client** will be at <u>**localhost:8008**</u>
- **Server** is at <u>**localhost:4000**</u>

:sunrise_over_mountains:

## FAQ

"**Why not just use `create-react-app` etc. though?**"

Although they are great for one-off prototype and to "move fast and break things", they have hidden cost in terms of complexity and obfuscation, both of which limit user's sense of control, personal responsiblity, and understanding as long as they stay within the happy paths.

But we are building a garden that we intend to _putter_ while comporting ourselves with the greatest autonomy and rectitude possible, rather than with a false sense of security.
