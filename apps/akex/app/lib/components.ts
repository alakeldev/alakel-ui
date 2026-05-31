export interface Component {
	name: string;
	href: string;
	description: string;
	package: string;
}

export const components: Component[] = [
	{
		name: "Button",
		href: "/button",
		description:
			"Interactive button component with multiple variants, sizes, and playground",
		package: "@akex/button",
	},
	{
		name: "Label",
		href: "/label",
		description:
			"Accessible label element with 8 variants, 4 sizes, and 8 motion animations",
		package: "@akex/label",
	},
	{
		name: "Carousel",
		href: "/carousel",
		description:
			"Animated carousel with 5 transition presets, auto-play, and keyboard navigation",
		package: "@akex/carousel",
	},
	{
		name: "Card",
		href: "/card",
		description:
			"Composable card with 5 variants and 4 motion animations like lift, tilt, and glow",
		package: "@akex/card",
	},
	{
		name: "Input",
		href: "/input",
		description:
			"Animated form input with a floating label, focus glow, and shake-on-error",
		package: "@akex/input",
	},
	{
		name: "Accordion",
		href: "/accordion",
		description:
			"Expandable panels with smooth height animation, single and multiple modes",
		package: "@akex/accordion",
	},
];
