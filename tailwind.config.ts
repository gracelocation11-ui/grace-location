import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#C9A84C',
          light: '#E0C068',
          dark: '#A8852A',
          muted: '#C9A84C33',
        },
        noir: {
          DEFAULT: '#080808',
          soft: '#111111',
          light: '#1A1A1A',
          border: '#2A2A2A',
        },
        cream: {
          DEFAULT: '#F7F4EE',
          dark: '#EDE8DE',
          muted: '#BDB8AD',
        },
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'Outfit', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(3rem, 8vw, 7rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(2.5rem, 5vw, 5rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-md': ['clamp(1.875rem, 3vw, 3rem)', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      backgroundImage: {
        'gradient-gold': 'linear-gradient(135deg, #C9A84C 0%, #E0C068 50%, #A8852A 100%)',
        'gradient-noir': 'linear-gradient(180deg, #080808 0%, #111111 100%)',
        'gradient-radial-gold': 'radial-gradient(ellipse at center, #C9A84C22 0%, transparent 70%)',
        'shimmer': 'linear-gradient(90deg, transparent 0%, #C9A84C44 50%, transparent 100%)',
      },
      animation: {
        marquee: 'marquee 35s linear infinite',
        'marquee-reverse': 'marqueeReverse 35s linear infinite',
        fadeUp: 'fadeUp 0.7s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        shimmer: 'shimmer 3s ease-in-out infinite',
        'pulse-gold': 'pulseGold 2s ease-in-out infinite',
        'scale-in': 'scaleIn 0.4s ease-out forwards',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        marqueeReverse: {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(32px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 0 0 #C9A84C33' },
          '50%': { boxShadow: '0 0 0 12px transparent' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      transitionTimingFunction: {
        'ease-luxury': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
      },
      boxShadow: {
        'gold-sm': '0 2px 12px #C9A84C22',
        'gold-md': '0 4px 24px #C9A84C33',
        'gold-lg': '0 8px 48px #C9A84C44',
        'noir-lg': '0 24px 64px rgba(0,0,0,0.8)',
        'card': '0 1px 3px rgba(0,0,0,0.5), 0 8px 24px rgba(0,0,0,0.3)',
      },
    },
  },
  plugins: [],
}

export default config
