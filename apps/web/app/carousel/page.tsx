"use client";

import type { CarouselAnimation } from "@akex/carousel";
import { Carousel } from "@akex/carousel";
import Link from "next/link";
import { useState } from "react";

// ---------------------------------------------------------------------------
// Demo slide items — visual gradient cards
// ---------------------------------------------------------------------------

const demoSlides = [
	{
		gradient: "from-violet-600 via-purple-700 to-indigo-800",
		icon: "⚡",
		title: "Type-Safe",
		description: "Built with TypeScript from the ground up for rock-solid DX.",
		badge: "@akex/carousel",
	},
	{
		gradient: "from-blue-600 via-cyan-600 to-teal-700",
		icon: "♿",
		title: "Accessible",
		description:
			"ARIA-compliant with keyboard navigation and screen reader support.",
		badge: "WCAG 2.1",
	},
	{
		gradient: "from-emerald-600 via-green-600 to-teal-700",
		icon: "✨",
		title: "Motion Rich",
		description:
			"5 production-ready animation presets — slide, fade, scale, flip, elastic.",
		badge: "Motion v12",
	},
	{
		gradient: "from-rose-600 via-pink-600 to-fuchsia-700",
		icon: "🧩",
		title: "Composable",
		description:
			"Pass any React node as a slide — cards, images, forms, anything.",
		badge: "React 19",
	},
	{
		gradient: "from-amber-500 via-orange-500 to-red-600",
		icon: "🚀",
		title: "Zero Config",
		description:
			"Works out of the box with sensible defaults. Customise only what you need.",
		badge: "Turborepo",
	},
] as const;

const SlideCard = ({
	gradient,
	icon,
	title,
	description,
	badge,
}: (typeof demoSlides)[number]) => (
	<div
		className={`bg-gradient-to-br ${gradient} rounded-xl p-8 h-60 flex flex-col justify-between`}
	>
		<div className="flex items-center justify-between">
			<span className="text-5xl">{icon}</span>
			<span className="text-xs font-medium text-white/60 bg-black/20 px-3 py-1 rounded-full font-mono">
				{badge}
			</span>
		</div>
		<div>
			<h3 className="text-2xl font-bold text-white">{title}</h3>
			<p className="text-white/70 mt-1 text-sm leading-relaxed">
				{description}
			</p>
		</div>
	</div>
);

// ---------------------------------------------------------------------------
// Animation presets metadata
// ---------------------------------------------------------------------------

const animationMeta: {
	value: CarouselAnimation;
	label: string;
	description: string;
	inspiration: string;
}[] = [
	{
		value: "slide",
		label: "Slide",
		description:
			"Direction-aware horizontal spring slide with cubic-bezier easing. The bread-and-butter of modern carousels.",
		inspiration: "Linear / Vercel",
	},
	{
		value: "fade",
		label: "Fade",
		description:
			"Elegant opacity + subtle scale crossfade. Non-directional and refined — lets content breathe.",
		inspiration: "Apple / Stripe",
	},
	{
		value: "scale",
		label: "Scale",
		description:
			"Current slide zooms out while the incoming slide zooms in. High-drama transitions for product showcases.",
		inspiration: "Framer showcase",
	},
	{
		value: "flip",
		label: "Flip",
		description:
			"Full 3-D Y-axis rotation with perspective. Bold and cinematic — ideal for card reveals and hero sections.",
		inspiration: "Apple product pages",
	},
	{
		value: "elastic",
		label: "Elastic",
		description:
			"Spring physics slide with natural overshoot. Playful and satisfying — great for onboarding flows.",
		inspiration: "Playful UIs",
	},
];

const propRows = [
	{
		name: "items",
		type: "React.ReactNode[]",
		default: "—",
		description: "Array of slide content (required)",
	},
	{
		name: "animation",
		type: "CarouselAnimation",
		default: '"slide"',
		description: '"slide" | "fade" | "scale" | "flip" | "elastic"',
	},
	{
		name: "autoPlay",
		type: "boolean",
		default: "false",
		description: "Auto-advance slides",
	},
	{
		name: "interval",
		type: "number",
		default: "4000",
		description: "Auto-play interval in milliseconds",
	},
	{
		name: "showDots",
		type: "boolean",
		default: "true",
		description: "Show dot navigation indicators",
	},
	{
		name: "showArrows",
		type: "boolean",
		default: "true",
		description: "Show previous / next arrow buttons",
	},
	{
		name: "loop",
		type: "boolean",
		default: "true",
		description: "Loop back when reaching first or last slide",
	},
	{
		name: "className",
		type: "string",
		default: "—",
		description: "Extra Tailwind classes on the root element",
	},
];

// ---------------------------------------------------------------------------
// Layout helpers
// ---------------------------------------------------------------------------

function BackLink() {
	return (
		<Link
			href="/"
			className="inline-flex items-center gap-1.5 h-7 px-2.5 text-[0.8rem] font-medium rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
		>
			Back
		</Link>
	);
}

function Section({
	title,
	children,
}: {
	title: string;
	children: React.ReactNode;
}) {
	return (
		<section className="rounded-2xl border border-white/10 bg-white/5 p-6 mb-6">
			<h2 className="text-xl font-semibold text-white mb-5">{title}</h2>
			{children}
		</section>
	);
}

// Pre-built once at module load — demoSlides is a module-level constant so
// these JSX elements never need to be recreated across re-renders.
const DEMO_SLIDES = demoSlides.map((s) => <SlideCard key={s.title} {...s} />);

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function CarouselPage() {
	const [activeAnimation, setActiveAnimation] =
		useState<CarouselAnimation>("slide");

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
			<div className="max-w-4xl mx-auto px-6 py-10">
				<div className="mb-8">
					<BackLink />
				</div>

				{/* Header */}
				<header className="mb-10 text-center">
					<h1 className="text-4xl font-bold text-white mb-3">Carousel</h1>
					<p className="text-gray-300 mb-4 max-w-lg mx-auto">
						Accessible carousel with{" "}
						<span className="underline decoration-purple-400 underline-offset-2">
							5 transition animations
						</span>
						,{" "}
						<span className="underline decoration-purple-400 underline-offset-2">
							auto-play
						</span>
						, and{" "}
						<span className="underline decoration-purple-400 underline-offset-2">
							keyboard navigation
						</span>
						.
					</p>
					<code className="text-sm text-purple-400 bg-black/40 px-3 py-1.5 rounded-lg">
						@akex/carousel
					</code>
				</header>

				{/* Installation */}
				<Section title="Installation">
					<pre className="bg-black/50 rounded-lg p-4 text-sm text-green-400 overflow-x-auto">
						npm install @akex/carousel
					</pre>
				</Section>

				{/* Usage */}
				<Section title="Usage">
					<pre className="bg-black/50 rounded-lg p-4 text-sm text-green-400 overflow-x-auto">{`import { Carousel } from "@akex/carousel";

const slides = [
  <div>Slide 1</div>,
  <div>Slide 2</div>,
  <div>Slide 3</div>,
];

<Carousel items={slides} animation="slide" />
<Carousel items={slides} animation="flip" autoPlay interval={3000} />
<Carousel items={slides} animation="elastic" loop={false} />`}</pre>
				</Section>

				{/* Live demo */}
				<Section title="Live Demo">
					{/* Animation selector */}
					<div className="flex flex-wrap gap-2 mb-6">
						{animationMeta.map(({ value, label }) => (
							<button
								key={value}
								type="button"
								onClick={() => setActiveAnimation(value)}
								className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border ${
									activeAnimation === value
										? "bg-purple-500 border-purple-400 text-white"
										: "bg-white/5 border-white/20 text-gray-300 hover:bg-white/10 hover:text-white"
								}`}
							>
								{label}
							</button>
						))}
					</div>

					{/* Carousel */}
					<Carousel
						key={activeAnimation}
						items={DEMO_SLIDES}
						animation={activeAnimation}
						className="w-full"
					/>

					{/* Active animation description */}
					<div className="mt-4 p-4 rounded-xl bg-black/30 border border-white/10">
						<div className="flex items-center gap-2 mb-1">
							<span className="text-white font-medium text-sm">
								{animationMeta.find((a) => a.value === activeAnimation)?.label}
							</span>
							<span className="text-xs text-purple-400/70 font-mono bg-purple-400/10 px-2 py-0.5 rounded-full">
								{
									animationMeta.find((a) => a.value === activeAnimation)
										?.inspiration
								}
							</span>
						</div>
						<p className="text-gray-400 text-xs leading-relaxed">
							{
								animationMeta.find((a) => a.value === activeAnimation)
									?.description
							}
						</p>
					</div>
				</Section>

				{/* Animation presets reference */}
				<Section title="Animation Presets">
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
						{animationMeta.map(({ value, label, description, inspiration }) => (
							<div
								key={value}
								className="rounded-xl border border-white/10 bg-black/30 p-5 flex flex-col gap-2"
							>
								<div className="flex items-center justify-between">
									<span className="text-white font-semibold text-sm">
										{label}
									</span>
									<span className="text-xs text-purple-400/70 font-mono bg-purple-400/10 px-2 py-0.5 rounded-full">
										{inspiration}
									</span>
								</div>
								<p className="text-gray-400 text-xs leading-relaxed">
									{description}
								</p>
								<code className="text-xs text-purple-300 font-mono">
									animation=&quot;{value}&quot;
								</code>
							</div>
						))}
					</div>
				</Section>

				{/* Props */}
				<Section title="Props">
					<div className="overflow-x-auto">
						<table className="w-full text-sm">
							<thead>
								<tr className="border-b border-white/10">
									<th className="text-left py-2 pr-4 text-gray-400 font-medium">
										Prop
									</th>
									<th className="text-left py-2 pr-4 text-gray-400 font-medium">
										Type
									</th>
									<th className="text-left py-2 pr-4 text-gray-400 font-medium">
										Default
									</th>
									<th className="text-left py-2 text-gray-400 font-medium">
										Description
									</th>
								</tr>
							</thead>
							<tbody>
								{propRows.map((row) => (
									<tr key={row.name} className="border-b border-white/5">
										<td className="py-3 pr-4 text-white font-mono text-xs">
											{row.name}
										</td>
										<td className="py-3 pr-4 text-purple-300 font-mono text-xs">
											{row.type}
										</td>
										<td className="py-3 pr-4 text-gray-400 font-mono text-xs">
											{row.default}
										</td>
										<td className="py-3 text-gray-400 text-xs leading-relaxed">
											{row.description}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</Section>

				<div className="mt-10">
					<BackLink />
				</div>
			</div>
		</div>
	);
}
