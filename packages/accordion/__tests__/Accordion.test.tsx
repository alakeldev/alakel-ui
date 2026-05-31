import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "../src/Accordion";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function renderAccordion(
	props: Partial<React.ComponentProps<typeof Accordion>> = {},
) {
	return render(
		<Accordion {...props}>
			<AccordionItem value="a">
				<AccordionTrigger>First</AccordionTrigger>
				<AccordionContent>First content</AccordionContent>
			</AccordionItem>
			<AccordionItem value="b">
				<AccordionTrigger>Second</AccordionTrigger>
				<AccordionContent>Second content</AccordionContent>
			</AccordionItem>
		</Accordion>,
	);
}

// ---------------------------------------------------------------------------
// Rendering
// ---------------------------------------------------------------------------

describe("Accordion – rendering", () => {
	it("renders all triggers", () => {
		renderAccordion();
		expect(screen.getByText("First")).toBeInTheDocument();
		expect(screen.getByText("Second")).toBeInTheDocument();
	});

	it("has data-slot='accordion'", () => {
		const { container } = renderAccordion();
		expect(
			container.querySelector("[data-slot='accordion']"),
		).toBeInTheDocument();
	});

	it("renders triggers as buttons with aria-expanded", () => {
		renderAccordion();
		const trigger = screen.getByRole("button", { name: "First" });
		expect(trigger).toHaveAttribute("aria-expanded", "false");
	});

	it("keeps content collapsed by default", () => {
		renderAccordion();
		expect(screen.queryByText("First content")).not.toBeInTheDocument();
	});

	it("opens an item given as defaultValue", () => {
		renderAccordion({ defaultValue: "a" });
		expect(screen.getByText("First content")).toBeInTheDocument();
	});

	it("applies a custom className to the root", () => {
		const { container } = renderAccordion({ className: "my-accordion" });
		expect(container.querySelector("[data-slot='accordion']")).toHaveClass(
			"my-accordion",
		);
	});
});

// ---------------------------------------------------------------------------
// Interaction – single mode
// ---------------------------------------------------------------------------

describe("Accordion – single mode", () => {
	it("opens an item on click", async () => {
		const user = userEvent.setup();
		renderAccordion();
		await user.click(screen.getByRole("button", { name: "First" }));
		expect(screen.getByText("First content")).toBeInTheDocument();
	});

	it("closes an open item when clicked again", async () => {
		const user = userEvent.setup();
		renderAccordion();
		const trigger = screen.getByRole("button", { name: "First" });
		await user.click(trigger);
		expect(screen.getByText("First content")).toBeInTheDocument();
		await user.click(trigger);
		expect(screen.queryByText("First content")).not.toBeInTheDocument();
	});

	it("closes the previous item when another opens", async () => {
		const user = userEvent.setup();
		renderAccordion();
		await user.click(screen.getByRole("button", { name: "First" }));
		await user.click(screen.getByRole("button", { name: "Second" }));
		expect(screen.queryByText("First content")).not.toBeInTheDocument();
		expect(screen.getByText("Second content")).toBeInTheDocument();
	});

	it("sets aria-expanded to true when open", async () => {
		const user = userEvent.setup();
		renderAccordion();
		const trigger = screen.getByRole("button", { name: "First" });
		await user.click(trigger);
		expect(trigger).toHaveAttribute("aria-expanded", "true");
	});
});

// ---------------------------------------------------------------------------
// Interaction – multiple mode
// ---------------------------------------------------------------------------

describe("Accordion – multiple mode", () => {
	it("keeps multiple items open at once", async () => {
		const user = userEvent.setup();
		renderAccordion({ type: "multiple" });
		await user.click(screen.getByRole("button", { name: "First" }));
		await user.click(screen.getByRole("button", { name: "Second" }));
		expect(screen.getByText("First content")).toBeInTheDocument();
		expect(screen.getByText("Second content")).toBeInTheDocument();
	});
});

// ---------------------------------------------------------------------------
// Controlled mode
// ---------------------------------------------------------------------------

describe("Accordion – controlled", () => {
	it("reflects the controlled value", () => {
		renderAccordion({ value: "b" });
		expect(screen.getByText("Second content")).toBeInTheDocument();
		expect(screen.queryByText("First content")).not.toBeInTheDocument();
	});

	it("calls onValueChange with the next values", async () => {
		const user = userEvent.setup();
		const onValueChange = jest.fn();
		renderAccordion({ value: "a", onValueChange });
		await user.click(screen.getByRole("button", { name: "Second" }));
		expect(onValueChange).toHaveBeenCalledWith(["b"]);
	});
});

// ---------------------------------------------------------------------------
// Accessibility wiring
// ---------------------------------------------------------------------------

describe("Accordion – accessibility", () => {
	it("links trigger and content via aria attributes", async () => {
		const user = userEvent.setup();
		renderAccordion();
		const trigger = screen.getByRole("button", { name: "First" });
		await user.click(trigger);
		const region = screen.getByRole("region");
		expect(trigger).toHaveAttribute("aria-controls", region.id);
		expect(region).toHaveAttribute("aria-labelledby", trigger.id);
	});
});

// ---------------------------------------------------------------------------
// Guard rails
// ---------------------------------------------------------------------------

describe("Accordion – guard rails", () => {
	it("throws when AccordionItem is used outside Accordion", () => {
		const spy = jest.spyOn(console, "error").mockImplementation(() => {});
		expect(() =>
			render(
				<AccordionItem value="x">
					<AccordionTrigger>x</AccordionTrigger>
				</AccordionItem>,
			),
		).toThrow();
		spy.mockRestore();
	});
});
