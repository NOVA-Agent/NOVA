/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Main brand colors
        primary: {
          50: "#eae8ff",
          100: "#c0b8ff",
          200: "#9f88ff",
          300: "#7c59ff",
          400: "#6029ff",
          500: "#5011ff", // Primary brand color
          600: "#4700e6",
          700: "#3c00cc",
          800: "#3000b3",
          900: "#240099",
        },
        // Secondary color palette
        secondary: {
          50: "#e0fdff",
          100: "#b8f9ff",
          200: "#8af6ff",
          300: "#5cf2ff",
          400: "#2eefff",
          500: "#00e6fa", // Secondary brand color
          600: "#00ccdf",
          700: "#00b2c4",
          800: "#0099a8",
          900: "#007f8c",
        },
        // Dark mode backgrounds
        dark: {
          100: "#121726",
          200: "#0f1320",
          300: "#0c101a",
          400: "#080c14",
          500: "#04060a", // Main dark bg
        },
        // Success, warning, error colors
        success: "#10b981",
        warning: "#f59e0b",
        error: "#ef4444",
        // Accent colors for data visualization
        accent1: "#ff6b6b",
        accent2: "#4ecdc4",
        accent3: "#ffe66d",
        accent4: "#6a0572",
      },
      fontFamily: {
        sans: ["var(--font-inter)"],
        mono: ["var(--font-roboto-mono)"],
      },
      borderRadius: {
        lg: "0.5rem",
        md: "calc(0.5rem - 2px)",
        sm: "calc(0.5rem - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        shimmer: {
          "100%": {
            transform: "translateX(100%)",
          },
        },
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        fadeOut: {
          from: { opacity: 1 },
          to: { opacity: 0 },
        },
        slideUp: {
          from: { transform: "translateY(20px)", opacity: 0 },
          to: { transform: "translateY(0)", opacity: 1 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        fadeIn: "fadeIn 0.3s ease-in-out",
        fadeOut: "fadeOut 0.3s ease-in-out",
        slideUp: "slideUp 0.4s ease-out",
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'hero-pattern': "url('/images/hero-pattern.svg')",
      },
      boxShadow: {
        'glow': '0 0 15px 2px rgba(96, 41, 255, 0.15)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} 