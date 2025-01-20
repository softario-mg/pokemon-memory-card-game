import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      rotate: {
        'y-180': 'rotateY(180deg)',
      },
      transformStyle: {
        '3d': 'preserve-3d',
      },
      backfaceVisibility: {
        'hidden': 'hidden',
      },
      perspective: {
        '1000': '1000px',
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.backface-hidden': {
          'backface-visibility': 'hidden',
          '-webkit-backface-visibility': 'hidden',
          '-moz-backface-visibility': 'hidden',
        },
        '.perspective-1000': {
          'perspective': '1000px',
          '-webkit-perspective': '1000px',
          '-moz-perspective': '1000px',
        },
        '.transform-style-3d': {
          'transform-style': 'preserve-3d',
          '-webkit-transform-style': 'preserve-3d',
          '-moz-transform-style': 'preserve-3d',
        },
        '.rotate-y-180': {
          'transform': 'rotateY(180deg)',
          '-webkit-transform': 'rotateY(180deg)',
          '-moz-transform': 'rotateY(180deg)',
        },
      });
    }),
  ],
};

export default config;
