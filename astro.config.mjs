// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import icon from 'astro-icon';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	site: 'https://wire.network',
	// Trailing-slash URLs are canonical (Base.astro, sitemap, internal links), but any form is accepted
	// so unknown paths reach the custom 404 instead of Astro's trailing-slash error page in dev.
	integrations: [
		react(),
		icon(),
		// /system is an internal design-system page (noindex); 404 is not a destination
		sitemap({ filter: (page) => !/\/(system|404)\/?$/.test(page) }),
	],
	vite: {
		plugins: [tailwindcss()],
		// Pre-bundle the PDF reader up front; discovering it lazily leaves stale dep hashes (504) in dev
		optimizeDeps: { include: ['pdfjs-dist'] },
	},
});
