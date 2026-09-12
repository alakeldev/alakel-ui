import type { MouseEvent, ReactNode } from "react";

export interface NavbarBrand {
	/** The logo, wordmark, or other content shown at the start of the navbar. */
	content: ReactNode;
	/** Makes the brand a link. Omit it to render non-interactive brand content. */
	href?: string;
	/** Accessible name used when the visual brand does not contain readable text. */
	ariaLabel?: string;
}

export interface NavbarLinkItem {
	type: "link";
	label: string;
	href: string;
	/** Short supporting text displayed when this link is inside a dropdown. */
	description?: string;
	/** Opens the destination in a new browser tab. */
	external?: boolean;
}

export interface NavbarDropdownItem {
	type: "dropdown";
	label: string;
	items: readonly NavbarLinkItem[];
}

export type NavbarItem = NavbarLinkItem | NavbarDropdownItem;

export type NavbarMotion = "none" | "subtle" | "smooth" | "spring";

export type NavbarCollapseAt = "sm" | "md" | "lg";

export type NavbarDisplayMode = "responsive" | "desktop" | "mobile";

export interface NavbarProps {
	brand: NavbarBrand;
	/** Any number of top-level links or dropdown groups. */
	items: readonly NavbarItem[];
	/** The current pathname or URL. It gives a matching link aria-current="page". */
	activeHref?: string;
	/** Controls where the desktop navigation sits in the remaining navbar space. */
	alignment?: "left" | "center" | "right";
	/** Optional content rendered after the navigation, such as a sign-in button. */
	action?: ReactNode;
	/** Adds sticky positioning behavior to the navbar. */
	sticky?: boolean;
	/** Changes the visual treatment without changing the public structure. */
	variant?: "default" | "floating";
	/** Selects a Motion animation preset or disables animation completely. */
	motion?: NavbarMotion;
	/** Shows or hides the animated marker under the active desktop link. */
	showActiveIndicator?: boolean;
	/** Enables the responsive mobile drawer. Disable it to keep desktop links visible. */
	mobileMenu?: boolean;
	/** Viewport width below which navigation changes into the mobile drawer. */
	collapseAt?: NavbarCollapseAt;
	/** Uses responsive behavior or forces a desktop/mobile presentation. */
	displayMode?: NavbarDisplayMode;
	/** Delay in milliseconds before a hovered desktop dropdown opens. */
	dropdownDelay?: number;
	/** Runs when a navigation link is selected. Use it to update state or call a router. */
	onNavigate?: (
		item: NavbarLinkItem,
		event: MouseEvent<HTMLAnchorElement>,
	) => void;
	ariaLabel?: string;
	mobileMenuLabel?: string;
	className?: string;
}
