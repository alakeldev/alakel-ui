import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { CarouselAnimation } from "../src/Carousel";
import { Carousel } from "../src/Carousel";

const ALL_ANIMATIONS: CarouselAnimation[] = [
	"slide",
	"fade",
	"scale",
	"flip",
	"elastic",
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const slides = ["Slide 1", "Slide 2", "Slide 3", "Slide 4"];

function renderCarousel(
	props: Partial<React.ComponentProps<typeof Carousel>> = {},
) {
	return render(<Carousel items={props.items ?? slides} {...props} />);
}

// ---------------------------------------------------------------------------
// Rendering
// ---------------------------------------------------------------------------

describe("Carousel – rendering", () => {
	it("renders the first item initially", () => {
		renderCarousel();
		expect(screen.getByText("Slide 1")).toBeInTheDocument();
	});

	it("renders Previous and Next buttons by default", () => {
		renderCarousel();
		expect(
			screen.getByRole("button", { name: "Previous" }),
		).toBeInTheDocument();
		expect(screen.getByRole("button", { name: "Next" })).toBeInTheDocument();
	});

	it("renders navigation dots equal to the number of items", () => {
		renderCarousel();
		expect(screen.getAllByRole("tab")).toHaveLength(slides.length);
	});

	it("wraps the active slide in a carousel-item element", () => {
		renderCarousel();
		expect(screen.getByTestId("carousel-item")).toBeInTheDocument();
	});

	it("has role='region' with aria-label='Carousel'", () => {
		renderCarousel();
		expect(
			screen.getByRole("region", { name: "Carousel" }),
		).toBeInTheDocument();
	});

	it("has data-slot='carousel' on the root element", () => {
		const { container } = renderCarousel();
		expect(
			container.querySelector("[data-slot='carousel']"),
		).toBeInTheDocument();
	});

	it("applies a custom className to the root element", () => {
		const { container } = renderCarousel({ className: "my-carousel" });
		expect(container.querySelector("[data-slot='carousel']")).toHaveClass(
			"my-carousel",
		);
	});
});

// ---------------------------------------------------------------------------
// Navigation
// ---------------------------------------------------------------------------

describe("Carousel – navigation", () => {
	it("advances to the next item when Next is clicked", async () => {
		const user = userEvent.setup();
		renderCarousel();
		await user.click(screen.getByRole("button", { name: "Next" }));
		expect(screen.getByText("Slide 2")).toBeInTheDocument();
	});

	it("goes back to the previous item when Prev is clicked", async () => {
		const user = userEvent.setup();
		renderCarousel();
		await user.click(screen.getByRole("button", { name: "Next" }));
		await user.click(screen.getByRole("button", { name: "Previous" }));
		expect(screen.getByText("Slide 1")).toBeInTheDocument();
	});

	it("loops to the last item when Prev is clicked on the first (loop=true)", async () => {
		const user = userEvent.setup();
		renderCarousel({ loop: true });
		await user.click(screen.getByRole("button", { name: "Previous" }));
		expect(screen.getByText("Slide 4")).toBeInTheDocument();
	});

	it("loops to the first item when Next is clicked on the last (loop=true)", async () => {
		const user = userEvent.setup();
		renderCarousel({ loop: true });
		// advance to the last slide
		for (let i = 0; i < slides.length - 1; i++) {
			await user.click(screen.getByRole("button", { name: "Next" }));
		}
		await user.click(screen.getByRole("button", { name: "Next" }));
		expect(screen.getByText("Slide 1")).toBeInTheDocument();
	});

	it("navigates to a slide when its dot is clicked", async () => {
		const user = userEvent.setup();
		renderCarousel();
		const tabs = screen.getAllByRole("tab");
		await user.click(tabs[2]);
		expect(screen.getByText("Slide 3")).toBeInTheDocument();
	});

	it("active dot reflects the current index after navigation", async () => {
		const user = userEvent.setup();
		renderCarousel();
		await user.click(screen.getByRole("button", { name: "Next" }));
		const tabs = screen.getAllByRole("tab");
		expect(tabs[1]).toHaveAttribute("aria-selected", "true");
		expect(tabs[0]).toHaveAttribute("aria-selected", "false");
	});
});

// ---------------------------------------------------------------------------
// Dot indicators
// ---------------------------------------------------------------------------

describe("Carousel – dots", () => {
	it("first dot is active initially", () => {
		renderCarousel();
		const tabs = screen.getAllByRole("tab");
		expect(tabs[0]).toHaveAttribute("aria-selected", "true");
	});

	it("each dot has an accessible aria-label", () => {
		renderCarousel();
		const tabs = screen.getAllByRole("tab");
		expect(tabs[0]).toHaveAttribute("aria-label", "Go to slide 1");
		expect(tabs[3]).toHaveAttribute("aria-label", "Go to slide 4");
	});

	it("renders dot container with role='tablist'", () => {
		renderCarousel();
		expect(
			screen.getByRole("tablist", { name: "Carousel slides" }),
		).toBeInTheDocument();
	});
});

// ---------------------------------------------------------------------------
// showDots / showArrows
// ---------------------------------------------------------------------------

describe("Carousel – visibility controls", () => {
	it("hides dots when showDots=false", () => {
		renderCarousel({ showDots: false });
		expect(screen.queryAllByRole("tab")).toHaveLength(0);
	});

	it("hides arrows when showArrows=false", () => {
		renderCarousel({ showArrows: false });
		expect(
			screen.queryByRole("button", { name: "Previous" }),
		).not.toBeInTheDocument();
		expect(
			screen.queryByRole("button", { name: "Next" }),
		).not.toBeInTheDocument();
	});

	it("shows dots by default", () => {
		renderCarousel();
		expect(screen.getAllByRole("tab").length).toBeGreaterThan(0);
	});

	it("shows arrows by default", () => {
		renderCarousel();
		expect(screen.getByRole("button", { name: "Previous" })).toBeVisible();
		expect(screen.getByRole("button", { name: "Next" })).toBeVisible();
	});
});

// ---------------------------------------------------------------------------
// Loop control
// ---------------------------------------------------------------------------

describe("Carousel – loop control", () => {
	it("Prev button is disabled at the first item when loop=false", () => {
		renderCarousel({ loop: false });
		expect(screen.getByRole("button", { name: "Previous" })).toBeDisabled();
	});

	it("Prev button is enabled after navigating forward with loop=false", async () => {
		const user = userEvent.setup();
		renderCarousel({ loop: false });
		await user.click(screen.getByRole("button", { name: "Next" }));
		expect(screen.getByRole("button", { name: "Previous" })).toBeEnabled();
	});

	it("Next button is disabled at the last item when loop=false", async () => {
		const user = userEvent.setup();
		renderCarousel({ items: ["A", "B"], loop: false });
		await user.click(screen.getByRole("button", { name: "Next" }));
		expect(screen.getByRole("button", { name: "Next" })).toBeDisabled();
	});

	it("does not advance past the last item when loop=false", async () => {
		const user = userEvent.setup();
		renderCarousel({ items: ["A", "B"], loop: false });
		await user.click(screen.getByRole("button", { name: "Next" }));
		// next is now disabled — clicking should have no effect
		await user.click(screen.getByRole("button", { name: "Next" }));
		expect(screen.getByText("B")).toBeInTheDocument();
	});

	it("Prev and Next buttons are both enabled in the middle with loop=false", async () => {
		const user = userEvent.setup();
		renderCarousel({ loop: false });
		await user.click(screen.getByRole("button", { name: "Next" }));
		expect(screen.getByRole("button", { name: "Previous" })).toBeEnabled();
		expect(screen.getByRole("button", { name: "Next" })).toBeEnabled();
	});
});

// ---------------------------------------------------------------------------
// Auto-play
// ---------------------------------------------------------------------------

describe("Carousel – autoPlay", () => {
	it("advances to the next slide automatically after the interval", () => {
		jest.useFakeTimers();
		renderCarousel({ autoPlay: true, interval: 3000 });
		expect(screen.getByText("Slide 1")).toBeInTheDocument();
		act(() => {
			jest.advanceTimersByTime(3000);
		});
		expect(screen.getByText("Slide 2")).toBeInTheDocument();
		jest.useRealTimers();
	});

	it("advances multiple times over multiple intervals", () => {
		jest.useFakeTimers();
		renderCarousel({ autoPlay: true, interval: 2000 });
		act(() => {
			jest.advanceTimersByTime(2000);
		});
		act(() => {
			jest.advanceTimersByTime(2000);
		});
		expect(screen.getByText("Slide 3")).toBeInTheDocument();
		jest.useRealTimers();
	});

	it("cleans up the interval timer on unmount", () => {
		jest.useFakeTimers();
		const clearSpy = jest.spyOn(globalThis, "clearInterval");
		const { unmount } = renderCarousel({ autoPlay: true });
		unmount();
		expect(clearSpy).toHaveBeenCalled();
		clearSpy.mockRestore();
		jest.useRealTimers();
	});

	it("does NOT auto-advance when autoPlay=false", () => {
		jest.useFakeTimers();
		renderCarousel({ autoPlay: false, interval: 1000 });
		act(() => {
			jest.advanceTimersByTime(5000);
		});
		expect(screen.getByText("Slide 1")).toBeInTheDocument();
		jest.useRealTimers();
	});
});

// ---------------------------------------------------------------------------
// Animation types
// ---------------------------------------------------------------------------

describe("Carousel – animation types", () => {
	for (const animation of ALL_ANIMATIONS) {
		it(`renders the carousel-item with animation="${animation}"`, () => {
			renderCarousel({ animation });
			expect(screen.getByTestId("carousel-item")).toBeInTheDocument();
			expect(screen.getByText("Slide 1")).toBeInTheDocument();
		});
	}
});

// ---------------------------------------------------------------------------
// Accessibility
// ---------------------------------------------------------------------------

describe("Carousel – accessibility", () => {
	it("Previous button has accessible aria-label", () => {
		renderCarousel();
		expect(
			screen.getByRole("button", { name: "Previous" }),
		).toBeInTheDocument();
	});

	it("Next button has accessible aria-label", () => {
		renderCarousel();
		expect(screen.getByRole("button", { name: "Next" })).toBeInTheDocument();
	});

	it("carousel region has an accessible name", () => {
		renderCarousel();
		expect(
			screen.getByRole("region", { name: "Carousel" }),
		).toBeInTheDocument();
	});

	it("carousel root is focusable (tabIndex=0)", () => {
		renderCarousel();
		const carousel = screen.getByRole("region", { name: "Carousel" });
		expect(carousel).toHaveAttribute("tabindex", "0");
	});

	it("renders with a single item without errors", () => {
		renderCarousel({ items: ["Only slide"] });
		expect(screen.getByText("Only slide")).toBeInTheDocument();
		expect(screen.getAllByRole("tab")).toHaveLength(1);
	});
});

// ---------------------------------------------------------------------------
// Keyboard navigation
// ---------------------------------------------------------------------------

describe("Carousel – keyboard navigation", () => {
	it("ArrowRight advances to the next slide", async () => {
		const user = userEvent.setup();
		renderCarousel();
		const carousel = screen.getByRole("region", { name: "Carousel" });
		carousel.focus();
		await user.keyboard("{ArrowRight}");
		expect(screen.getByText("Slide 2")).toBeInTheDocument();
	});

	it("ArrowLeft goes back to the previous slide", async () => {
		const user = userEvent.setup();
		renderCarousel();
		const carousel = screen.getByRole("region", { name: "Carousel" });
		carousel.focus();
		await user.keyboard("{ArrowRight}");
		await user.keyboard("{ArrowLeft}");
		expect(screen.getByText("Slide 1")).toBeInTheDocument();
	});

	it("End key jumps to the last slide", async () => {
		const user = userEvent.setup();
		renderCarousel();
		const carousel = screen.getByRole("region", { name: "Carousel" });
		carousel.focus();
		await user.keyboard("{End}");
		expect(screen.getByText("Slide 4")).toBeInTheDocument();
	});

	it("Home key jumps back to the first slide", async () => {
		const user = userEvent.setup();
		renderCarousel();
		const carousel = screen.getByRole("region", { name: "Carousel" });
		carousel.focus();
		await user.keyboard("{End}");
		await user.keyboard("{Home}");
		expect(screen.getByText("Slide 1")).toBeInTheDocument();
	});

	it("ArrowLeft loops to the last slide from the first when loop=true", async () => {
		const user = userEvent.setup();
		renderCarousel({ loop: true });
		const carousel = screen.getByRole("region", { name: "Carousel" });
		carousel.focus();
		await user.keyboard("{ArrowLeft}");
		expect(screen.getByText("Slide 4")).toBeInTheDocument();
	});

	it("ArrowRight loops to the first slide from the last when loop=true", async () => {
		const user = userEvent.setup();
		renderCarousel({ loop: true });
		const carousel = screen.getByRole("region", { name: "Carousel" });
		carousel.focus();
		await user.keyboard("{End}");
		await user.keyboard("{ArrowRight}");
		expect(screen.getByText("Slide 1")).toBeInTheDocument();
	});
});
