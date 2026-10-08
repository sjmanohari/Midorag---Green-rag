/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        midora: {
          bg: '#FCFAF6',
          bgWarm: '#F8F5EE',
          card: '#FFFFFF',
          border: '#E8E5DD',
          borderSubtle: '#F0ECE1',
          dark: '#121614',
          charcoal: '#222823',
          muted: '#636D65',
          green: '#228B53',
          greenLight: '#E8F5EE',
          greenDark: '#135933',
          emerald: '#10B981',
          sakura: '#F4A7B9',
          sakuraSoft: '#FDEFF2',
          sakuraPale: '#FFF7F9',
          sakuraDeep: '#E87A90',
          sakuraBorder: '#F9D5DF',
          warning: '#D97706',
          danger: '#DC2626',
        }
      },
      fontFamily: {
        sans: ['"Inter"', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'ui-monospace', 'monospace'],
        display: ['"Space Grotesk"', '"Inter"', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 10px -2px rgba(18, 22, 20, 0.05), 0 1px 3px -1px rgba(18, 22, 20, 0.03)',
        'card': '0 4px 20px -4px rgba(18, 22, 20, 0.06), 0 2px 6px -2px rgba(18, 22, 20, 0.04)',
        'modal': '0 20px 40px -12px rgba(18, 22, 20, 0.12), 0 8px 16px -6px rgba(18, 22, 20, 0.08)',
        'sakura': '0 4px 20px -2px rgba(244, 167, 185, 0.25)',
        'botanical': '0 4px 20px -2px rgba(34, 139, 83, 0.18)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-6px) rotate(2deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        }
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        pulseGlow: 'pulseGlow 3s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
