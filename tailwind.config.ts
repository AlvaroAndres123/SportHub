import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)", 
        foreground: "var(--foreground)", 
        primary: "#facc15",  //(Amarillo)
        secondary: "#333333",  //  (Gris Oscuro)
        accent: "#ff0000",  // No me acuerdo XD
      },
    },
  },
  plugins: [],
};
export default config;
