class ResizeObserverMock implements ResizeObserver {
	disconnect() {}

	observe() {}

	unobserve() {}
}

Object.defineProperty(globalThis, "ResizeObserver", {
	configurable: true,
	value: ResizeObserverMock,
});
