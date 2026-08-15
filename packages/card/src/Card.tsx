"use client";

import { cn } from "@alakel/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, type TargetAndTransition } from "motion/react";

const cardVariants = cva("rounded-2xl text-card-foreground transition-colors", {
	variants: {
		variant: {
			default: "bg-card border border-border shadow-sm",
			elevated: "bg-card shadow-lg",
			outline: "border border-border bg-transparent",
			ghost: "bg-muted/40",
			gradient:
				"border border-primary/20 bg-gradient-to-br from-primary/10 to-primary/5 backdrop-blur",
		},
		padding: {
			none: "p-0",
			sm: "p-4",
			default: "p-6",
			lg: "p-8",
		},
	},
	defaultVariants: {
		variant: "default",
		padding: "default",
	},
});

/**
 * Available motion presets for Card.
 *
 *   lift  — floats up with a deeper shadow on hover (interactive surface)
 *   tilt  — subtle 3D tilt + scale on hover (Aceternity-style depth)
 *   glow  — a soft border glow pulses on a continuous loop
 *   pop   — spring scale-in mount animation (iOS-inspired)
 */
export type CardAnimation = "lift" | "tilt" | "glow" | "pop";

type MotionConfig = {
	initial?: TargetAndTransition;
	animate?: TargetAndTransition;
	whileHover?: TargetAndTransition;
	whileTap?: TargetAndTransition;
};

const cardAnimationPresets: Record<CardAnimation, MotionConfig> = {
	/** Lift — floats up with a deeper shadow on hover. */
	lift: {
		whileHover: {
			y: -8,
			boxShadow: "0 20px 40px -12px rgba(0,0,0,0.45)",
			transition: { type: "spring", stiffness: 400, damping: 22 },
		},
		whileTap: {
			y: -2,
			transition: { type: "spring", stiffness: 400, damping: 22 },
		},
	},

	/** Tilt — subtle 3D tilt + scale on hover. */
	tilt: {
		whileHover: {
			rotateX: 6,
			rotateY: -6,
			scale: 1.03,
			transition: { type: "spring", stiffness: 300, damping: 18 },
		},
	},

	/** Glow — a soft border glow that smoothly pulses on a continuous loop. */
	glow: {
		animate: {
			boxShadow: [
				"0 0 10px 0 rgba(168,85,247,0.25)",
				"0 0 26px 4px rgba(168,85,247,0.55)",
			],
			transition: {
				duration: 1.8,
				repeat: Number.POSITIVE_INFINITY,
				repeatType: "mirror",
				ease: "easeInOut",
			},
		},
	},

	/** Pop — springs in on mount and bounces on hover/tap (iOS-inspired). */
	pop: {
		initial: { scale: 0.8, opacity: 0 },
		animate: {
			scale: 1,
			opacity: 1,
			transition: { type: "spring", stiffness: 420, damping: 18, mass: 0.8 },
		},
		whileHover: {
			scale: 1.06,
			transition: { type: "spring", stiffness: 420, damping: 12 },
		},
		whileTap: {
			scale: 0.94,
			transition: { type: "spring", stiffness: 500, damping: 18 },
		},
	},
};

export interface CardProps
	extends React.HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof cardVariants> {
	/** Apply a built-in motion animation to the card. */
	animation?: CardAnimation;
}

function Card({
	className,
	variant = "default",
	padding = "default",
	animation,
	children,
	...props
}: CardProps) {
	const classes = cn(cardVariants({ variant, padding, className }));

	if (animation) {
		const preset = cardAnimationPresets[animation];
		return (
			<motion.div
				data-slot="card"
				data-animation={animation}
				className={classes}
				style={{ transformStyle: "preserve-3d", transformPerspective: 1000 }}
				initial={preset.initial}
				animate={preset.animate}
				whileHover={preset.whileHover}
				whileTap={preset.whileTap}
				{...(props as React.ComponentProps<typeof motion.div>)}
			>
				{children}
			</motion.div>
		);
	}

	return (
		<div data-slot="card" className={classes} {...props}>
			{children}
		</div>
	);
}

function CardHeader({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			data-slot="card-header"
			className={cn("flex flex-col gap-1.5 mb-4", className)}
			{...props}
		/>
	);
}

function CardTitle({
	className,
	...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
	return (
		<h3
			data-slot="card-title"
			className={cn(
				"text-lg font-semibold leading-none tracking-tight",
				className,
			)}
			{...props}
		/>
	);
}

function CardDescription({
	className,
	...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
	return (
		<p
			data-slot="card-description"
			className={cn("text-sm text-muted-foreground", className)}
			{...props}
		/>
	);
}

function CardContent({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			data-slot="card-content"
			className={cn("text-sm", className)}
			{...props}
		/>
	);
}

function CardFooter({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			data-slot="card-footer"
			className={cn("flex items-center gap-2 mt-4", className)}
			{...props}
		/>
	);
}

export {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
	cardVariants,
};
