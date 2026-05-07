
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          dark: "#060B18",
          surface: "#0B1224",
          border: "#1A2744",
          text: "#C8D8F0",
          muted: "#6B7A99",
          green: "#00FF87",
          blue: "#00C2FF",
          amber: "#FFB800",
          red: "#FF3B5C",
          primary: "#00FF87",
        },
      },
    },
  },
  plugins: [],
}