import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { LabelAnimation } from "../src/Label";
import { Label, labelVariants } from "../src/Label";

// Inner animations render INSIDE the label (no motion-span wrapper).
const INNER_ANIMATIONS: LabelAnimation[] = ["shimmer"];
// Wrapper animations render a motion.span AROUND the label.
const WRAPPER_ANIMATIONS: LabelAnimation[] = [
	"glow",
	"float",
	"bounce",
	"flicker",
	"pulse",
	"pop",
	"wave",
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function renderLabel(props: React.ComponentProps<typeof Label> = {}) {
	return render(<Label {...props}>{props.children ?? "Label"}</Label>);
}

// ---------------------------------------------------------------------------
// Rendering
// ---------------------------------------------------------------------------

describe("Label – rendering", () => {
	it("renders visible text content", () => {
		renderLabel();
		expect(screen.getByText("Label")).toBeInTheDocument();
	});

	it("renders children correctly", () => {
		render(<Label>Field name</Label>);
		expect(screen.getByText("Field name")).toBeInTheDocument();
	});

	it("attaches data-slot='label' to the label element", () => {
		const { container } = renderLabel();
		expect(container.querySelector("[data-slot='label']")).toBeInTheDocument();
	});

	it("merges custom className without losing base classes", () => {
		const { container } = renderLabel({ className: "my-custom-class" });
		const label = container.querySelector("label");
		expect(label).toHaveClass("my-custom-class");
		expect(label).toHaveClass("font-medium");
	});

	it("forwards htmlFor attribute to the label element", () => {
		const { container } = render(<Label htmlFor="email-input">Email</Label>);
		expect(container.querySelector("label")).toHaveAttribute(
			"for",
			"email-input",
		);
	});

	it("forwards additional HTML attributes", () => {
		const { container } = renderLabel({ id: "test-label" });
		expect(container.querySelector("label")).toHaveAttribute(
			"id",
			"test-label",
		);
	});
});

// ---------------------------------------------------------------------------
// Variants
// ---------------------------------------------------------------------------

describe("Label – variants", () => {
	const cases: {
		variant: React.ComponentProps<typeof Label>["variant"];
		expectedClass: string;
	}[] = [
		{ variant: "default", expectedClass: "text-foreground" },
		{ variant: "primary", expectedClass: "text-primary" },
		{ variant: "secondary", expectedClass: "bg-secondary" },
		{ variant: "success", expectedClass: "text-emerald-400" },
		{ variant: "warning", expectedClass: "text-amber-400" },
		{ variant: "destructive", expectedClass: "text-destructive" },
		{ variant: "outline", expectedClass: "border" },
		{ variant: "ghost", expectedClass: "text-muted-foreground" },
	];

	for (const { variant, expectedClass } of cases) {
		it(`applies correct class for variant="${variant}"`, () => {
			const { container } = renderLabel({ variant });
			expect(container.querySelector("label")).toHaveClass(expectedClass);
		});
	}

	it("defaults to 'default' variant when none provided", () => {
		const { container } = renderLabel();
		expect(container.querySelector("label")).toHaveClass("text-foreground");
	});
});

// ---------------------------------------------------------------------------
// Sizes
// ---------------------------------------------------------------------------

describe("Label – sizes", () => {
	const cases: {
		size: React.ComponentProps<typeof Label>["size"];
		expectedClass: string;
	}[] = [
		{ size: "xs", expectedClass: "text-xs" },
		{ size: "sm", expectedClass: "text-[0.8rem]" },
		{ size: "default", expectedClass: "text-sm" },
		{ size: "lg", expectedClass: "text-base" },
	];

	for (const { size, expectedClass } of cases) {
		it(`applies correct class for size="${size}"`, () => {
			const { container } = renderLabel({ size });
			expect(container.querySelector("label")).toHaveClass(expectedClass);
		});
	}

	it("defaults to 'default' size when none provided", () => {
		const { container } = renderLabel();
		expect(container.querySelector("label")).toHaveClass("text-sm");
	});
});

// ---------------------------------------------------------------------------
// Animations
// ---------------------------------------------------------------------------

describe("Label – animations", () => {
	it("renders plain label when no animation is provided", () => {
		const { container } = renderLabel();
		expect(screen.queryByTestId("motion-span")).not.toBeInTheDocument();
		expect(screen.queryByTestId("shimmer-overlay")).not.toBeInTheDocument();
		expect(container.querySelector("label")).toBeInTheDocument();
	});

	// --- Inner animations (shimmer) ---
	// These render INSIDE the label, not as a wrapper span.
	describe('animation="shimmer"', () => {
		it("does NOT create a motion-span wrapper — animation runs inside the label", () => {
			renderLabel({ animation: "shimmer" });
			expect(screen.queryByTestId("motion-span")).not.toBeInTheDocument();
			expect(screen.getByText("Label")).toBeInTheDocument();
		});

		it("sets data-animation='shimmer' on the label element", () => {
			const { container } = renderLabel({ animation: "shimmer" });
			expect(container.querySelector("label")).toHaveAttribute(
				"data-animation",
				"shimmer",
			);
		});

		it("renders the shimmer overlay span inside the label", () => {
			renderLabel({ animation: "shimmer" });
			expect(screen.getByTestId("shimmer-overlay")).toBeInTheDocument();
		});

		it("shimmer overlay is aria-hidden", () => {
			renderLabel({ animation: "shimmer" });
			expect(screen.getByTestId("shimmer-overlay")).toHaveAttribute(
				"aria-hidden",
				"true",
			);
		});

		it("adds overflow-hidden to clip the shimmer to the label boundary", () => {
			const { container } = renderLabel({ animation: "shimmer" });
			expect(container.querySelector("label")).toHaveClass("overflow-hidden");
		});
	});

	// --- Wrapper animations ---
	// These wrap the label in a motion.span that drives the animation.
	for (const animation of WRAPPER_ANIMATIONS) {
		describe(`animation="${animation}"`, () => {
			it("wraps the label in a motion-span", () => {
				renderLabel({ animation });
				const wrapper = screen.getByTestId("motion-span");
				expect(wrapper).toBeInTheDocument();
			});

			it(`sets data-animation="${animation}" on the wrapper span`, () => {
				renderLabel({ animation });
				expect(screen.getByTestId("motion-span")).toHaveAttribute(
					"data-animation",
					animation,
				);
			});

			it("places the label element inside the motion wrapper", () => {
				const { container } = renderLabel({ animation });
				const wrapper = screen.getByTestId("motion-span");
				expect(wrapper).toContainElement(
					container.querySelector("label") as HTMLElement,
				);
			});

			it("does NOT render a shimmer overlay", () => {
				renderLabel({ animation });
				expect(screen.queryByTestId("shimmer-overlay")).not.toBeInTheDocument();
			});
		});
	}

	// --- All animations together: inner guard ---
	for (const animation of INNER_ANIMATIONS) {
		it(`animation="${animation}" does NOT render a motion-span wrapper`, () => {
			renderLabel({ animation });
			expect(screen.queryByTestId("motion-span")).not.toBeInTheDocument();
		});
	}
});

// ---------------------------------------------------------------------------
// Interactions (bounce animation)
// ---------------------------------------------------------------------------

describe("Label – interactions", () => {
	it("renders with bounce animation and responds to hover intent", async () => {
		const user = userEvent.setup();
		renderLabel({ animation: "bounce" });
		const wrapper = screen.getByTestId("motion-span");
		// motion props are stripped in mock; just verify element is interactive
		expect(wrapper).toBeInTheDocument();
		await user.hover(wrapper);
		expect(wrapper).toBeInTheDocument();
	});
});

// ---------------------------------------------------------------------------
// labelVariants helper
// ---------------------------------------------------------------------------

describe("labelVariants helper", () => {
	it("returns a string", () => {
		expect(typeof labelVariants({ variant: "primary", size: "lg" })).toBe(
			"string",
		);
	});

	it("includes correct variant class", () => {
		expect(labelVariants({ variant: "success" })).toContain("text-emerald-400");
	});

	it("includes correct size class", () => {
		expect(labelVariants({ size: "lg" })).toContain("text-base");
	});

	it("uses default values when no props passed", () => {
		const cls = labelVariants({});
		expect(cls).toContain("text-foreground");
		expect(cls).toContain("text-sm");
	});
});
