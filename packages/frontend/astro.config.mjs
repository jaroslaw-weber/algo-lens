// @ts-check
import { defineConfig, envField } from 'astro/config';
import react from '@astrojs/react';

import tailwindcss from "@tailwindcss/vite";

const secrets = [
  'BACKEND_URL'
]

/** @type {Record<string, any>} */
const envSchema = {}
for (const s of secrets) {
  envSchema[s] = envField.string({ context: "client", access: "public", optional: true })
}

// https://astro.build/config
export default defineConfig({
  env: {
    schema: {
      ...envSchema

    }
  },

  server: {

  },

  //
  integrations: [react()],

  vite: {
    plugins: [tailwindcss()],
    define: {
      'process.env': {},
    },
  },
});