"use client";

import { cn } from "@akex/utils";
import {
	AnimatePresence,
	motion,
	type TargetAndTransition,
} from "motion/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

/**
 * Available slide transition animations.
 *
 *   slide       — Direction-aware horizontal spring slide (default).
 *                 Inspired by Linear, Vercel, and most modern SaaS dashboards.
 *
 *   fade        — Elegant opacity + subtle scale crossfade.
 *                 Apple / Stripe style — refined and non-distracting.
 *
 *   scale       — Current slide zooms out while the next zooms in.
 *                 Framer showcase and product-demo style — high drama.
 *
 *   flip        — Full 3-D Y-axis rotation with perspective.
 *                 Apple product page / card reveal — bold and cinematic.
 *
 *   elastic     — Spring physics slide with natural overshoot.
 *                 Playful and satisfying — great for onboarding flows.
 */
export type CarouselAnimation = "slide" | "fade" | "scale" | "flip" | "elastic";

export interface CarouselProps {
	/** Array of slide content to display. Each item is a React node. */
	items: React.ReactNode[];
	/** Slide transition animation preset. @default "slide" */
	animation?: CarouselAnimation;
	/** Auto-advance slides at the given interval. @default false */
	autoPlay?: boolean;
	/** Milliseconds between auto-advance steps. @default 4000 */
	interval?: number;
	/** Show navigation dot indicators. @default true */
	showDots?: boolean;
	/** Show previous / next arrow buttons. @default true */
	showArrows?: boolean;
	/** Loop back to the start/end when reaching a boundary. @default true */
	loop?: boolean;
	className?: string;
}

// ---------------------------------------------------------------------------
// Animation helpers (defined outside component — no hooks, pure functions)
// ---------------------------------------------------------------------------

type SlideVariants = {
	enter: TargetAndTransition;
	center: TargetAndTransition;
	exit: TargetAndTransition;
};

/**
 * Returns Motion variant objects for the enter / center / exit states.
 * `direction` is +1 (forward) or -1 (backward) and drives directional effects.
 */
function getVariants(
	animation: CarouselAnimation,
	direction: number,
): SlideVariants {
	const d = direction >= 0 ? 1 : -1;

	switch (animation) {
		case "slide":
			return {
				enter: { x: `${d * 105}%`, opacity: 0.5 },
				center: { x: 0, opacity: 1 },
				exit: { x: `${-d * 105}%`, opacity: 0.5 },
			};

		case "elastic":
			return {
				enter: { x: `${d * 130}%`, opacity: 0.35 },
				center: { x: 0, opacity: 1 },
				exit: { x: `${-d * 130}%`, opacity: 0.35 },
			};

		case "flip":
			return {
				enter: { opacity: 0, rotateY: d * 90, scale: 0.92 },
				center: { opacity: 1, rotateY: 0, scale: 1 },
				exit: { opacity: 0, rotateY: -d * 90, scale: 0.92 },
			};

		case "scale":
			return {
				enter: { opacity: 0, scale: 0.55 },
				center: { opacity: 1, scale: 1 },
				exit: { opacity: 0, scale: 1.3 },
			};

		default:
			return {
				enter: { opacity: 0, scale: 0.97 },
				center: { opacity: 1, scale: 1 },
				exit: { opacity: 0, scale: 0.97 },
			};
	}
}

/**
 * Returns the Motion transition config for each animation type.
 * Elastic uses spring physics; others use duration-based easing.
 */
function getTransition(animation: CarouselAnimation) {
	switch (animation) {
		case "elastic":
			return { type: "spring" as const, stiffness: 260, damping: 22 };
		case "flip":
			return { duration: 0.52, ease: [0.4, 0, 0.2, 1] as const };
		case "fade":
			return { duration: 0.32, ease: "easeInOut" as const };
		case "scale":
			return { duration: 0.38, ease: [0.4, 0, 0.2, 1] as const };
		default: // slide
			return { duration: 0.38, ease: [0.4, 0, 0.2, 1] as const };
	}
}

// ---------------------------------------------------------------------------
// Carousel component
// ---------------------------------------------------------------------------

function Carousel({
	items,
	animation = "slide",
	autoPlay = false,
	interval = 4000,
	showDots = true,
	showArrows = true,
	loop = true,
	className,
}: CarouselProps) {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [direction, setDirection] = useState<number>(1);
	const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
	const total = items.length;

	const goTo = useCallback((index: number, dir: number) => {
		setDirection(dir);
		setCurrentIndex(index);
	}, []);

	const next = useCallback(() => {
		if (!loop && currentIndex === total - 1) return;
		goTo(loop ? (currentIndex + 1) % total : currentIndex + 1, 1);
	}, [currentIndex, total, loop, goTo]);

	const prev = useCallback(() => {
		if (!loop && currentIndex === 0) return;
		goTo(loop ? (currentIndex - 1 + total) % total : currentIndex - 1, -1);
	}, [currentIndex, total, loop, goTo]);

	const handleKeyDown = useCallback(
		(e: React.KeyboardEvent<HTMLElement>) => {
			switch (e.key) {
				case "ArrowLeft":
					e.preventDefault();
					prev();
					break;
				case "ArrowRight":
					e.preventDefault();
					next();
					break;
				case "Home":
					e.preventDefault();
					goTo(0, -1);
					break;
				case "End":
					e.preventDefault();
					goTo(total - 1, 1);
					break;
			}
		},
		[prev, next, goTo, total],
	);

	// Auto-play: restart the interval whenever `next` changes (index or loop change).
	useEffect(() => {
		if (!autoPlay) return;
		timerRef.current = setInterval(next, interval);
		return () => {
			if (timerRef.current) clearInterval(timerRef.current);
		};
	}, [autoPlay, interval, next]);

	const variants = useMemo(
		() => getVariants(animation, direction),
		[animation, direction],
	);
	const transition = useMemo(() => getTransition(animation), [animation]);

	const atStart = !loop && currentIndex === 0;
	const atEnd = !loop && currentIndex === total - 1;
	const isFlip = animation === "flip";

	return (
		<section
			aria-label="Carousel"
			data-slot="carousel"
			tabIndex={0}
			onKeyDown={handleKeyDown}
			className={cn("relative select-none focus:outline-none", className)}
		>
			{/* Slide track */}
			<div
				className="relative overflow-hidden rounded-xl"
				style={isFlip ? { perspective: "1200px" } : undefined}
			>
				<AnimatePresence mode="wait">
					<motion.div
						key={currentIndex}
						variants={variants}
						initial="enter"
						animate="center"
						exit="exit"
						transition={transition}
						data-testid="carousel-item"
						className="w-full"
					>
						{items[currentIndex]}
					</motion.div>
				</AnimatePresence>
			</div>

			{/* Arrow buttons */}
			{showArrows && (
				<>
					<button
						type="button"
						aria-label="Previous"
						disabled={atStart}
						onClick={prev}
						className="absolute left-3 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-9 h-9 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 text-white text-lg font-light hover:bg-black/70 hover:border-white/40 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
					>
						‹
					</button>
					<button
						type="button"
						aria-label="Next"
						disabled={atEnd}
						onClick={next}
						className="absolute right-3 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-9 h-9 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 text-white text-lg font-light hover:bg-black/70 hover:border-white/40 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
					>
						›
					</button>
				</>
			)}

			{/* Dot indicators */}
			{showDots && (
				<div
					role="tablist"
					aria-label="Carousel slides"
					className="flex items-center justify-center gap-2 mt-4"
				>
					{items.map((_, i) => (
						<button
							// biome-ignore lint/suspicious/noArrayIndexKey: index is stable for carousel slides
							key={i}
							type="button"
							role="tab"
							aria-label={`Go to slide ${i + 1}`}
							aria-selected={i === currentIndex}
							onClick={() => goTo(i, i > currentIndex ? 1 : -1)}
							className={cn(
								"h-2 rounded-full transition-all duration-300",
								i === currentIndex
									? "w-6 bg-purple-400"
									: "w-2 bg-white/30 hover:bg-white/60",
							)}
						/>
					))}
				</div>
			)}
		</section>
	);
}

export { Carousel };
