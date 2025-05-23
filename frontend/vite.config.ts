import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // теперь '@' это src/
      "@stores": path.resolve(__dirname, "./src/stores"),
      "@api": path.resolve(__dirname, "./src/api"),
      "@typings": path.resolve(__dirname, "./src/types"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@pages": path.resolve(__dirname, "src/pages"),
    },
  },
});
