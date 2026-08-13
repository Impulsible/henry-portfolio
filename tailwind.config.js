/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: '#0B0D10',
        surface: '#11151A',
        card: '#151A20',
        border: '#242A32',
        'text-primary': '#F5F7FA',
        'text-secondary': '#9AA4B2',
        accent: '#FF6B35',
        'accent-secondary': '#FFB86B',
      },
      fontFamily: {
        heading: ['Space Grotesk', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}