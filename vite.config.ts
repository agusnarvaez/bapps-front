import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  envPrefix: ["VITE_", "NEXT_PUBLIC_"],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "next-intl": path.resolve(__dirname, "./src/shims/next-intl.tsx"),
      "next/navigation": path.resolve(
        __dirname,
        "./src/shims/next-navigation.ts"
      ),
      "next/link": path.resolve(__dirname, "./src/shims/next-link.tsx"),
      "next/image": path.resolve(__dirname, "./src/shims/next-image.tsx"),
      "next/dynamic": path.resolve(__dirname, "./src/shims/next-dynamic.tsx"),
    },
  },
  build: {
    outDir: "dist",
  },
});
