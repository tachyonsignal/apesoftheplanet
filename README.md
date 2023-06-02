# create-svelte

## Credentials

This app calls Polygon.io for stock data. Add `src/routes/config.ts` and add your Polygon.io API key.

```javscript
export const POLYGON_API_KEY = <YOUR API KEY HERE>
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
