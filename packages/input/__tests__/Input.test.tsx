import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Input, inputVariants } from "../src/Input";

// ---------------------------------------------------------------------------
// Rendering
// ---------------------------------------------------------------------------

describe("Input – rendering", () => {
	it("renders an input element", () => {
		render(<Input aria-label="Name" />);
		expect(screen.getByRole("textbox")).toBeInTheDocument();
	});

	it("has data-slot='input'", () => {
		const { container } = render(<Input />);
		expect(container.querySelector("[data-slot='input']")).toBeInTheDocument();
	});

	it("renders a floating label associated with the input", () => {
		render(<Input id="email" label="Email" />);
		const label = screen.getByText("Email");
		expect(label).toHaveAttribute("for", "email");
	});

	it("applies a custom className to the input", () => {
		const { container } = render(<Input className="my-input" />);
		expect(container.querySelector("[data-slot='input']")).toHaveClass(
			"my-input",
		);
	});

	it("forwards arbitrary HTML attributes", () => {
		render(<Input placeholder="Type here" />);
		expect(screen.getByPlaceholderText("Type here")).toBeInTheDocument();
	});

	it("generates a label association without an explicit id", () => {
		render(<Input label="Username" />);
		const label = screen.getByText("Username");
		expect(label).toHaveAttribute("for");
	});
});

// ---------------------------------------------------------------------------
// Variants
// ---------------------------------------------------------------------------

describe("Input – variants", () => {
	const variants = ["default", "filled", "ghost"] as const;

	for (const variant of variants) {
		it(`renders the '${variant}' variant`, () => {
			const { container } = render(<Input variant={variant} />);
			expect(
				container.querySelector("[data-slot='input']"),
			).toBeInTheDocument();
		});
	}

	const sizes = ["sm", "default", "lg"] as const;

	for (const inputSize of sizes) {
		it(`renders the '${inputSize}' size`, () => {
			const { container } = render(<Input inputSize={inputSize} />);
			expect(
				container.querySelector("[data-slot='input']"),
			).toBeInTheDocument();
		});
	}
});

// ---------------------------------------------------------------------------
// Error / validation
// ---------------------------------------------------------------------------

describe("Input – error state", () => {
	it("marks the input as invalid when an error is present", () => {
		const { container } = render(<Input error="Required" />);
		expect(container.querySelector("[data-slot='input']")).toHaveAttribute(
			"aria-invalid",
			"true",
		);
	});

	it("shows the error message", () => {
		render(<Input error="Required field" />);
		expect(screen.getByText("Required field")).toBeInTheDocument();
	});

	it("links the message to the input via aria-describedby", () => {
		const { container } = render(<Input id="pw" error="Too short" />);
		const input = container.querySelector("[data-slot='input']");
		const message = container.querySelector("[data-slot='input-message']");
		expect(input).toHaveAttribute("aria-describedby", "pw-message");
		expect(message).toHaveAttribute("id", "pw-message");
	});

	it("shows helper text when there is no error", () => {
		render(<Input helperText="We never share this" />);
		expect(screen.getByText("We never share this")).toBeInTheDocument();
	});

	it("prefers the error over helper text", () => {
		render(<Input error="Bad" helperText="Hint" />);
		expect(screen.getByText("Bad")).toBeInTheDocument();
		expect(screen.queryByText("Hint")).not.toBeInTheDocument();
	});

	it("is not invalid when no error is provided", () => {
		const { container } = render(<Input />);
		expect(container.querySelector("[data-slot='input']")).not.toHaveAttribute(
			"aria-invalid",
		);
	});
});

// ---------------------------------------------------------------------------
// Interaction
// ---------------------------------------------------------------------------

describe("Input – interaction", () => {
	it("calls onChange when typing", async () => {
		const user = userEvent.setup();
		const onChange = jest.fn();
		render(<Input aria-label="Name" onChange={onChange} />);
		await user.type(screen.getByRole("textbox"), "hi");
		expect(onChange).toHaveBeenCalled();
	});

	it("calls onFocus and onBlur", () => {
		const onFocus = jest.fn();
		const onBlur = jest.fn();
		render(<Input aria-label="Name" onFocus={onFocus} onBlur={onBlur} />);
		const input = screen.getByRole("textbox");
		fireEvent.focus(input);
		expect(onFocus).toHaveBeenCalledTimes(1);
		fireEvent.blur(input);
		expect(onBlur).toHaveBeenCalledTimes(1);
	});

	it("updates the value when typing", async () => {
		const user = userEvent.setup();
		render(<Input aria-label="Name" />);
		const input = screen.getByRole("textbox");
		await user.type(input, "Akex");
		expect(input).toHaveValue("Akex");
	});
});

// ---------------------------------------------------------------------------
// inputVariants helper
// ---------------------------------------------------------------------------

describe("inputVariants", () => {
	it("returns a class string", () => {
		expect(typeof inputVariants()).toBe("string");
	});
});
