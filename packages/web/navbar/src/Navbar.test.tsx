import {
	cleanup,
	render,
	screen,
	waitFor,
	within,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Navbar } from "./Navbar";
import type { NavbarItem } from "./types";

const items: readonly NavbarItem[] = [
	{ type: "link", label: "Home", href: "/" },
	{
		type: "dropdown",
		label: "Products",
		items: [
			{
				type: "link",
				label: "Analytics",
				href: "/analytics",
				description: "Understand product usage.",
			},
		],
	},
	{
		type: "link",
		label: "GitHub",
		href: "https://github.com/alakeldev/alakel-ui",
		external: true,
	},
];

function renderNavbar() {
	return render(
		<Navbar
			activeHref="/"
			brand={{ content: "Alakel", href: "/", ariaLabel: "Alakel home" }}
			items={items}
		/>,
	);
}

afterEach(cleanup);

describe("Navbar", () => {
	it("renders its brand and data-driven navigation", () => {
		renderNavbar();

		expect(
			screen.getByRole("link", { name: "Alakel home" }).getAttribute("href"),
		).toBe("/");
		expect(
			screen.getByRole("link", { name: "Home" }).getAttribute("aria-current"),
		).toBe("page");
		expect(screen.getByRole("button", { name: "Products" })).not.toBeNull();
	});

	it("adds safe attributes to external links", () => {
		renderNavbar();
		const externalLink = screen.getByRole("link", { name: "GitHub" });

		expect(externalLink.getAttribute("target")).toBe("_blank");
		expect(externalLink.getAttribute("rel")).toBe("noopener noreferrer");
	});

	it("opens a desktop dropdown", async () => {
		const user = userEvent.setup();
		renderNavbar();

		await user.click(screen.getByRole("button", { name: "Products" }));

		expect(screen.getByRole("link", { name: /Analytics/ })).not.toBeNull();
	});

	it("notifies the consumer when a link is selected", async () => {
		const user = userEvent.setup();
		const onNavigate = vi.fn();
		render(
			<Navbar
				brand={{ content: "Alakel" }}
				items={items}
				onNavigate={onNavigate}
			/>,
		);

		await user.click(screen.getByRole("link", { name: "Home" }));

		expect(onNavigate).toHaveBeenCalledOnce();
		expect(onNavigate.mock.calls[0]?.[0]).toEqual(items[0]);
	});

	it("opens and closes its mobile navigation dialog", async () => {
		const user = userEvent.setup();
		renderNavbar();

		await user.click(
			screen.getByRole("button", { name: "Open navigation menu" }),
		);
		const dialog = screen.getByRole("dialog", { name: "Navigation" });

		expect(within(dialog).getByText("Analytics")).not.toBeNull();
		await user.keyboard("{Escape}");
		await waitFor(() => {
			expect(screen.queryByRole("dialog", { name: "Navigation" })).toBeNull();
		});
	});

	it("allows optional behavior to be disabled with props", () => {
		const { container } = render(
			<Navbar
				activeHref="/"
				brand={{ content: "Alakel" }}
				items={items.filter((item) => item.type === "link")}
				mobileMenu={false}
				motion="none"
				showActiveIndicator={false}
			/>,
		);

		expect(
			screen.queryByRole("button", { name: "Open navigation menu" }),
		).toBeNull();
		expect(container.querySelector(".ak-navbar__active-indicator")).toBeNull();
		expect(
			container.querySelector(".ak-navbar")?.getAttribute("data-motion"),
		).toBe("none");
	});

	it("applies each desktop alignment", () => {
		const { container, rerender } = render(
			<Navbar alignment="left" brand={{ content: "Alakel" }} items={items} />,
		);
		const navigation = container.querySelector<HTMLElement>(
			".ak-navbar__desktop-nav",
		);

		expect(getComputedStyle(navigation as HTMLElement).justifySelf).toBe(
			"left",
		);
		rerender(
			<Navbar alignment="center" brand={{ content: "Alakel" }} items={items} />,
		);
		expect(getComputedStyle(navigation as HTMLElement).justifySelf).toBe(
			"center",
		);
		rerender(
			<Navbar alignment="right" brand={{ content: "Alakel" }} items={items} />,
		);
		expect(getComputedStyle(navigation as HTMLElement).justifySelf).toBe(
			"right",
		);
	});

	it("can force the responsive navigation into mobile mode", () => {
		const { container } = render(
			<Navbar
				brand={{ content: "Alakel" }}
				displayMode="mobile"
				items={items}
			/>,
		);

		expect(
			getComputedStyle(
				container.querySelector(".ak-navbar__desktop-nav") as HTMLElement,
			).display,
		).toBe("none");
		expect(
			getComputedStyle(
				container.querySelector(".ak-navbar__menu-button") as HTMLElement,
			).display,
		).toBe("inline-flex");
	});
});
