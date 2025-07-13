/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{ts,tsx}","./src/**/*.{ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#ffffff',
          dark: '#000000',
        }
      },
      fontFamily: {
        "mono": ["SpaceMono", "sans-serif"],
      },
    },
  },
  plugins: [],
}