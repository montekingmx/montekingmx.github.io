/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#070708",
        foreground: "#F4F4F6",
        gold: {
          light: "#FFF1C5",
          DEFAULT: "#D4AF37",
          glow: "#F3E5AB",
          dark: "#996515",
          deep: "#5C3E08",
        },
        obsidian: {
          light: "#1A1A1E",
          DEFAULT: "#0E0E11",
          dark: "#070708",
          card: "#121216",
        },
        ruby: {
          DEFAULT: "#E63946",
          dark: "#9B111E",
        },
        glass: {
          border: "rgba(212, 175, 55, 0.18)",
          bg: "rgba(18, 18, 22, 0.70)",
          highlight: "rgba(255, 241, 197, 0.08)",
        }
      },
      fontFamily: {
        cinzel: ['Cinzel', 'serif'],
        sans: ['Space Grotesk', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'gold-glow': '0 0 25px rgba(212, 175, 55, 0.25)',
        'gold-intense': '0 0 40px rgba(212, 175, 55, 0.45)',
        'casino-card': '0 10px 30px -10px rgba(0, 0, 0, 0.8), 0 0 15px rgba(212, 175, 55, 0.15)',
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #FFF1C5 0%, #D4AF37 50%, #996515 100%)',
        'gold-gradient-radial': 'radial-gradient(circle at center, rgba(212, 175, 55, 0.15) 0%, transparent 70%)',
        'dark-gradient': 'linear-gradient(180deg, #070708 0%, #0E0E11 50%, #070708 100%)',
        'casino-pattern': 'radial-gradient(#D4AF37 0.75px, transparent 0.75px)',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', filter: 'drop-shadow(0 0 8px rgba(212, 175, 55, 0.4))' },
          '50%': { opacity: '1', filter: 'drop-shadow(0 0 20px rgba(212, 175, 55, 0.8))' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      },
      animation: {
        shimmer: 'shimmer 3s infinite linear',
        'pulse-glow': 'pulseGlow 2.5s infinite ease-in-out',
        float: 'float 4s ease-in-out infinite',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
