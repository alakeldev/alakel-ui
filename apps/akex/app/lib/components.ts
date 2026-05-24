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
];
