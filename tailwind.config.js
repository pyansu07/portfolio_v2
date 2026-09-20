/** @type {import('tailwindcss').Config} */
const withOpacity = (v) => ({ opacityValue }) =>
  opacityValue === undefined
    ? `rgb(var(${v}))`
    : `rgb(var(${v}) / ${opacityValue})`;

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        // Driven by the CSS variables in index.css, so both themes work
        // without a `dark:` variant on every element.
        ink: withOpacity('--bg'),
        surface: withOpacity('--surface'),
        line: withOpacity('--border'),
        body: withOpacity('--text'),
        muted: withOpacity('--muted'),
        accent: withOpacity('--accent'),
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        pulseRing: {
          '0%': { transform: 'scale(0.9)', opacity: '0.7' },
          '70%, 100%': { transform: 'scale(2.2)', opacity: '0' },
        },
      },
      animation: {
        blink: 'blink 1.1s step-end infinite',
        pulseRing: 'pulseRing 2.4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};
