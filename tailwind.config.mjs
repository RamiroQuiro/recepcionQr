/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        paleta1: {
          primary: "#F1AAF5",
          secondary: "#FCA5A9",
          tertiary: "#FFFFFF",
          gray: "#808080",
          white: "#FFFFFF",
        },
      },
    },
  },
  plugins: [],
};
