import type { CardAnimation } from "@alakel/card";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@alakel/card";
import Link from "next/link";

// ---------------------------------------------------------------------------
// Static data
// ---------------------------------------------------------------------------

const variants = [
	{ value: "default", label: "Default" },
	{ value: "elevated", label: "Elevated" },
	{ value: "outline", label: "Outline" },
	{ value: "ghost", label: "Ghost" },
	{ value: "gradient", label: "Gradient" },
] as const;

const animations: {
	value: CardAnimation;
	label: string;
	description: string;
	inspiration: string;
}[] = [
	{
		value: "lift",
		label: "Lift",
		description:
			"Floats up with a deeper shadow on hover — the classic interactive surface for clickable cards.",
		inspiration: "Material Design",
	},
	{
		value: "tilt",
		label: "Tilt",
		description:
			"A subtle 3D tilt and scale on hover gives the card real depth and a premium feel.",
		inspiration: "Aceternity UI",
	},
	{
		value: "glow",
		label: "Glow",
		description:
			"A soft violet border glow pulses on a continuous loop — perfect for highlighting a featured plan.",
		inspiration: "Magic UI",
	},
	{
		value: "pop",
		label: "Pop",
		description:
			"Springs in from a smaller scale on mount. Great for cards that appear in a grid or modal.",
		inspiration: "iOS / iPadOS",
	},
];

const propRows = [
	{
		name: "variant",
		type: "string",
		default: '"default"',
		description: '"default" | "elevated" | "outline" | "ghost" | "gradient"',
	},
	{
		name: "padding",
		type: "string",
		default: '"default"',
		description: '"none" | "sm" | "default" | "lg"',
	},
	{
		name: "animation",
		type: "CardAnimation",
		default: "—",
		description: '"lift" | "tilt" | "glow" | "pop"',
	},
	{
		name: "className",
		type: "string",
		default: "—",
		description: "Extra Tailwind classes",
	},
	{
		name: "...props",
		type: "HTMLAttributes",
		default: "—",
		description: "All native div element attributes",
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

export default function CardPage() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
			<div className="max-w-4xl mx-auto px-6 py-10">
				<div className="mb-8">
					<BackLink />
				</div>

				{/* Header */}
				<header className="mb-10 text-center">
					<h1 className="text-4xl font-bold text-white mb-3">Card</h1>
					<p className="text-gray-300 mb-4 max-w-lg mx-auto">
						Composable surface with{" "}
						<span className="underline decoration-purple-400 underline-offset-2">
							5 variants
						</span>
						,{" "}
						<span className="underline decoration-purple-400 underline-offset-2">
							4 motion animations
						</span>
						, and a full set of header / content / footer parts.
					</p>
					<code className="text-sm text-purple-400 bg-black/40 px-3 py-1.5 rounded-lg">
						@alakel/card
					</code>
				</header>

				{/* Installation */}
				<Section title="Installation">
					<pre className="bg-black/50 rounded-lg p-4 text-sm text-green-400 overflow-x-auto">
						npm install @alakel/card
					</pre>
				</Section>

				{/* Usage */}
				<Section title="Usage">
					<pre className="bg-black/50 rounded-lg p-4 text-sm text-green-400 overflow-x-auto">{`import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@alakel/card";

<Card variant="gradient" animation="lift">
  <CardHeader>
    <CardTitle>Pro plan</CardTitle>
    <CardDescription>Everything you need to ship.</CardDescription>
  </CardHeader>
  <CardContent>Unlimited projects and priority support.</CardContent>
  <CardFooter>$29 / month</CardFooter>
</Card>`}</pre>
				</Section>

				{/* Variants */}
				<Section title="Variants">
					<div className="rounded-xl bg-gradient-to-br from-zinc-100 to-zinc-200 p-6">
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
							{variants.map(({ value, label }) => (
								<Card key={value} variant={value}>
									<CardHeader>
										<CardTitle>{label}</CardTitle>
										<CardDescription>
											variant=&quot;{value}&quot;
										</CardDescription>
									</CardHeader>
									<CardContent>
										A flexible surface for grouping related content.
									</CardContent>
								</Card>
							))}
						</div>
					</div>
				</Section>

				{/* Animations */}
				<Section title="Animations — hover the cards">
					<div className="rounded-xl bg-gradient-to-br from-zinc-100 to-zinc-200 p-6">
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
							{animations.map(({ value, label, description, inspiration }) => (
								<Card key={value} variant="default" animation={value}>
									<CardHeader>
										<div className="flex items-center justify-between">
											<CardTitle>{label}</CardTitle>
											<span className="text-xs text-purple-600 font-mono bg-purple-500/10 px-2 py-0.5 rounded-full">
												{inspiration}
											</span>
										</div>
									</CardHeader>
									<CardContent>{description}</CardContent>
									<CardFooter>
										<code className="text-xs text-purple-600 font-mono">
											animation=&quot;{value}&quot;
										</code>
									</CardFooter>
								</Card>
							))}
						</div>
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
