import { render, screen } from "@testing-library/react";
import type { CardAnimation } from "../src/Card";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
	cardVariants,
} from "../src/Card";

const ANIMATIONS: CardAnimation[] = ["lift", "tilt", "glow", "pop"];

// ---------------------------------------------------------------------------
// Rendering
// ---------------------------------------------------------------------------

describe("Card – rendering", () => {
	it("renders children", () => {
		render(<Card>Hello</Card>);
		expect(screen.getByText("Hello")).toBeInTheDocument();
	});

	it("has data-slot='card'", () => {
		const { container } = render(<Card>x</Card>);
		expect(container.querySelector("[data-slot='card']")).toBeInTheDocument();
	});

	it("renders as a div by default", () => {
		const { container } = render(<Card>x</Card>);
		expect(
			container.querySelector("div[data-slot='card']"),
		).toBeInTheDocument();
	});

	it("applies a custom className", () => {
		const { container } = render(<Card className="my-card">x</Card>);
		expect(container.querySelector("[data-slot='card']")).toHaveClass(
			"my-card",
		);
	});

	it("forwards arbitrary HTML attributes", () => {
		const { container } = render(<Card id="panel">x</Card>);
		expect(container.querySelector("#panel")).toBeInTheDocument();
	});
});

// ---------------------------------------------------------------------------
// Variants
// ---------------------------------------------------------------------------

describe("Card – variants", () => {
	const variants = [
		"default",
		"elevated",
		"outline",
		"ghost",
		"gradient",
	] as const;

	for (const variant of variants) {
		it(`renders the '${variant}' variant`, () => {
			const { container } = render(<Card variant={variant}>x</Card>);
			expect(container.querySelector("[data-slot='card']")).toBeInTheDocument();
		});
	}

	const paddings = ["none", "sm", "default", "lg"] as const;

	for (const padding of paddings) {
		it(`renders the '${padding}' padding`, () => {
			const { container } = render(<Card padding={padding}>x</Card>);
			expect(container.querySelector("[data-slot='card']")).toBeInTheDocument();
		});
	}
});

// ---------------------------------------------------------------------------
// Animations
// ---------------------------------------------------------------------------

describe("Card – animations", () => {
	for (const animation of ANIMATIONS) {
		it(`renders the '${animation}' animation via a motion.div`, () => {
			const { container } = render(<Card animation={animation}>x</Card>);
			const el = container.querySelector("[data-slot='card']");
			expect(el).toBeInTheDocument();
			expect(el).toHaveAttribute("data-testid", "motion-div");
			expect(el).toHaveAttribute("data-animation", animation);
		});
	}

	it("renders a plain div when no animation is set", () => {
		const { container } = render(<Card>x</Card>);
		const el = container.querySelector("[data-slot='card']");
		expect(el).not.toHaveAttribute("data-testid", "motion-div");
		expect(el).not.toHaveAttribute("data-animation");
	});
});

// ---------------------------------------------------------------------------
// Compound components
// ---------------------------------------------------------------------------

describe("Card – compound components", () => {
	it("renders a full card composition", () => {
		const { container } = render(
			<Card>
				<CardHeader>
					<CardTitle>Title</CardTitle>
					<CardDescription>Description</CardDescription>
				</CardHeader>
				<CardContent>Body</CardContent>
				<CardFooter>Footer</CardFooter>
			</Card>,
		);

		expect(screen.getByText("Title")).toBeInTheDocument();
		expect(screen.getByText("Description")).toBeInTheDocument();
		expect(screen.getByText("Body")).toBeInTheDocument();
		expect(screen.getByText("Footer")).toBeInTheDocument();

		expect(
			container.querySelector("[data-slot='card-header']"),
		).toBeInTheDocument();
		expect(
			container.querySelector("[data-slot='card-title']"),
		).toBeInTheDocument();
		expect(
			container.querySelector("[data-slot='card-description']"),
		).toBeInTheDocument();
		expect(
			container.querySelector("[data-slot='card-content']"),
		).toBeInTheDocument();
		expect(
			container.querySelector("[data-slot='card-footer']"),
		).toBeInTheDocument();
	});

	it("renders CardTitle as an h3", () => {
		const { container } = render(<CardTitle>T</CardTitle>);
		expect(
			container.querySelector("h3[data-slot='card-title']"),
		).toBeInTheDocument();
	});

	it("forwards className on compound components", () => {
		const { container } = render(<CardContent className="px-2">B</CardContent>);
		expect(container.querySelector("[data-slot='card-content']")).toHaveClass(
			"px-2",
		);
	});
});

// ---------------------------------------------------------------------------
// cardVariants helper
// ---------------------------------------------------------------------------

describe("cardVariants", () => {
	it("returns a class string", () => {
		expect(typeof cardVariants()).toBe("string");
	});

	it("includes overrides passed as className", () => {
		expect(cardVariants({ className: "extra-class" })).toContain("extra-class");
	});
});
