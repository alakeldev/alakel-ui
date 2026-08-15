import type { LabelAnimation } from "@alakel/label";
import { Label } from "@alakel/label";
import Link from "next/link";

// ---------------------------------------------------------------------------
// Static data
// ---------------------------------------------------------------------------

const variants = [
	{ value: "default", label: "Default" },
	{ value: "primary", label: "Primary" },
	{ value: "secondary", label: "Secondary" },
	{ value: "success", label: "Success" },
	{ value: "warning", label: "Warning" },
	{ value: "destructive", label: "Destructive" },
	{ value: "outline", label: "Outline" },
	{ value: "ghost", label: "Ghost" },
] as const;

const sizes = [
	{ value: "xs", label: "Extra Small" },
	{ value: "sm", label: "Small" },
	{ value: "default", label: "Default" },
	{ value: "lg", label: "Large" },
] as const;

const animations: {
	value: LabelAnimation;
	label: string;
	description: string;
	inspiration: string;
}[] = [
	{
		value: "shimmer",
		label: "Shimmer",
		description:
			"A glinting gradient sweep clips inside the label on a continuous loop — Aceternity-style polish.",
		inspiration: "Aceternity UI",
	},
	{
		value: "glow",
		label: "Glow",
		description:
			"Violet neon drop-shadow pulses in a 2 s loop; hover blazes it to maximum intensity with a double ring.",
		inspiration: "Aceternity UI",
	},
	{
		value: "float",
		label: "Float",
		description:
			"Endless gentle vertical levitation — clean and alive. Perfect for hero section badges.",
		inspiration: "Framer / Luma AI",
	},
	{
		value: "bounce",
		label: "Bounce",
		description:
			"Stiff spring lifts the label on hover and presses it on tap. Snappy, tactile, non-distracting.",
		inspiration: "Linear",
	},
	{
		value: "flicker",
		label: "Flicker",
		description:
			"Irregular opacity keyframes simulate a neon tube firing up. Atmospheric and retro-futuristic.",
		inspiration: "Neon signage",
	},
	{
		value: "pulse",
		label: "Pulse",
		description:
			'Continuous scale heartbeat loop. Draws passive attention — ideal for "live", "new", or "beta" badges.',
		inspiration: "Status indicators",
	},
	{
		value: "pop",
		label: "Pop",
		description:
			"Scales from 0 → 1 with a spring overshoot on mount; hover gives a small lift for ongoing interactivity.",
		inspiration: "iOS / iPadOS icons",
	},
	{
		value: "wave",
		label: "Wave",
		description:
			"Continuous hue-rotate + brightness filter shift makes the label color ripple like light through a prism.",
		inspiration: "Magic UI",
	},
];

const propRows = [
	{
		name: "variant",
		type: "string",
		default: '"default"',
		description: "Visual style of the label",
	},
	{
		name: "size",
		type: "string",
		default: '"default"',
		description: "Text size",
	},
	{
		name: "animation",
		type: "LabelAnimation",
		default: "—",
		description:
			'"shimmer" | "glow" | "float" | "bounce" | "flicker" | "pulse" | "pop" | "wave"',
	},
	{
		name: "htmlFor",
		type: "string",
		default: "—",
		description: "Associates the label with a form input by id",
	},
	{
		name: "className",
		type: "string",
		default: "—",
		description: "Extra Tailwind classes",
	},
	{
		name: "...props",
		type: "LabelHTMLAttributes",
		default: "—",
		description: "All native label element attributes",
	},
];

// ---------------------------------------------------------------------------
// Shared layout components
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

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function LabelPage() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
			<div className="max-w-4xl mx-auto px-6 py-10">
				<div className="mb-8">
					<BackLink />
				</div>

				{/* Header */}
				<header className="mb-10 text-center">
					<h1 className="text-4xl font-bold text-white mb-3">Label</h1>
					<p className="text-gray-300 mb-4 max-w-lg mx-auto">
						Accessible label element with{" "}
						<span className="underline decoration-purple-400 underline-offset-2">
							8 variants
						</span>
						,{" "}
						<span className="underline decoration-purple-400 underline-offset-2">
							4 sizes
						</span>
						, and{" "}
						<span className="underline decoration-purple-400 underline-offset-2">
							8 motion animations
						</span>
						.
					</p>
					<code className="text-sm text-purple-400 bg-black/40 px-3 py-1.5 rounded-lg">
						@alakel/label
					</code>
				</header>

				{/* Installation */}
				<Section title="Installation">
					<pre className="bg-black/50 rounded-lg p-4 text-sm text-green-400 overflow-x-auto">
						npm install @alakel/label
					</pre>
				</Section>

				{/* Usage */}
				<Section title="Usage">
					<pre className="bg-black/50 rounded-lg p-4 text-sm text-green-400 overflow-x-auto">{`import { Label } from "@alakel/label";

<Label htmlFor="email">Email address</Label>
<Label variant="success" size="sm">Active</Label>
<Label animation="glow">Live</Label>`}</pre>
				</Section>

				{/* Variants */}
				<Section title="Variants">
					<div className="flex flex-wrap gap-4">
						{variants.map(({ value, label }) => (
							<div key={value} className="flex flex-col items-center gap-2">
								<Label variant={value} size="default">
									{label}
								</Label>
								<span className="text-xs text-gray-500 font-mono">{value}</span>
							</div>
						))}
					</div>
				</Section>

				{/* Sizes */}
				<Section title="Sizes">
					<div className="flex flex-wrap items-end gap-6">
						{sizes.map(({ value, label }) => (
							<div key={value} className="flex flex-col items-center gap-2">
								<Label variant="primary" size={value}>
									{label}
								</Label>
								<span className="text-xs text-gray-500 font-mono">{value}</span>
							</div>
						))}
					</div>
				</Section>

				{/* Animations */}
				<Section title="Animations">
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
						{animations.map(({ value, label, description, inspiration }) => (
							<div
								key={value}
								className="rounded-xl border border-white/10 bg-black/30 p-5 flex flex-col gap-3"
							>
								<div className="flex items-center justify-between">
									<Label variant="primary" size="lg" animation={value}>
										{label}
									</Label>
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
