const defaultTheme = require("tailwindcss/defaultTheme");

/**
 * @type {import('tailwindcss').Config}
 * */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-bg": "#E0E2F4",
        "prim-bg-100": "#E0E2F4",
        "prim-bg-200": "#B7BCE6",
        "prim-bg-300": "#928FD8",
        "prim-bg-400": "#6C76CB",
        "prim-bg-500": "#4752BE",
        "prim-bg-600": "#37419A",
        "prim-bg-700": "#293175",
        "prim-bg-800": "#1C214F",
        "prim-bg-900": "#0F1129",

        "blue-100": "#E0E2F4",
        "blue-200": "#B7BCE6",
        "blue-300": "#928FD8",
        "blue-400": "#6C76CB",
        "blue-500": "#4752BE",
        "blue-600": "#37419A",
        "blue-700": "#293175",
        "blue-800": "#1C214F",
        "blue-900": "#0F1129",

        "zinc-100": "#E0E2F4",
        "zinc-200": "#B7BCE6",
        "zinc-300": "#928FD8",
        "zinc-400": "#6C76CB",
        "zinc-500": "#4752BE",
        "zinc-600": "#37419A",
        "zinc-700": "#293175",
        "zinc-800": "#1C214F",
        "zinc-900": "#0F1129",
        "zinc-950": "#010204",
      },
      keyframes: {
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "10%, 30%, 50%, 70%, 90%": { transform: "translateX(-5px)" },
          "20%, 40%, 60%, 80%": { transform: "translateX(5px)" },
        },
      },
      animation: {
        shake: "shake 0.5s ease-in-out",
        "caret-blink": "caret-blink 1.2s ease-out infinite",
      },
      fontFamily: {
        sans: ["Poppins", ...defaultTheme.fontFamily.sans],
      },
      backgroundImage: {
        chevronDown: "/src/assets/required/chevron-down.svg",
        chevronDownDark: "/src/assets/required/dark_chevron-down.svg",
      },
      transitionProperty: {
        margin: "margin",
      },
    },
  },
  safelist: [
    // {
    // 	pattern: /bg-(inherit|current|transparent|black|white)$/,
    // 	variants: ['hover', 'active'],
    // },
    {
      pattern:
        // /bg-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(50|100|200|300|400|500|600|700|800|900)$/,
        /bg-(zinc|red|amber|lime|emerald|sky|blue|violet)-(50|100|200|300|400|500|600|700|800|900|950)$/,
      variants: ["hover", "active", "checked", "indeterminate"],
    },
    {
      pattern:
        // /bg-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(50|100|200|300|400|500|600|700|800|900)$/,
        /bg-(zinc|red|amber|lime|emerald|sky|blue|violet)-(50|100|200|300|400|500|600|700|800|900|950)\/(10)$/,
    },
    // {
    // 	pattern: /border-(inherit|current|transparent|black|white)$/,
    // 	variants: ['hover', 'active'],
    // },
    {
      pattern:
        // /border-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(50|100|200|300|400|500|600|700|800|900)$/,
        /border-(zinc|red|amber|lime|emerald|sky|blue|violet)-(50|100|200|300|400|500|600|700|800|900|950)$/,
      variants: ["hover", "active", "dark:hover", "peer-checked"],
    },
    {
      pattern:
        // /border-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(50|100|200|300|400|500|600|700|800|900)\/(0|5|10|20|25|30|40|50|60|70|75|80|90|95|100)$/,
        /border-(zinc|red|amber|lime|emerald|sky|blue|violet)-(50|100|200|300|400|500|600|700|800|900|950)\/(50)$/,
      variants: ["hover", "active"],
    },
    {
      pattern:
        // /text-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(50|100|200|300|400|500|600|700|800|900)\/(0|5|10|20|25|30|40|50|60|70|75|80|90|95|100)$/,
        /text-(zinc|red|amber|lime|emerald|sky|blue|violet)-(50|100|200|300|400|500|600|700|800|900|950)$/,
      variants: ["hover", "active", "dark:hover"],
    },
  ],
  plugins: [require("@tailwindcss/typography")],
  darkMode: "class",
};
