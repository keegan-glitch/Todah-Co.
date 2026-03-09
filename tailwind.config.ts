import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: "#1C1C1A",
        cream: "#F2EBD9",
        sienna: "#C94F2C",
        olive: "#4A4A2F",
      },
      fontFamily: {
        headline: ['"Bebas Neue"', "sans-serif"],
        body: ['"Libre Baskerville"', "serif"],
      },
    },
  },
  plugins: [],
};
export default config;
