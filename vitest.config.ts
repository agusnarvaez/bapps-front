import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
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
  test: {
    environment: "jsdom",
    include: ["src/__tests__/**/*.test.{ts,tsx}"],
    setupFiles: ["src/__tests__/setup.ts"],
    // ponytail: the self-hosted runner (zenbook, Docker) is slow on jsdom +
    // framer-motion tests; the 5s default timed out three unrelated tests.
    testTimeout: 15000,
  },
});
