/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        cyber: {
          dark: "#0b0f19",
          surface: "#131b2e",
          border: "#1e293b",
          text: "#e2e8f0",
          muted: "#94a3b8",
          green: "#10b981",
          blue: "#3b82f6",
          amber: "#f59e0b",
          red: "#ef4444",
          primary: "#10b981",
        },
        slate: {
          950: "#0b0f19",
          900: "#131b2e",
          850: "#182238",
          800: "#1e293b",
          750: "#2d3d54",
          700: "#334155",
        }
      },
      boxShadow: {
        'glow-indigo': '0 0 25px -5px rgba(99, 102, 241, 0.3)',
        'glow-emerald': '0 0 25px -5px rgba(16, 185, 129, 0.3)',
      }
    },
  },
  plugins: [],
}