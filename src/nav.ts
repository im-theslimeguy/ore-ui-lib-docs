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
			{ id: "first-screen", label: "Your First Screen" },
		],
	},
	{
		label: "Design Guidelines",
		items: [
			{ id: "design-system", label: "Design System" },
			{ id: "variants", label: "Variants & Accents" },
		],
	},
	{
		label: "Components",
		items: [
			{ id: "buttons", label: "Buttons" },
			{ id: "cards", label: "Cards & Containers" },
			{ id: "inputs", label: "Form Inputs & Selection" },
			{ id: "sliders", label: "Sliders & Scrollbars" },
			{ id: "popups", label: "Popups & Modals" },
			{ id: "feedback", label: "Toasts, Tooltips & Banners" },
			{ id: "navigation", label: "Navigation & Responsive Panes" },
			{ id: "typography", label: "Typography & Fonts" },
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
