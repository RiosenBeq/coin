/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary-color)',
        secondary: 'var(--secondary-color)',
        accent: 'var(--accent-color)',
        darkBg: 'var(--dark-bg)',
        textColor: 'var(--text-color)',
        lightText: 'var(--light-text-color)',
        bgColor: 'var(--bg-color)',
        cryptoGreen: 'var(--crypto-green)',
        gradientEnd: 'var(--gradient-end)',
      },
    },
  },
  plugins: [],
} 