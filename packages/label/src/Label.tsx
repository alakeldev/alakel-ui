"use client";

import { cn } from "@akex/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, type TargetAndTransition } from "motion/react";

const labelVariants = cva(
	"inline-flex items-center gap-1.5 font-medium leading-none select-none transition-colors",
	{
		variants: {
			variant: {
				default: "text-foreground",
				primary: "text-primary",
				secondary:
					"bg-secondary text-secondary-foreground rounded-md px-2 py-0.5",
				success: "text-emerald-400",
				warning: "text-amber-400",
				destructive: "text-destructive",
				outline: "border border-current rounded-md px-2 py-0.5",
				ghost: "text-muted-foreground",
			},
			size: {
				xs: "text-xs",
				sm: "text-[0.8rem]",
				default: "text-sm",
				lg: "text-base",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

/**
 * Available motion presets for Label.
 *
 * Inner animations — rendered as children inside the label element,
 * clipped to the label's boundary:
 *   shimmer — Aceternity-style looping gradient glint sweep
 *
 * Wrapper animations — a motion.span wraps the label and drives the effect:
 *   glow    — pulsing violet neon drop-shadow aura (Aceternity-inspired)
 *   float   — infinite gentle vertical levitation (Framer/Luma-style)
 *   bounce  — snappy spring lift on hover/tap (Linear-style)
 *   flicker — irregular neon-sign opacity flicker (retro-futuristic)
 *   pulse   — continuous scale heartbeat loop (attention-drawing)
 *   pop     — spring scale mount animation with hover boost (iOS-inspired)
 *   wave    — hue-rotate + brightness filter sweep (Magic UI-inspired)
 */
export type LabelAnimation =
	| "shimmer"
	| "glow"
	| "float"
	| "bounce"
	| "flicker"
	| "pulse"
	| "pop"
	| "wave";

const INNER_LABEL_ANIMATIONS = new Set<LabelAnimation>(["shimmer"]);

type MotionConfig = {
	initial?: TargetAndTransition;
	animate?: TargetAndTransition;
	whileHover?: TargetAndTransition;
	whileTap?: TargetAndTransition;
};

type WrapperLabelAnimation = Exclude<LabelAnimation, "shimmer">;

const labelAnimationPresets: Record<WrapperLabelAnimation, MotionConfig> = {
	/**
	 * Glow — Aceternity-inspired pulsing neon aura.
	 * A violet drop-shadow breathes on a 2 s loop; hover blazes it to full
	 * intensity with a double ring and a subtle scale-up.
	 */
	glow: {
		animate: {
			filter: [
				"drop-shadow(0 0 2px rgba(167,139,250,0.25))",
				"drop-shadow(0 0 14px rgba(167,139,250,1))",
				"drop-shadow(0 0 2px rgba(167,139,250,0.25))",
			],
			transition: {
				duration: 2,
				repeat: Number.POSITIVE_INFINITY,
				ease: "easeInOut",
			},
		},
		whileHover: {
			filter:
				"drop-shadow(0 0 20px rgba(167,139,250,1)) drop-shadow(0 0 6px rgba(196,181,253,0.9))",
			scale: 1.05,
			transition: { duration: 0.15 },
		},
	},

	/**
	 * Float — infinite gentle vertical levitation.
	 * Inspired by Framer's showcase elements and Luma AI's floating badges.
	 * Clean and alive; ideal for decorative labels in hero sections.
	 */
	float: {
		animate: {
			y: [0, -6, 0],
			transition: {
				duration: 2.6,
				repeat: Number.POSITIVE_INFINITY,
				ease: "easeInOut",
			},
		},
	},

	/**
	 * Bounce — Linear-style snappy spring interaction.
	 * A stiff spring lifts the label on hover and presses it on tap.
	 * Feels tactile and alive without being distracting.
	 */
	bounce: {
		whileHover: {
			y: -5,
			scale: 1.07,
			transition: { type: "spring", stiffness: 520, damping: 12 },
		},
		whileTap: {
			y: 1,
			scale: 0.96,
			transition: { type: "spring", stiffness: 520, damping: 12 },
		},
	},

	/**
	 * Flicker — retro-futuristic neon sign opacity flicker.
	 * Irregular opacity keyframes simulate a flickering neon tube.
	 * Use for status badges, environment indicators, or ambient labels.
	 */
	flicker: {
		animate: {
			opacity: [1, 0.82, 1, 0.52, 1, 0.91, 1, 0.68, 1],
			transition: {
				duration: 3.2,
				repeat: Number.POSITIVE_INFINITY,
				times: [0, 0.08, 0.18, 0.32, 0.48, 0.6, 0.72, 0.88, 1],
				ease: "linear",
			},
		},
	},

	/**
	 * Pulse — continuous scale heartbeat.
	 * Scales between 1 → 1.08 → 1 on a 1.6 s loop, drawing passive attention.
	 * Perfect for "new", "live", or "beta" status labels.
	 */
	pulse: {
		animate: {
			scale: [1, 1.08, 1],
			transition: {
				duration: 1.6,
				repeat: Number.POSITIVE_INFINITY,
				ease: "easeInOut",
			},
		},
		whileHover: {
			scale: 1.12,
			transition: { duration: 0.15 },
		},
		whileTap: {
			scale: 0.94,
			transition: { duration: 0.1 },
		},
	},

	/**
	 * Pop — iOS app icon-inspired spring mount animation.
	 * Starts at scale 0 / opacity 0 and springs to full size on mount;
	 * hover gives a small lift for continued interactivity.
	 */
	pop: {
		initial: { scale: 0, opacity: 0 },
		animate: {
			scale: 1,
			opacity: 1,
			transition: { type: "spring", stiffness: 500, damping: 20, mass: 0.8 },
		},
		whileHover: {
			scale: 1.1,
			transition: { type: "spring", stiffness: 420, damping: 12 },
		},
		whileTap: {
			scale: 0.95,
			transition: { duration: 0.1 },
		},
	},

	/**
	 * Wave — Magic UI-inspired hue-rotate + brightness filter sweep.
	 * A continuous filter animation shifts hue and brightness in a wave,
	 * making the label color ripple like light through a prism.
	 */
	wave: {
		animate: {
			filter: [
				"hue-rotate(0deg) brightness(1)",
				"hue-rotate(40deg) brightness(1.3)",
				"hue-rotate(0deg) brightness(1)",
			],
			transition: {
				duration: 3,
				repeat: Number.POSITIVE_INFINITY,
				ease: "easeInOut",
			},
		},
		whileHover: {
			filter: "hue-rotate(30deg) brightness(1.35)",
			scale: 1.04,
			transition: { duration: 0.2 },
		},
	},
};

export interface LabelProps
	extends React.LabelHTMLAttributes<HTMLLabelElement>,
		VariantProps<typeof labelVariants> {
	/** Apply a built-in motion animation to the label. */
	animation?: LabelAnimation;
}

function Label({
	className,
	variant = "default",
	size = "default",
	animation,
	children,
	...props
}: LabelProps) {
	const classes = cn(labelVariants({ variant, size, className }));

	const isInner = Boolean(animation && INNER_LABEL_ANIMATIONS.has(animation));
	const isWrapper = Boolean(
		animation && !INNER_LABEL_ANIMATIONS.has(animation),
	);

	// --- Inner animation: shimmer ---
	// The label itself gets `relative overflow-hidden` so the overlay is
	// clipped to the exact label shape.
	if (isInner) {
		return (
			<label
				data-slot="label"
				data-animation={animation}
				className={cn(classes, "relative overflow-hidden")}
				{...props}
			>
				{children}
				{animation === "shimmer" && (
					<motion.span
						aria-hidden
						data-testid="shimmer-overlay"
						style={{
							position: "absolute",
							inset: 0,
							width: "55%",
							background:
								"linear-gradient(105deg, transparent 25%, rgba(167,139,250,0.65) 50%, transparent 75%)",
							pointerEvents: "none",
						}}
						initial={{ x: "-160%" }}
						animate={{ x: "360%" }}
						transition={{
							duration: 1.6,
							repeat: Number.POSITIVE_INFINITY,
							repeatDelay: 1.8,
							ease: [0.4, 0, 0.2, 1],
						}}
					/>
				)}
			</label>
		);
	}

	// --- Wrapper animation ---
	// A motion.span wraps the label and drives the effect.
	if (isWrapper) {
		const preset = labelAnimationPresets[animation as WrapperLabelAnimation];
		return (
			<motion.span
				data-animation={animation}
				style={{ display: "inline-flex" }}
				initial={preset.initial}
				animate={preset.animate}
				whileHover={preset.whileHover}
				whileTap={preset.whileTap}
			>
				<label data-slot="label" className={classes} {...props}>
					{children}
				</label>
			</motion.span>
		);
	}

	// --- Plain label (no animation) ---
	return (
		<label data-slot="label" className={classes} {...props}>
			{children}
		</label>
	);
}

export { Label, labelVariants };
