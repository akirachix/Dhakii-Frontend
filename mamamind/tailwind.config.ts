module.exports = {
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
        orange:"#F18721",
        blue:"#02A6A6",
      },
      fontFamily: {
        nunito: ['Nunito', 'sans-serif'],
      },
      screens: {
        'next-hub': '1024px',  
        'next-hub-max': '1280px',
      },
    },
  },
  plugins: [],
}

