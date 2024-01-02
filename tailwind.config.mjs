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

      screens: {
        videoActivo: { raw: "(min-width: 100vw) and (min-height: 100vh)" },
      },
      screens: {
        vertical: "880px",
        // => @media (min-width: 850px) { ... }
      },
    },
  },
  plugins: [],
};
