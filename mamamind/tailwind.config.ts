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
        // Defining the breakpoints to target exactly Nest Hub and Nest Hub Max
        'nest-hub': {'raw': '(min-width: 600px) and (max-width: 1024px)'}, 
        'nest-hub-max': {'raw': '(min-width: 800px) and (max-width: 1280px)'},
      },
    },
  },
  plugins: [],
}

