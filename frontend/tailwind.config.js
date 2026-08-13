/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Brand Blueprint Vol. III — Official Colour Palette
        royal: {
          DEFAULT: '#3B0764', // Royal Purple — dominant brand colour
          50: '#F4EBFB',
          100: '#E5CFF5',
          200: '#CBA0EB',
          300: '#A968D9',
          400: '#7E3EB8',
          500: '#5B1F91',
          600: '#3B0764',
          700: '#2E0550',
          800: '#21033C',
          900: '#150228',
        },
        sky: {
          DEFAULT: '#4FB6E8', // Sky Blue — trust, clarity
          50: '#EFF9FE',
          100: '#D9F0FC',
          200: '#B3E2F9',
          300: '#8CD3F5',
          400: '#66C4F1',
          500: '#4FB6E8',
          600: '#2C93C7',
          700: '#21719A',
          800: '#164E6D',
          900: '#0B2C40',
        },
        gold: {
          DEFAULT: '#C9A227', // Metallic Gold — excellence, used sparingly
          50: '#FBF6E7',
          100: '#F3E4B4',
          200: '#EAD289',
          300: '#DDBB5B',
          400: '#C9A227',
          500: '#A9861D',
          600: '#876A17',
          700: '#654F11',
          800: '#43350B',
          900: '#211A05',
        },
        ink: '#120A1F', // near-black used with white for text/backgrounds
      },
      fontFamily: {
        primary: ['Montserrat', 'sans-serif'],
        secondary: ['Poppins', 'sans-serif'],
        accent: ['"Cormorant Garamond"', 'serif'],
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #3B0764 0%, #21033C 55%, #0B2C40 100%)',
        'gold-sheen': 'linear-gradient(90deg, #876A17 0%, #EAD289 50%, #876A17 100%)',
      },
      boxShadow: {
        gold: '0 0 0 1px rgba(201,162,39,0.4), 0 8px 30px rgba(201,162,39,0.15)',
        premium: '0 20px 60px -15px rgba(59,7,100,0.45)',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: 0, transform: 'translateY(24px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        glowPulse: {
          '0%, 100%': { opacity: 0.55, transform: 'scale(1)' },
          '50%': { opacity: 1, transform: 'scale(1.05)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      animation: {
        fadeUp: 'fadeUp 0.7s ease-out both',
        shimmer: 'shimmer 3s linear infinite',
        glowPulse: 'glowPulse 3s ease-in-out infinite',
        float: 'float 5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
