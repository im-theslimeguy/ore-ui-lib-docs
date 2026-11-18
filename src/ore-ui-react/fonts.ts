export const ORE_FONT_URLS = {
	seven: "https://www.minecraft.net/etc.clientlibs/minecraftnet/clientlibs/clientlib-site/resources/fonts/Minecraft-Seven_v2.woff2",
	ten: "https://www.minecraft.net/etc.clientlibs/minecraftnet/clientlibs/clientlib-site/resources/fonts/Minecraft-Tenv2.woff2",
} as const;

let fontsPromise: Promise<void> | null = null;

/**
 * Fetches and registers official Minecraft Seven and Minecraft Ten fonts
 * via the browser FontFace API. Safe to call multiple times.
 */
export function loadOreFonts(): Promise<void> {
	if (typeof window === "undefined" || typeof FontFace === "undefined") {
		return Promise.resolve();
	}
	if (fontsPromise) return fontsPromise;

	fontsPromise = (async () => {
		const entries: Array<[string, string]> = [
			["Minecraft Seven", ORE_FONT_URLS.seven],
			["Minecraft Ten", ORE_FONT_URLS.ten],
		];

		await Promise.all(
			entries.map(async ([family, url]) => {
				const response = await fetch(url);
				if (!response.ok) {
					throw new Error(`Failed to fetch ${family}: ${response.status}`);
				}
				const bytes = await response.arrayBuffer();
				const source = URL.createObjectURL(new Blob([bytes], { type: "font/woff2" }));
				const face = new FontFace(family, `url(${source})`, {
					weight: "400",
					style: "normal",
					display: "block",
				});
				await face.load();
				document.fonts.add(face);
			})
		);
	})();

	return fontsPromise;
}
