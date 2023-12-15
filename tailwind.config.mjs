/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        paleta1: {
          primary: "#F4CFEB",
          secondary: "#BFDAff",
          tertiary: "#FFFFFF",
          gray: "#808080",
          white: "#FFFFFF",
        },
      },
      extend: {
        screens: {
          'videoActivo': {'raw': '(min-width: 100vw) and (min-height: 100vh)'},
        },
      },
   
    },
  },
  plugins: [],
};
