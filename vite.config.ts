/// <reference types="vitest" />

import legacy from "@vitejs/plugin-legacy";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { fileURLToPath } from "node:url";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		legacy(),
		tailwindcss(),
		tsconfigPaths({
			root: fileURLToPath(new URL(".", import.meta.url)),
		}),
	],
	test: {
		globals: true,
		environment: "jsdom",
		setupFiles: "./src/setupTests.ts",
	},
});
