import { defineConfig } from 'vite'
import path from "path";
import react from '@vitejs/plugin-react'
import tsconfigPaths from "vite-tsconfig-paths";


import dotenv from "dotenv";

dotenv.config();



// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@public": path.resolve(__dirname, "../public"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@config": path.resolve(__dirname, "./src/config"),
      "@types": path.resolve(__dirname, "./src/types"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@features": path.resolve(__dirname, "./src/features"),
      "@services": path.resolve(__dirname, "./src/services"),
      "@constant": path.resolve(__dirname, "./src/constant"),
      // '@'/: path.resolve(__dirname, './src')
    },
  },
})
