# useFlayyer (flayyer-hook)

![npm-version](https://badgen.net/npm/v/@flayyer/flayyer-hook)
![downloads](https://badgen.net/npm/dt/@flayyer/flayyer-hook)
![size](https://badgen.net/bundlephobia/minzip/@flayyer/flayyer-hook)
![tree-shake](https://badgen.net/bundlephobia/tree-shaking/@flayyer/flayyer-hook)

To create a Flayyer template and account please refer to: [flayyer.com](https://flayyer.com?ref=flayyer-hook)

## Installation

Super lightweight React Hook to memoize a [Flayyer](https://github.com/flayyer/flayyer-js) instance to prevent unnecessary renderings.

```sh
yarn add @flayyer/flayyer-hook @flayyer/flayyer

# or with npm:
npm install --save @flayyer/flayyer-hook @flayyer/flayyer
```

Types for [TypeScript](https://www.typescriptlang.org) are included, but if you have any issues try installing `qs` types:

```sh
yarn add --dev @types/qs

# or with npm:
npm install --save-dev @types/qs
```

## Usage

The main difference between `Flayyer.io` and `Flayyer.ai` is:

* **Flayyer.io requires you to explicitly declare template and variables for the images to render**.
* **Flayyer.ai uses the [rules defined on your dashboard](https://flayyer.com/dashboard/_/projects) to decide how to handle every image**, then fetches and analyse the website for variables and information to render the image.

In simple words:

* Flayyer.io like saying _"render an image with using this template and these explicit variables."_
* Flayyer.ai like saying _"render images based on the content of this route."_

### Flayyer.ai

This is the easiest way to use Flayyer. The following snippet enables our platform to analyse the content of every page to extract relevant information and use it to generate image previews.

```js
import React from "react";
import { useFlayyerAI } from "@flayyer/flayyer-hook";

function Head() {
  const flayyer = new useFlayyerAI({
    project: "my-project",
    path: `/products/1`,
  });
  const url = flayyer.href();
  // > https://flayyer.ai/v2/my-project/_/__v=1596906866/products/1

  return (
    <head>
      <meta property="og:image" content={url} />
      <meta name="twitter:image" content={url} />
      {/* Declare the original image so you can use it on your templates */}
      <meta property="flayyer:image" content="https://yoursite.com/image/products/1.png" />
    </head>
  );
}
```

Remember to dynamically get the current path for each page. If you are using [Next.js](https://nextjs.org/) you should probably do it like this:

```js
import { useRouter } from 'next/router'
import { useFlayyerAI } from "@flayyer/flayyer-hook";

function SEO() {
  const router = useRouter();
  const flayyer = useFlayyerAI({
    project: "my-project",
    path: router.asPath,
  });

  // ...
}
```

### Flayyer.io

After installing this module you can format URLs.

```js
import React from "react";
import { useFlayyerIO } from "@flayyer/flayyer-hook";

function Head() {
  const flayyer = useFlayyerIO({
    tenant: "tenant",
    deck: "deck",
    template: "template",
    variables: {
      title: "Hello world!",
      image: "https://yoursite.com/image/products/1.png",
    },
  });
  const url = flayyer.href();
  // > https://flayyer.io/v2/tenant/deck/template.jpeg?__v=1596906866&title=Hello+world%21&image=...

  return (
    <head>
      <meta property="og:image" content={url} />
      <meta name="twitter:image" content={url} />
    </head>
  );
}
```

## Development

Prepare the local environment:

```sh
yarn install
```

To run tests:

```sh
yarn test
```

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/flayyer/flayyer-hook.

## License

The module is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).
