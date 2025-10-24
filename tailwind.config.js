import { Colors } from "./src/constants/Colors";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: Colors.primary,
        primarySoft: Colors.primarySoft,
        textPrimary: Colors.textPrimary,
        textSecondary: Colors.textSecondary,
        borderInputs: Colors.borderInputs,
        textPlaceholder: Colors.textPlaceholder,
        badgeGray: Colors.badgeGray,
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [],
};
