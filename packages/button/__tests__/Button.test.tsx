import { render, screen } from "@testing-library/react";
import { Button } from "../src/Button";

describe("Button", () => {
	it("renders button with text", () => {
		render(<Button>Click me</Button>);
		expect(screen.getByText("Click me")).toBeInTheDocument();
	});

	it("applies default variant class", () => {
		render(<Button>Default</Button>);
		const button = screen.getByText("Default");
		expect(button).toHaveClass("bg-primary");
	});

	it("applies secondary variant class", () => {
		render(<Button variant="secondary">Secondary</Button>);
		const button = screen.getByText("Secondary");
		expect(button).toHaveClass("bg-secondary");
	});

	it("applies custom className", () => {
		render(<Button className="custom-class">Custom</Button>);
		const button = screen.getByText("Custom");
		expect(button).toHaveClass("custom-class");
	});

	it("renders as disabled", () => {
		render(<Button disabled>Disabled</Button>);
		const button = screen.getByText("Disabled");
		expect(button).toBeDisabled();
	});

	it("applies size classes", () => {
		render(<Button size="lg">Large</Button>);
		const button = screen.getByText("Large");
		expect(button).toHaveClass("h-9");
	});
});
