import type { ButtonAnimation } from "@alakel/button";
import { Button } from "@alakel/button";
import Link from "next/link";

// ---------------------------------------------------------------------------
// Static data – kept outside the component to avoid re-creation per render
// ---------------------------------------------------------------------------

const variants = [
	{ value: "default", label: "Default" },
	{ value: "secondary", label: "Secondary" },
	{ value: "destructive", label: "Destructive" },
	{ value: "outline", label: "Outline" },
	{ value: "ghost", label: "Ghost" },
	{ value: "link", label: "Link" },
] as const;

const sizes = [
	{ value: "xs", label: "xs" },
	{ value: "sm", label: "sm" },
	{ value: "default", label: "default" },
	{ value: "lg", label: "lg" },
	{ value: "icon", label: "icon" },
] as const;

const animations: {
	value: ButtonAnimation;
	label: string;
	description: string;
}[] = [
	{
		value: "shimmer",
		label: "Shimmer",
		description:
			"Looping light-sweep glint clipped inside the button — polished & eye-catching.",
	},
	{
		value: "ripple",
		label: "Ripple",
		description:
			"Material-style expanding wave on click, perfectly clipped to the button shape.",
	},
	{
		value: "elastic",
		label: "Elastic",
		description:
			"X/Y axes squish in opposite directions on hover — satisfying rubber-band feel.",
	},
	{
		value: "glow",
		label: "Glow",
		description:
			"Neon violet aura pulses continuously and blazes on hover — high-energy CTA.",
	},
	{
		value: "tilt",
		label: "Tilt",
		description:
			"3-D perspective rotation toward the cursor — elegant depth effect.",
	},
	{
		value: "bounce",
		label: "Bounce",
		description:
			"Spring lift on hover, soft press on tap — playful & approachable.",
	},
	{
		value: "pulse",
		label: "Pulse",
		description:
			"Continuous heartbeat scale loop — draws attention to a primary CTA.",
	},
	{
		value: "press",
		label: "Press",
		description:
			"Shadow-depth lift on hover, deep press on tap — satisfying physical button feel.",
	},
];

const props = [
	{
		name: "variant",
		type: "string",
		default: '"default"',
		description: "Visual style",
	},
	{
		name: "size",
		type: "string",
		default: '"default"',
		description: "Button dimensions",
	},
	{
		name: "animation",
		type: "ButtonAnimation",
		default: "—",
		description:
			'"shimmer" | "ripple" | "elastic" | "glow" | "tilt" | "bounce" | "pulse" | "press"',
	},
	{
		name: "disabled",
		type: "boolean",
		default: "false",
		description: "Disables interaction and animation",
	},
	{
		name: "className",
		type: "string",
		default: "—",
		description: "Extra Tailwind classes",
	},
	{
		name: "...props",
		type: "ButtonProps",
		default: "—",
		description: "All native button attributes",
	},
];

// ---------------------------------------------------------------------------
// Shared section wrapper
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

export default function ButtonPage() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
			<div className="max-w-4xl mx-auto px-6 py-10">
				<div className="mb-8">
					<BackLink />
				</div>

				{/* Header */}
				<header className="mb-10 text-center">
					<h1 className="text-4xl font-bold text-white mb-3">Button</h1>
					<p className="text-gray-300 mb-4 max-w-lg mx-auto">
						Accessible button with{" "}
						<span className="underline decoration-purple-400 underline-offset-2">
							6 variants
						</span>
						,{" "}
						<span className="underline decoration-purple-400 underline-offset-2">
							8 sizes
						</span>
						, and{" "}
						<span className="underline decoration-purple-400 underline-offset-2">
							8 motion animations
						</span>
						.
					</p>
					<code className="text-sm text-purple-400 bg-black/40 px-3 py-1.5 rounded-lg">
						@alakel/button
					</code>
				</header>

				{/* Install */}
				<Section title="Installation">
					<pre className="bg-black/50 rounded-lg p-4 text-sm text-green-400 overflow-x-auto">
						npm install @alakel/button
					</pre>
				</Section>

				{/* Usage */}
				<Section title="Usage">
					<pre className="bg-black/50 rounded-lg p-4 text-sm text-green-400 overflow-x-auto">{`import { Button } from "@alakel/button";

<Button variant="default" size="default">
  Click me
</Button>

{/* With animation */}
<Button animation="shimmer">Animated</Button>`}</pre>
				</Section>

				{/* Variants */}
				<Section title="Variants">
					<div className="flex flex-wrap gap-3">
						{variants.map(({ value, label }) => (
							<div key={value} className="flex flex-col items-center gap-2">
								<Button variant={value}>{label}</Button>
								<code className="text-xs text-gray-400">{value}</code>
							</div>
						))}
					</div>
				</Section>

				{/* Sizes */}
				<Section title="Sizes">
					<div className="flex flex-wrap items-center gap-4">
						{sizes.map(({ value, label }) => (
							<div key={value} className="flex flex-col items-center gap-2">
								<Button size={value}>{value === "icon" ? "→" : label}</Button>
								<code className="text-xs text-gray-400">{label}</code>
							</div>
						))}
					</div>
				</Section>

				{/* Disabled */}
				<Section title="Disabled State">
					<div className="flex flex-wrap gap-3">
						{variants.map(({ value, label }) => (
							<Button key={value} variant={value} disabled>
								{label}
							</Button>
						))}
					</div>
				</Section>

				{/* Animations */}
				<Section title="Animations">
					<p className="text-gray-400 text-sm mb-6">
						Pass the <code className="text-purple-400">animation</code> prop to
						enable a built-in motion preset. Animations are disabled
						automatically on disabled buttons.
					</p>
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
						{animations.map(({ value, label, description }) => (
							<div
								key={value}
								className="rounded-2xl border border-purple-400/40 bg-gradient-to-br from-purple-900/70 to-indigo-900/70 backdrop-blur-sm p-6 flex flex-col items-center gap-4 text-center shadow-xl shadow-purple-950/40 ring-1 ring-inset ring-white/5"
							>
								<div>
									<p className="text-white font-medium">{label}</p>
									<p className="text-gray-400 text-xs mt-0.5">{description}</p>
								</div>
								<Button animation={value} size="sm" className="px-5">
									{label}
								</Button>
								<code className="text-xs text-purple-300 bg-purple-950/70 border border-purple-500/20 px-2 py-1 rounded-lg">
									animation="{value}"
								</code>
							</div>
						))}
					</div>
				</Section>

				{/* Props table */}
				<Section title="Props">
					<div className="overflow-x-auto">
						<table className="w-full text-sm text-left border-collapse">
							<thead>
								<tr className="border-b border-white/20 text-white">
									<th className="py-2 px-3">Prop</th>
									<th className="py-2 px-3">Type</th>
									<th className="py-2 px-3">Default</th>
									<th className="py-2 px-3">Description</th>
								</tr>
							</thead>
							<tbody className="text-gray-300">
								{props.map((row) => (
									<tr key={row.name} className="border-b border-white/10">
										<td className="py-2 px-3 font-mono text-purple-400 text-xs">
											{row.name}
										</td>
										<td className="py-2 px-3 font-mono text-xs">{row.type}</td>
										<td className="py-2 px-3 font-mono text-xs">
											{row.default}
										</td>
										<td className="py-2 px-3 text-xs">{row.description}</td>
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
