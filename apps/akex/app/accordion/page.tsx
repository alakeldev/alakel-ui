import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@akex/accordion";
import Link from "next/link";

// ---------------------------------------------------------------------------
// Static data
// ---------------------------------------------------------------------------

const faqs = [
	{
		value: "what",
		question: "What is Akex?",
		answer:
			"Akex is a monorepo of small, accessible, animated React components published as scoped npm packages.",
	},
	{
		value: "styling",
		question: "How is it styled?",
		answer:
			"Every component uses Tailwind CSS with CSS variables, so it adapts to your theme out of the box.",
	},
	{
		value: "animation",
		question: "What powers the animations?",
		answer:
			"Motion (the successor to Framer Motion) drives every transition, including this panel's height animation.",
	},
];

const propRows = [
	{
		name: "type",
		type: "string",
		default: '"single"',
		description: '"single" closes others; "multiple" allows many open',
	},
	{
		name: "defaultValue",
		type: "string | string[]",
		default: "—",
		description: "Initially open item(s) when uncontrolled",
	},
	{
		name: "value",
		type: "string | string[]",
		default: "—",
		description: "Controlled open item(s)",
	},
	{
		name: "onValueChange",
		type: "(value: string[]) => void",
		default: "—",
		description: "Called with the new open values on every toggle",
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

export default function AccordionPage() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
			<div className="max-w-4xl mx-auto px-6 py-10">
				<div className="mb-8">
					<BackLink />
				</div>

				{/* Header */}
				<header className="mb-10 text-center">
					<h1 className="text-4xl font-bold text-white mb-3">Accordion</h1>
					<p className="text-gray-300 mb-4 max-w-lg mx-auto">
						Expandable panels with a{" "}
						<span className="underline decoration-purple-400 underline-offset-2">
							smooth height animation
						</span>
						,{" "}
						<span className="underline decoration-purple-400 underline-offset-2">
							single & multiple modes
						</span>
						, and full keyboard support.
					</p>
					<code className="text-sm text-purple-400 bg-black/40 px-3 py-1.5 rounded-lg">
						@akex/accordion
					</code>
				</header>

				{/* Installation */}
				<Section title="Installation">
					<pre className="bg-black/50 rounded-lg p-4 text-sm text-green-400 overflow-x-auto">
						npm install @akex/accordion
					</pre>
				</Section>

				{/* Usage */}
				<Section title="Usage">
					<pre className="bg-black/50 rounded-lg p-4 text-sm text-green-400 overflow-x-auto">{`import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@akex/accordion";

<Accordion type="single" defaultValue="a">
  <AccordionItem value="a">
    <AccordionTrigger>Is it accessible?</AccordionTrigger>
    <AccordionContent>Yes — it follows the WAI-ARIA pattern.</AccordionContent>
  </AccordionItem>
</Accordion>`}</pre>
				</Section>

				{/* Single mode demo */}
				<Section title="Single — one panel open at a time">
					<div className="rounded-xl border border-white/10 bg-black/20 px-5">
						<Accordion type="single" defaultValue="what">
							{faqs.map(({ value, question, answer }) => (
								<AccordionItem key={value} value={value}>
									<AccordionTrigger>{question}</AccordionTrigger>
									<AccordionContent>{answer}</AccordionContent>
								</AccordionItem>
							))}
						</Accordion>
					</div>
				</Section>

				{/* Multiple mode demo */}
				<Section title="Multiple — open several at once">
					<div className="rounded-xl border border-white/10 bg-black/20 px-5">
						<Accordion type="multiple">
							{faqs.map(({ value, question, answer }) => (
								<AccordionItem key={value} value={value}>
									<AccordionTrigger>{question}</AccordionTrigger>
									<AccordionContent>{answer}</AccordionContent>
								</AccordionItem>
							))}
						</Accordion>
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
