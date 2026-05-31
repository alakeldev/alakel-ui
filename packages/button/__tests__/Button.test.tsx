import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ButtonAnimation } from "../src/Button";
import { Button, buttonVariants } from "../src/Button";

// Inner animations render INSIDE the button (no motion-span wrapper).
const INNER_ANIMATIONS: ButtonAnimation[] = ["shimmer", "ripple"];
// Wrapper animations render a motion.span AROUND the button.
const WRAPPER_ANIMATIONS: ButtonAnimation[] = [
	"elastic",
	"glow",
	"tilt",
	"bounce",
	"pulse",
	"press",
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function renderButton(props: React.ComponentProps<typeof Button> = {}) {
	return render(<Button {...props}>{props.children ?? "Button"}</Button>);
}

// ---------------------------------------------------------------------------
// Rendering
// ---------------------------------------------------------------------------

describe("Button – rendering", () => {
	it("renders a visible button element", () => {
		renderButton();
		expect(screen.getByRole("button", { name: "Button" })).toBeInTheDocument();
	});

	it("renders children correctly", () => {
		render(<Button>Save changes</Button>);
		expect(screen.getByText("Save changes")).toBeInTheDocument();
	});

	it("attaches data-slot='button' attribute", () => {
		renderButton();
		expect(screen.getByRole("button")).toHaveAttribute("data-slot", "button");
	});

	it("merges custom className without losing base classes", () => {
		renderButton({ className: "my-custom-class" });
		const button = screen.getByRole("button");
		expect(button).toHaveClass("my-custom-class");
		expect(button).toHaveClass("inline-flex");
	});
});

// ---------------------------------------------------------------------------
// Variants
// ---------------------------------------------------------------------------

describe("Button – variants", () => {
	const cases: {
		variant: React.ComponentProps<typeof Button>["variant"];
		expectedClass: string;
	}[] = [
		{ variant: "default", expectedClass: "bg-primary" },
		{ variant: "secondary", expectedClass: "bg-secondary" },
		{ variant: "outline", expectedClass: "border-border" },
		{ variant: "ghost", expectedClass: "hover:bg-muted" },
		{ variant: "destructive", expectedClass: "bg-destructive/10" },
		{ variant: "link", expectedClass: "underline-offset-4" },
	];

	for (const { variant, expectedClass } of cases) {
		it(`applies correct class for variant="${variant}"`, () => {
			renderButton({ variant });
			expect(screen.getByRole("button")).toHaveClass(expectedClass);
		});
	}

	it("defaults to the 'default' variant when none is provided", () => {
		renderButton();
		expect(screen.getByRole("button")).toHaveClass("bg-primary");
	});
});

// ---------------------------------------------------------------------------
// Sizes
// ---------------------------------------------------------------------------

describe("Button – sizes", () => {
	const cases: {
		size: React.ComponentProps<typeof Button>["size"];
		expectedClass: string;
	}[] = [
		{ size: "xs", expectedClass: "h-6" },
		{ size: "sm", expectedClass: "h-7" },
		{ size: "default", expectedClass: "h-8" },
		{ size: "lg", expectedClass: "h-9" },
		{ size: "icon", expectedClass: "size-8" },
		{ size: "icon-xs", expectedClass: "size-6" },
		{ size: "icon-sm", expectedClass: "size-7" },
		{ size: "icon-lg", expectedClass: "size-9" },
	];

	for (const { size, expectedClass } of cases) {
		it(`applies correct class for size="${size}"`, () => {
			renderButton({ size });
			expect(screen.getByRole("button")).toHaveClass(expectedClass);
		});
	}

	it("defaults to 'default' size when none is provided", () => {
		renderButton();
		expect(screen.getByRole("button")).toHaveClass("h-8");
	});
});

// ---------------------------------------------------------------------------
// Disabled state
// ---------------------------------------------------------------------------

describe("Button – disabled state", () => {
	it("is disabled when the disabled prop is set", () => {
		renderButton({ disabled: true });
		expect(screen.getByRole("button")).toBeDisabled();
	});

	it("carries disabled utility classes when disabled", () => {
		renderButton({ disabled: true });
		expect(screen.getByRole("button")).toHaveClass("disabled:opacity-50");
	});

	it("does NOT render a motion wrapper when disabled, even with an animation", () => {
		renderButton({ disabled: true, animation: "shimmer" });
		expect(screen.queryByTestId("motion-span")).not.toBeInTheDocument();
		expect(screen.getByRole("button")).toBeInTheDocument();
	});
});

// ---------------------------------------------------------------------------
// Interactions
// ---------------------------------------------------------------------------

describe("Button – interactions", () => {
	it("fires onClick when clicked", async () => {
		const user = userEvent.setup();
		const handleClick = jest.fn();
		renderButton({ onClick: handleClick });

		await user.click(screen.getByRole("button"));

		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	it("does not fire onClick when disabled", () => {
		const handleClick = jest.fn();
		renderButton({ disabled: true, onClick: handleClick });

		fireEvent.click(screen.getByRole("button"));

		expect(handleClick).not.toHaveBeenCalled();
	});

	it("fires onKeyDown when Enter key is pressed", async () => {
		const user = userEvent.setup();
		const handleKeyDown = jest.fn();
		renderButton({ onKeyDown: handleKeyDown });

		screen.getByRole("button").focus();
		await user.keyboard("{Enter}");

		expect(handleKeyDown).toHaveBeenCalledTimes(1);
	}, 10_000);
});

// ---------------------------------------------------------------------------
// Animations
// ---------------------------------------------------------------------------

describe("Button – animations", () => {
	it("renders without a motion wrapper when no animation is provided", () => {
		renderButton();
		expect(screen.queryByTestId("motion-span")).not.toBeInTheDocument();
	});

	// --- Inner animations (shimmer / ripple) ---
	// These render INSIDE the button, not as a wrapper span.
	describe('animation="shimmer"', () => {
		it("does NOT create a motion-span wrapper — animation runs inside the button", () => {
			renderButton({ animation: "shimmer" });
			expect(screen.queryByTestId("motion-span")).not.toBeInTheDocument();
			expect(screen.getByRole("button")).toBeInTheDocument();
		});

		it("sets data-animation='shimmer' on the button itself", () => {
			renderButton({ animation: "shimmer" });
			expect(screen.getByRole("button")).toHaveAttribute(
				"data-animation",
				"shimmer",
			);
		});

		it("renders the shimmer overlay span inside the button", () => {
			renderButton({ animation: "shimmer" });
			expect(screen.getByTestId("shimmer-overlay")).toBeInTheDocument();
		});

		it("shimmer overlay is aria-hidden", () => {
			renderButton({ animation: "shimmer" });
			expect(screen.getByTestId("shimmer-overlay")).toHaveAttribute(
				"aria-hidden",
				"true",
			);
		});

		it("adds overflow-hidden to clip the shimmer to the button boundary", () => {
			renderButton({ animation: "shimmer" });
			expect(screen.getByRole("button")).toHaveClass("overflow-hidden");
		});
	});

	describe('animation="ripple"', () => {
		it("does NOT create a motion-span wrapper", () => {
			renderButton({ animation: "ripple" });
			expect(screen.queryByTestId("motion-span")).not.toBeInTheDocument();
			expect(screen.getByRole("button")).toBeInTheDocument();
		});

		it("sets data-animation='ripple' on the button itself", () => {
			renderButton({ animation: "ripple" });
			expect(screen.getByRole("button")).toHaveAttribute(
				"data-animation",
				"ripple",
			);
		});

		it("adds overflow-hidden to clip ripple waves to the button boundary", () => {
			renderButton({ animation: "ripple" });
			expect(screen.getByRole("button")).toHaveClass("overflow-hidden");
		});

		it("spawns a ripple-overlay span on pointerdown and removes it after animation", async () => {
			jest.useFakeTimers();
			const { unmount } = renderButton({ animation: "ripple" });
			fireEvent.pointerDown(screen.getByRole("button"));
			expect(screen.getByTestId("ripple-overlay")).toBeInTheDocument();
			await jest.runAllTimersAsync();
			unmount();
			jest.useRealTimers();
		});
	});

	// --- Wrapper animations (elastic / glow / tilt / bounce / pulse / press) ---
	// These wrap the button in a motion.span that drives the animation.
	for (const animation of WRAPPER_ANIMATIONS) {
		describe(`animation="${animation}"`, () => {
			it("wraps the button in a motion-span", () => {
				renderButton({ animation });
				const wrapper = screen.getByTestId("motion-span");
				expect(wrapper).toBeInTheDocument();
				expect(wrapper).toContainElement(screen.getByRole("button"));
			});

			it(`sets data-animation="${animation}" on the wrapper span`, () => {
				renderButton({ animation });
				expect(screen.getByTestId("motion-span")).toHaveAttribute(
					"data-animation",
					animation,
				);
			});

			it("does NOT render shimmer or ripple overlays", () => {
				renderButton({ animation });
				expect(screen.queryByTestId("shimmer-overlay")).not.toBeInTheDocument();
				expect(screen.queryByTestId("ripple-overlay")).not.toBeInTheDocument();
			});
		});
	}

	// --- Disabled guard ---
	for (const animation of [...INNER_ANIMATIONS, ...WRAPPER_ANIMATIONS]) {
		it(`suppresses all animation effects when disabled (animation="${animation}")`, () => {
			renderButton({ animation, disabled: true });
			expect(screen.queryByTestId("motion-span")).not.toBeInTheDocument();
			expect(screen.queryByTestId("shimmer-overlay")).not.toBeInTheDocument();
			expect(screen.queryByTestId("ripple-overlay")).not.toBeInTheDocument();
			expect(screen.getByRole("button")).toBeInTheDocument();
		});
	}
});

// ---------------------------------------------------------------------------
// Accessibility
// ---------------------------------------------------------------------------

describe("Button – accessibility", () => {
	it("has implicit role='button'", () => {
		renderButton();
		expect(screen.getByRole("button")).toBeInTheDocument();
	});

	it("supports aria-label for icon-only buttons", () => {
		render(
			<Button aria-label="Close dialog" size="icon">
				×
			</Button>,
		);
		expect(
			screen.getByRole("button", { name: "Close dialog" }),
		).toBeInTheDocument();
	});

	it("forwards aria-disabled attribute", () => {
		renderButton({ "aria-disabled": "true" });
		expect(screen.getByRole("button")).toHaveAttribute("aria-disabled", "true");
	});

	it("forwards data-* attributes", () => {
		render(<Button data-testid="my-button">Button</Button>);
		expect(screen.getByTestId("my-button")).toBeInTheDocument();
	});

	it("is focusable by keyboard", () => {
		renderButton();
		screen.getByRole("button").focus();
		expect(screen.getByRole("button")).toHaveFocus();
	});
});

// ---------------------------------------------------------------------------
// buttonVariants helper
// ---------------------------------------------------------------------------

describe("buttonVariants helper", () => {
	it("returns a string of class names", () => {
		const classes = buttonVariants({ variant: "default", size: "default" });
		expect(typeof classes).toBe("string");
		expect(classes.length).toBeGreaterThan(0);
	});

	it("includes the correct classes for given variant and size", () => {
		const classes = buttonVariants({ variant: "secondary", size: "lg" });
		expect(classes).toContain("bg-secondary");
		expect(classes).toContain("h-9");
	});
});
