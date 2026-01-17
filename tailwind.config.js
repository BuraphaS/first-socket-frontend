import primeVueUI from 'tailwindcss-primeui'

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'SF Pro Text'", "Arial", "sans-serif"],
        serif: ["'SF Pro Text'", "Arial", "sans-serif"],
        mono: ["'SF Pro Text'", "Arial", "sans-serif"],
        display: ["'SF Pro Display'", "Arial", "sans-serif"],
        body: ["'SF Pro Text'", "Arial", "sans-serif"],
        line: ["'LINE Seed'", "'SF Pro Display'", "'SF Pro Text'", "Arial", "sans-serif"]
      },
      container: {
        center: true,
        padding: '0.75rem'
      }
    }
  },
  plugins: [
    primeVueUI
  ]
}
