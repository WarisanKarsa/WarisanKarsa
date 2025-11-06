import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef3f2',
          100: '#fee5e2',
          200: '#fdcfc9',
          300: '#fbaea4',
          400: '#f67f70',
          500: '#ed6049',
          600: '#da412a',
          700: '#b73420',
          800: '#972f1e',
          900: '#7d2e20',
          950: '#44140c',
        },
      },
    },
  },
  plugins: [],
}
export default config
