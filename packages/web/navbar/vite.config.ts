import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
	build: {
		lib: {
			cssFileName: "styles",
			entry: resolve(import.meta.dirname, "src/index.ts"),
			formats: ["es"],
			fileName: () => "index.js",
		},
		rollupOptions: {
			external: [
				"react",
				"react/jsx-runtime",
				"react-dom",
				"@radix-ui/react-dialog",
				"@radix-ui/react-navigation-menu",
				"motion/react",
			],
			output: {
				banner: '"use client";',
			},
		},
		sourcemap: true,
	},
});
