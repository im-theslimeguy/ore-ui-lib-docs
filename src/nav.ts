export interface DocLink {
	id: string;
	label: string;
}

export interface DocGroup {
	label: string;
	items: DocLink[];
}

export const groups: DocGroup[] = [
	{
		label: "Start",
		items: [
			{ id: "index", label: "Overview" },
			{ id: "install", label: "Installation" },
			{ id: "first-screen", label: "Quick Start" },
		],
	},
	{
		label: "Design Guidelines",
		items: [
			{ id: "design-system", label: "Design System" },
			{ id: "variants", label: "Colors & States" },
			{ id: "typography", label: "Typography & Fonts" },
		],
	},
	{
		label: "Components",
		items: [
			{ id: "buttons", label: "Buttons" },
			{ id: "seamless-buttons", label: "Seamless Buttons" },
			{ id: "menu-buttons", label: "Menu Buttons" },
			{ id: "selectable-buttons", label: "Selectable Buttons" },
			{ id: "selectable-icon-buttons", label: "Selectable Icon Buttons" },
			{ id: "checkboxes", label: "Checkboxes" },
			{ id: "switches", label: "Switches" },
			{ id: "radios", label: "Radio Buttons" },
			{ id: "sliders", label: "Sliders" },
			{ id: "textboxes", label: "Textboxes" },
			{ id: "searchboxes", label: "Searchboxes" },
			{ id: "cards", label: "Cards & Containers" },
			{ id: "progress-bars", label: "Progress Bars" },
			{ id: "banners", label: "Banners" },
			{ id: "tags", label: "Tags" },
			{ id: "labeled-dividers", label: "Labeled Dividers" },
			{ id: "navbar", label: "Navbar" },
			{ id: "horizontal-navbar", label: "Horizontal Navbar" },
			{ id: "tab-bars", label: "Tab Bars" },
			{ id: "tab-bar-buttons", label: "Tab Bar Buttons" },
			{ id: "popups", label: "Popups" },
			{ id: "dropdowns", label: "Dropdowns" },
			{ id: "spinners", label: "Spinners" },
			{ id: "loading-bars", label: "Loading Bars" },
			{ id: "messages", label: "Messages" },
			{ id: "toasts", label: "Toasts" },
			{ id: "tooltips", label: "Tooltips" },
			{ id: "pagination", label: "Pagination" },
		],
	},
];

export const pages: DocLink[] = groups.flatMap((group) => group.items);

export function pageHref(id: string): string {
	const base = import.meta.env.BASE_URL;
	const root = base.endsWith("/") ? base : `${base}/`;
	return id === "index" ? root : `${root}${id}/`;
}

export function groupFor(id: string): DocGroup | undefined {
	return groups.find((group) => group.items.some((item) => item.id === id));
}
