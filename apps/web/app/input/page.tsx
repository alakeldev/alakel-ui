"use client";

import { Input } from "@alakel/input";
import Link from "next/link";
import { useState } from "react";

// ---------------------------------------------------------------------------
// Static data
// ---------------------------------------------------------------------------

const propRows = [
	{
		name: "label",
		type: "string",
		default: "—",
		description: "Floating label rendered inside the field",
	},
	{
		name: "error",
		type: "string",
		default: "—",
		description: "Error message — triggers shake + destructive styling",
	},
	{
		name: "helperText",
		type: "string",
		default: "—",
		description: "Hint shown below the field when there is no error",
	},
	{
		name: "variant",
		type: "string",
		default: '"default"',
		description: '"default" | "filled" | "ghost"',
	},
	{
		name: "inputSize",
		type: "string",
		default: '"default"',
		description: '"sm" | "default" | "lg"',
	},
	{
		name: "...props",
		type: "InputHTMLAttributes",
		default: "—",
		description: "All native input attributes (value, onChange, type…)",
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

export default function InputPage() {
	const [email, setEmail] = useState("");
	const emailError =
		email.length > 0 && !email.includes("@")
			? "Please enter a valid email address"
			: undefined;

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
			<div className="max-w-4xl mx-auto px-6 py-10">
				<div className="mb-8">
					<BackLink />
				</div>

				{/* Header */}
				<header className="mb-10 text-center">
					<h1 className="text-4xl font-bold text-white mb-3">Input</h1>
					<p className="text-gray-300 mb-4 max-w-lg mx-auto">
						Animated form field with a{" "}
						<span className="underline decoration-purple-400 underline-offset-2">
							floating label
						</span>
						, a{" "}
						<span className="underline decoration-purple-400 underline-offset-2">
							focus glow
						</span>
						, and a{" "}
						<span className="underline decoration-purple-400 underline-offset-2">
							shake-on-error
						</span>{" "}
						animation.
					</p>
					<code className="text-sm text-purple-400 bg-black/40 px-3 py-1.5 rounded-lg">
						@alakel/input
					</code>
				</header>

				{/* Installation */}
				<Section title="Installation">
					<pre className="bg-black/50 rounded-lg p-4 text-sm text-green-400 overflow-x-auto">
						npm install @alakel/input
					</pre>
				</Section>

				{/* Usage */}
				<Section title="Usage">
					<pre className="bg-black/50 rounded-lg p-4 text-sm text-green-400 overflow-x-auto">{`import { Input } from "@alakel/input";

<Input label="Email" type="email" />
<Input label="Password" error="Too short" />
<Input label="Username" helperText="Letters and numbers only" />`}</pre>
				</Section>

				{/* Live demo */}
				<Section title="Try it — type an email without an @">
					<div className="max-w-sm space-y-7 bg-white rounded-xl p-6">
						<Input
							label="Email"
							type="email"
							value={email}
							onChange={(event) => setEmail(event.target.value)}
							error={emailError}
							helperText="We'll never share your email"
						/>
						<Input label="Full name" helperText="As it appears on your ID" />
					</div>
				</Section>

				{/* Variants */}
				<Section title="Variants">
					<div className="bg-white rounded-xl p-6">
						<div className="grid grid-cols-1 sm:grid-cols-3 gap-7">
							<Input label="Default" />
							<Input label="Filled" variant="filled" />
							<Input label="Ghost" variant="ghost" />
						</div>
					</div>
				</Section>

				{/* Sizes */}
				<Section title="Sizes">
					<div className="bg-white rounded-xl p-6">
						<div className="grid grid-cols-1 sm:grid-cols-3 gap-7">
							<Input label="Small" inputSize="sm" />
							<Input label="Default" inputSize="default" />
							<Input label="Large" inputSize="lg" />
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
