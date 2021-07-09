# useFlyyer (flyyer-hook)

![npm-version](https://badgen.net/npm/v/@flyyer/flyyer-hook)
![downloads](https://badgen.net/npm/dt/@flyyer/flyyer-hook)
![size](https://badgen.net/bundlephobia/minzip/@flyyer/flyyer-hook)
![tree-shake](https://badgen.net/bundlephobia/tree-shaking/@flyyer/flyyer-hook)

To create a Flyyer template and account please refer to: [Flyyer.io](https://flyyer.io?ref=flyyer-hook)

## Installation

Super lightweight React Hook to memoize a [Flyyer](https://github.com/useflyyer/flyyer-js) instance to prevent unnecessary renderings.

```sh
yarn add @flyyer/flyyer-hook @flyyer/flyyer

# or with npm:
npm install --save @flyyer/flyyer-hook @flyyer/flyyer
```

Types for [TypeScript](https://www.typescriptlang.org) are included, but if you have any issues try installing `qs` types:

```sh
yarn add --dev @types/qs

# or with npm:
npm install --save-dev @types/qs
```

## Usage

The difference between Flyyer and FlyyerRender:

* Flyyer uses the [rules defined on your dashboard](https://flyyer.io/dashboard/_/projects) to decide how to handle every image. It analyses your website to render a content-rich image. Let's say _"Flyyer renders images based on the content of this route"_.

* FlyyerRender instead requires you to explicitly declare template and variables for the images to render, **giving you more control for customization**. Let's say _"FlyyerRender renders an image using this template and these explicit variables"_.

### Flyyer

The following snippet enables our platform to analyse the content of every page to extract relevant information and use it to generate image previews.

```js
import React from "react";
import { useFlyyer } from "@flyyer/flyyer-hook";

function Head() {
  const flyyer = new useFlyyer({
    project: "my-project",
    path: `/products/1`,
  });
  const url = flyyer.href();
  // > https://cdn.flyyer.io/v2/my-project/_/__v=1596906866/products/1

  return (
    <head>
      <meta property="og:image" content={url} />
      <meta name="twitter:image" content={url} />
      {/* Declare the original image so you can use it on your templates */}
      <meta property="flyyer:image" content="https://yoursite.com/image/products/1.png" />
    </head>
  );
}
```

Remember to dynamically get the current path for each page. If you are using [Next.js](https://nextjs.org/) you should probably do it like this:

```js
import { useRouter } from 'next/router'
import { useFlyyer } from "@flyyer/flyyer-hook";

function SEO() {
  const router = useRouter();
  const flyyer = useFlyyer({
    project: "my-project",
    path: router.asPath,
  });

  // ...
}
```

### FlyyerRender

After installing this module you can format URLs.

```js
import React from "react";
import { useFlyyerRender } from "@flyyer/flyyer-hook";

function Head() {
  const flyyer = useFlyyerRender({
    tenant: "tenant",
    deck: "deck",
    template: "template",
    variables: {
      title: "Hello world!",
      image: "https://yoursite.com/image/products/1.png",
    },
  });
  const url = flyyer.href();
  // > https://cdn.flyyer.io/render/v2/tenant/deck/template.jpeg?__v=1596906866&title=Hello+world%21&image=...

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

Bug reports and pull requests are welcome on GitHub at https://github.com/useflyyer/flyyer-hook.

## License

The module is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).
