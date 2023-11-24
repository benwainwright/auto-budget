/// <reference types="vitest" />

import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [sveltekit()],
  test: {
    include: ["src/**/*.spec.ts"],
    globals: true,
    setupFiles: ["./src/test-support/test-setup.ts"],
    environment: "jsdom",
    coverage: {
      all: true,
      100: true,
      include: ["src/**/*.ts"],
    },
  },
});
