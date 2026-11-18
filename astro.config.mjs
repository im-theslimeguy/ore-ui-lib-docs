import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

const base = process.env.DOCS_BASE ?? "/";

export default defineConfig({
	site: "https://im-theslimeguy.github.io",
	base,
	trailingSlash: "always",
	integrations: [react(), mdx()],
	vite: {
		plugins: [tailwindcss()],
	},
	markdown: {
		shikiConfig: {
			theme: "github-dark",
		},
	},
});
