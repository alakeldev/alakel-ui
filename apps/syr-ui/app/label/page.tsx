import { Label } from "@syr-ui/label";
import Link from "next/link";

export default function LabelDocsPage() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
			<div className="max-w-6xl mx-auto p-8">
				{/* Back Navigation */}
				<Link
					href="/"
					className="inline-flex items-center text-purple-400 hover:text-purple-300 mb-8"
				>
					← Back to Components
				</Link>

				{/* Header */}
				<header className="mb-12">
					<div className="text-5xl mb-4">🏷️</div>
					<h1 className="text-5xl font-bold text-white mb-4">Label</h1>
					<p className="text-xl text-gray-300 mb-2">
						Accessible label component for form inputs and elements
					</p>
					<code className="text-sm text-purple-400 bg-black/30 px-3 py-1 rounded">
						@syr-ui/label
					</code>
				</header>

				{/* Installation */}
				<section className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10 mb-8">
					<h2 className="text-2xl font-semibold text-white mb-4">
						Installation
					</h2>
					<div className="bg-black/50 rounded p-4 font-mono text-sm text-green-400">
						npm install @syr-ui/label
					</div>
				</section>

				{/* Usage */}
				<section className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10 mb-8">
					<h2 className="text-2xl font-semibold text-white mb-4">Usage</h2>
					<div className="bg-black/50 rounded p-4 font-mono text-sm text-green-400 mb-4">
						{`import { Label } from "@syr-ui/label";

export default function App() {
  return (
    <div>
      <Label htmlFor="email">Email Address</Label>
      <input id="email" type="email" />
    </div>
  );
}`}
					</div>
				</section>

				{/* Examples */}
				<section className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10 mb-8">
					<h2 className="text-2xl font-semibold text-white mb-4">Examples</h2>

					<div className="space-y-8">
						{/* Basic Label */}
						<div>
							<h3 className="text-xl text-white mb-4">Basic Label</h3>
							<div className="bg-white/10 rounded-lg p-6">
								<Label className="text-white">Default Label</Label>
								<p className="text-sm text-gray-400 mt-2">
									Standard label with default styling
								</p>
							</div>
						</div>

						{/* Colored Label */}
						<div>
							<h3 className="text-xl text-white mb-4">Custom Colors</h3>
							<div className="bg-white/10 rounded-lg p-6 space-y-4">
								<div>
									<Label className="text-blue-400">Blue Label</Label>
								</div>
								<div>
									<Label className="text-green-400">Green Label</Label>
								</div>
								<div>
									<Label className="text-purple-400">Purple Label</Label>
								</div>
								<div>
									<Label className="text-red-400">Red Label</Label>
								</div>
							</div>
						</div>

						{/* Form Example */}
						<div>
							<h3 className="text-xl text-white mb-4">Form Example</h3>
							<div className="bg-white/10 rounded-lg p-6">
								<form className="space-y-4">
									<div className="space-y-2">
										<Label htmlFor="name" className="text-white">
											Full Name
										</Label>
										<input
											id="name"
											type="text"
											className="w-full px-3 py-2 bg-black/30 border border-white/20 rounded text-white"
											placeholder="John Doe"
										/>
									</div>
									<div className="space-y-2">
										<Label htmlFor="email-input" className="text-white">
											Email Address
										</Label>
										<input
											id="email-input"
											type="email"
											className="w-full px-3 py-2 bg-black/30 border border-white/20 rounded text-white"
											placeholder="john@example.com"
										/>
									</div>
									<div className="space-y-2">
										<Label htmlFor="bio" className="text-white">
											Bio
										</Label>
										<textarea
											id="bio"
											className="w-full px-3 py-2 bg-black/30 border border-white/20 rounded text-white"
											placeholder="Tell us about yourself"
											rows={3}
										/>
									</div>
								</form>
							</div>
						</div>
					</div>
				</section>

				{/* Features */}
				<section className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10 mb-8">
					<h2 className="text-2xl font-semibold text-white mb-4">Features</h2>
					<ul className="space-y-3 text-gray-300">
						<li className="flex items-start gap-3">
							<span className="text-green-400">✓</span>
							<span>Fully accessible with proper ARIA attributes</span>
						</li>
						<li className="flex items-start gap-3">
							<span className="text-green-400">✓</span>
							<span>Works seamlessly with form inputs</span>
						</li>
						<li className="flex items-start gap-3">
							<span className="text-green-400">✓</span>
							<span>Supports peer-disabled styling</span>
						</li>
						<li className="flex items-start gap-3">
							<span className="text-green-400">✓</span>
							<span>Customizable with Tailwind classes</span>
						</li>
						<li className="flex items-start gap-3">
							<span className="text-green-400">✓</span>
							<span>Client-side rendering with "use client"</span>
						</li>
					</ul>
				</section>

				{/* Props */}
				<section className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
					<h2 className="text-2xl font-semibold text-white mb-4">Props</h2>
					<div className="overflow-x-auto">
						<table className="w-full text-sm text-left">
							<thead className="text-white border-b border-white/20">
								<tr>
									<th className="py-3 px-4">Prop</th>
									<th className="py-3 px-4">Type</th>
									<th className="py-3 px-4">Default</th>
									<th className="py-3 px-4">Description</th>
								</tr>
							</thead>
							<tbody className="text-gray-300">
								<tr className="border-b border-white/10">
									<td className="py-3 px-4 font-mono text-purple-400">
										htmlFor
									</td>
									<td className="py-3 px-4 font-mono text-xs">string</td>
									<td className="py-3 px-4 font-mono text-xs">-</td>
									<td className="py-3 px-4">ID of associated form element</td>
								</tr>
								<tr className="border-b border-white/10">
									<td className="py-3 px-4 font-mono text-purple-400">
										className
									</td>
									<td className="py-3 px-4 font-mono text-xs">string</td>
									<td className="py-3 px-4 font-mono text-xs">-</td>
									<td className="py-3 px-4">Additional CSS classes</td>
								</tr>
								<tr>
									<td className="py-3 px-4 font-mono text-purple-400">
										...props
									</td>
									<td className="py-3 px-4 font-mono text-xs">LabelProps</td>
									<td className="py-3 px-4 font-mono text-xs">-</td>
									<td className="py-3 px-4">All HTML label attributes</td>
								</tr>
							</tbody>
						</table>
					</div>
				</section>
			</div>
		</div>
	);
}
