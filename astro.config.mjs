import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from "@astrojs/tailwind";
import node from "@astrojs/node";

const ENV=process.env

export default defineConfig({
  build:{
    assets: ENV.NODE_ENV === 'production' ? ENV.URL_PRODUCCION : ENV.URL_DESARROLLO,
  },
  integrations: [react(), tailwind()],
  output: 'server',
  adapter: node({
    mode: 'standalone',
  }),
});