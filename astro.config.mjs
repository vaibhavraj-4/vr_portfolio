import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://vaibhavraj.dev', // change to your actual domain when you buy one
  build: {
    inlineStylesheets: 'auto',
  },
  compressHTML: true,
});
