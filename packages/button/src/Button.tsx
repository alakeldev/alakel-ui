"use client";

import { cn } from "@akex/utils";
import { Button as ButtonPrimitive } from "@base-ui/react/button";
import type { BaseUIEvent } from "@base-ui/react/types";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, type TargetAndTransition } from "motion/react";
import { useCallback, useState } from "react";

const buttonVariants = cva(
	"group/button inline-flex shrink-0 items-center justify-center rounded-full border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-colors outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
	{
		variants: {
			variant: {
				default: "bg-primary text-primary-foreground hover:bg-primary/80",
				outline:
					"border-border bg-background hover:bg-muted hover:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
				secondary:
					"bg-secondary text-secondary-foreground hover:bg-secondary/80",
				ghost: "hover:bg-muted hover:text-foreground dark:hover:bg-muted/50",
				destructive:
					"bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30",
				link: "text-primary underline-offset-4 hover:underline",
			},
			size: {
				default: "h-8 gap-1.5 px-2.5",
				xs: "h-6 gap-1 px-2 text-xs [&_svg:not([class*='size-'])]:size-3",
				sm: "h-7 gap-1 px-2.5 text-[0.8rem] [&_svg:not([class*='size-'])]:size-3.5",
				lg: "h-9 gap-2 px-4 text-base",
				icon: "size-8",
				"icon-xs": "size-6 [&_svg:not([class*='size-'])]:size-3",
				"icon-sm": "size-7",
				"icon-lg": "size-9",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

/**
 * Available motion presets.
 *
 * Inner animations — rendered as children inside the button element, so the
 * effect is clipped to the button's exact boundary (border-radius included):
 *   shimmer — looping light-sweep glint across the button surface
 *   ripple  — Material-Design-style expanding wave on pointer-down
 *
 * Wrapper animations — a motion.span wraps the button and drives the effect:
 *   elastic — rubber-band X/Y squish on hover / tap
 *   glow    — pulsing neon aura that blazes on hover
 *   tilt    — 3-D perspective rotation toward the cursor
 *   bounce  — spring lift on hover, soft press on tap
 *   pulse   — continuous scale heartbeat (attention-grabbing CTA)
 *   press   — shadow-depth lift on hover, deep press on tap
 */
export type ButtonAnimation =
	| "shimmer"
	| "ripple"
	| "elastic"
	| "glow"
	| "tilt"
	| "bounce"
	| "pulse"
	| "press";

// Inner animations run INSIDE the button so overflow:hidden + border-radius clip them.
const INNER_ANIMATIONS = new Set<ButtonAnimation>(["shimmer", "ripple"]);

type MotionConfig = {
	whileHover?: TargetAndTransition;
	whileTap?: TargetAndTransition;
	animate?: TargetAndTransition;
	wrapperStyle?: React.CSSProperties;
};

type WrapperAnimation = Exclude<ButtonAnimation, "shimmer" | "ripple">;

const animationPresets: Record<WrapperAnimation, MotionConfig> = {
	/**
	 * Elastic — rubber-band squish.
	 * Hover widens + flattens the button; tap inverts the axes.
	 * A stiff, low-damping spring gives an organic jelly-like overshoot.
	 */
	elastic: {
		whileHover: {
			scaleX: 1.12,
			scaleY: 0.86,
			transition: { type: "spring", stiffness: 550, damping: 8, mass: 0.7 },
		},
		whileTap: {
			scaleX: 0.88,
			scaleY: 1.14,
			transition: { type: "spring", stiffness: 550, damping: 8, mass: 0.7 },
		},
	},

	/**
	 * Glow — pulsing neon aura.
	 * A violet drop-shadow breathes on a 2 s loop; on hover it blazes to full
	 * intensity with a second ring added and the button scales up slightly.
	 */
	glow: {
		animate: {
			filter: [
				"drop-shadow(0 0 3px rgba(139,92,246,0.2))",
				"drop-shadow(0 0 16px rgba(139,92,246,0.9))",
				"drop-shadow(0 0 3px rgba(139,92,246,0.2))",
			],
			transition: {
				duration: 2,
				repeat: Number.POSITIVE_INFINITY,
				ease: "easeInOut",
			},
		},
		whileHover: {
			filter:
				"drop-shadow(0 0 24px rgba(139,92,246,1)) drop-shadow(0 0 8px rgba(196,181,253,0.8))",
			scale: 1.05,
			transition: { duration: 0.15 },
		},
		whileTap: {
			scale: 0.96,
			transition: { duration: 0.1 },
		},
	},

	/**
	 * Tilt — 3-D perspective rotation.
	 * Hover rotates −8° on X and +12° on Y; tap nudges back slightly.
	 * A spring easing gives a physical snap on release.
	 */
	tilt: {
		whileHover: {
			rotateX: -8,
			rotateY: 12,
			scale: 1.06,
			transition: { type: "spring", stiffness: 280, damping: 18 },
		},
		whileTap: {
			rotateX: 2,
			rotateY: -4,
			scale: 0.97,
			transition: { type: "spring", stiffness: 280, damping: 18 },
		},
		wrapperStyle: { perspective: "700px" },
	},

	/**
	 * Bounce — vertical spring lift.
	 * Hover floats the button 6 px upward; tap pushes it 2 px down.
	 * Great for navigation items, cards, and playful CTAs.
	 */
	bounce: {
		whileHover: {
			y: -6,
			transition: { type: "spring", stiffness: 420, damping: 10 },
		},
		whileTap: {
			y: 2,
			transition: { type: "spring", stiffness: 420, damping: 10 },
		},
	},

	/**
	 * Pulse — continuous scale heartbeat.
	 * Scales between 1 → 1.07 → 1 on a 1.6 s loop, drawing attention to
	 * primary CTAs. Hover boosts the scale; tap shrinks slightly.
	 */
	pulse: {
		animate: {
			scale: [1, 1.07, 1],
			transition: {
				duration: 1.6,
				repeat: Number.POSITIVE_INFINITY,
				ease: "easeInOut",
			},
		},
		whileHover: {
			scale: 1.1,
			transition: { duration: 0.2 },
		},
		whileTap: {
			scale: 0.94,
			transition: { duration: 0.1 },
		},
	},

	/**
	 * Press — shadow-depth lift and press.
	 * Hover elevates the button with a layered shadow; tap presses it down
	 * and collapses the shadow for a satisfying physical button feel.
	 */
	press: {
		whileHover: {
			y: -3,
			boxShadow: "0 8px 24px rgba(0,0,0,0.22), 0 2px 8px rgba(0,0,0,0.14)",
			transition: { type: "spring", stiffness: 420, damping: 16 },
		},
		whileTap: {
			y: 2,
			boxShadow: "0 1px 2px rgba(0,0,0,0.12)",
			transition: { type: "spring", stiffness: 420, damping: 16 },
		},
	},
};

export interface ButtonProps
	extends ButtonPrimitive.Props,
		VariantProps<typeof buttonVariants> {
	/** Apply a built-in motion animation to the button. */
	animation?: ButtonAnimation;
}

function Button({
	className,
	variant = "default",
	size = "default",
	animation,
	disabled,
	children,
	onPointerDown,
	...props
}: ButtonProps) {
	// Ripple state — tracks active ripple circles by timestamp id.
	const [ripples, setRipples] = useState<Array<{ id: number }>>([]);

	const classes = cn(buttonVariants({ variant, size, className }));

	const isInner = Boolean(
		animation && !disabled && INNER_ANIMATIONS.has(animation),
	);
	const isWrapper = Boolean(
		animation && !disabled && !INNER_ANIMATIONS.has(animation),
	);

	// Fires a ripple on pointer-down, then removes it after the animation ends.
	const handlePointerDown = useCallback(
		(e: BaseUIEvent<React.PointerEvent<HTMLButtonElement>>) => {
			const id = Date.now();
			setRipples((prev) => [...prev, { id }]);
			setTimeout(
				() => setRipples((prev) => prev.filter((r) => r.id !== id)),
				700,
			);
			onPointerDown?.(e);
		},
		[onPointerDown],
	);

	// --- Inner animation: shimmer / ripple ---
	// The button itself gets `relative overflow-hidden` so the overlay is
	// clipped to the exact button shape (border-radius included).
	if (isInner) {
		const innerProps =
			animation === "ripple"
				? { ...props, onPointerDown: handlePointerDown }
				: { ...props, onPointerDown };

		return (
			<ButtonPrimitive
				data-slot="button"
				data-animation={animation}
				className={cn(classes, "relative overflow-hidden")}
				disabled={disabled}
				{...innerProps}
			>
				{children}

				{animation === "shimmer" && (
					<motion.span
						aria-hidden
						data-testid="shimmer-overlay"
						style={{
							position: "absolute",
							inset: 0,
							width: "45%",
							background:
								"linear-gradient(105deg, transparent 30%, rgba(167,139,250,0.55) 50%, transparent 70%)",
							pointerEvents: "none",
						}}
						initial={{ x: "-150%" }}
						animate={{ x: "350%" }}
						transition={{
							duration: 1.4,
							repeat: Number.POSITIVE_INFINITY,
							repeatDelay: 1.6,
							ease: [0.4, 0, 0.2, 1],
						}}
					/>
				)}

				{animation === "ripple" &&
					ripples.map(({ id }) => (
						<motion.span
							key={id}
							aria-hidden
							data-testid="ripple-overlay"
							style={{
								position: "absolute",
								top: "50%",
								left: "50%",
								width: "120%",
								paddingBottom: "120%",
								marginTop: "-60%",
								marginLeft: "-60%",
								borderRadius: "50%",
								background: "rgba(255,255,255,0.32)",
								pointerEvents: "none",
							}}
							initial={{ scale: 0, opacity: 1 }}
							animate={{ scale: 1, opacity: 0 }}
							transition={{ duration: 0.65, ease: "easeOut" }}
						/>
					))}
			</ButtonPrimitive>
		);
	}

	// --- Wrapper animation: elastic / glow / tilt / bounce / pulse / press ---
	if (isWrapper) {
		const preset = animationPresets[animation as WrapperAnimation];
		return (
			<motion.span
				style={{ display: "inline-flex", ...preset.wrapperStyle }}
				whileHover={preset.whileHover}
				whileTap={preset.whileTap}
				animate={preset.animate}
				data-animation={animation}
			>
				<ButtonPrimitive
					data-slot="button"
					className={classes}
					disabled={disabled}
					{...props}
				>
					{children}
				</ButtonPrimitive>
			</motion.span>
		);
	}

	// --- Plain button (no animation or disabled) ---
	return (
		<ButtonPrimitive
			data-slot="button"
			className={classes}
			disabled={disabled}
			{...props}
		>
			{children}
		</ButtonPrimitive>
	);
}

export { Button, buttonVariants };
