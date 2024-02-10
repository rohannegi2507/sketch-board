import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    colors: {
      text1: '#3d3d3d',
      text2: '#e3e2fe',
      background1: 'rgba(255,255,255,0.9)',
      border1:'#b8bb8b8',
      border2:'#d6d6d6',
      shadow1:'0px 0px .9310142993927002px 0px rgba(0, 0, 0, .17), 0px 0px 3.1270833015441895px 0px rgba(0, 0, 0, .08), 0px 7px 14px 0px rgba(0, 0, 0, .05',
      shadow2:'',

    }
  },
  plugins: [],
};
export default config;
