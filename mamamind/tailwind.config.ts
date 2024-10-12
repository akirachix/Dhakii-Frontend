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
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        nunito: ['Nunito', 'sans-serif'],
      },
      screens: {
        'nest-hub': { 'min': '1024px', 'max': '600px' },
        'nest-hub-max': { 'min': '1280px', 'max': '800px' },
      },
    },
  },
  plugins: [],
};
export default config;
