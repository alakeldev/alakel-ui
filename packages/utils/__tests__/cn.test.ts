import { cn } from "../src/cn";

describe("cn utility", () => {
	it("merges class names", () => {
		expect(cn("foo", "bar")).toBe("foo bar");
	});

	it("handles conditional classes", () => {
		expect(cn("foo", false && "bar", "baz")).toBe("foo baz");
	});

	it("merges tailwind classes", () => {
		expect(cn("px-2 py-1", "px-4")).toBe("py-1 px-4");
	});
});
