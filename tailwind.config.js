/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'elvara-black':     '#080808',
        'elvara-charcoal':  '#141414',
        'elvara-dark':      '#1c1c1c',
        'elvara-ivory':     '#f0ebe0',
        'elvara-ivory-dim': '#c8c3b8',
        'elvara-gold':      '#c9a84c',
        'elvara-gold-light':'#dfc06e',
        'elvara-gold-dim':  '#8a7235',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Cormorant', 'Playfair Display', 'Georgia', 'serif'],
        sans:  ['Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest2: '0.3em',
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #c9a84c 0%, #dfc06e 50%, #c9a84c 100%)',
      },
    },
  },
  plugins: [],
}
