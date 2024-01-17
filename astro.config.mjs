import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from "@astrojs/tailwind";
import node from "@astrojs/node";
import basicSsl from '@vitejs/plugin-basic-ssl'
const ENV=process.env

export default defineConfig({
  build:{
    assets: ENV.NODE_ENV === 'production' ? ENV.URL_PRODUCCION : ENV.URL_DESARROLLO,
    serverEntry:'index.mjs',
  },
  server:{
    port:4321,
    host:true,
  },
  integrations: [react(), tailwind()],
  output: 'server',
  adapter: node({
    mode: 'standalone',
  }),
  vite:{
plugins:[basicSsl()],
server:{
  https:true,
}

  },
});