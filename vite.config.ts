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
      exclude: [
        "src/test-support/**",
        "src/infrastructure/**",
        "src/types/**",
        "src/app.d.ts",
        "src/sst-env.d.ts",
      ],
      100: true,
      include: ["src/**/*.ts"],
    },
  },
});
