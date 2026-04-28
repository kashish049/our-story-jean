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
        romantic: {
          pink: '#FFB7C5',
          yellow: '#FFE082',
          peach: '#FFDAB9',
          accent: '#E91E63',
        }
      },
      backgroundImage: {
        'sunset-gradient': 'linear-gradient(to right, #FFB7C5, #FFE082, #FFDAB9)',
        'dreamy-glow': 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, rgba(0,0,0,0) 70%)',
      },
      boxShadow: {
        'soft-glow': '0 0 15px 2px rgba(233, 30, 99, 0.3)',
        'yellow-glow': '0 0 15px 2px rgba(255, 224, 130, 0.4)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'subtle-pulse': 'subtle-pulse 3s infinite',
        'shake': 'shake 0.5s cubic-bezier(.36,.07,.19,.97) both',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'subtle-pulse': {
          '0%, 100%': { opacity: '0.9', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.02)' },
        },
        shake: {
          '10%, 90%': { transform: 'translate3d(-1px, 0, 0)' },
          '20%, 80%': { transform: 'translate3d(2px, 0, 0)' },
          '30%, 50%, 70%': { transform: 'translate3d(-4px, 0, 0)' },
          '40%, 60%': { transform: 'translate3d(4px, 0, 0)' },
        }
      }
    },
  },
  plugins: [],
};
export default config;