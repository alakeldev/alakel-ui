import { Button } from "@syr-ui/button";
import Link from "next/link";

export default function ButtonDocsPage() {
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
					<div className="text-5xl mb-4">🔘</div>
					<h1 className="text-5xl font-bold text-white mb-4">Button</h1>
					<p className="text-xl text-gray-300 mb-2">
						Flexible button component with multiple variants and sizes
					</p>
					<code className="text-sm text-purple-400 bg-black/30 px-3 py-1 rounded">
						@syr-ui/button
					</code>
				</header>

				{/* Installation */}
				<section className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10 mb-8">
					<h2 className="text-2xl font-semibold text-white mb-4">
						Installation
					</h2>
					<div className="bg-black/50 rounded p-4 font-mono text-sm text-green-400">
						npm install @syr-ui/button
					</div>
				</section>

				{/* Usage */}
				<section className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10 mb-8">
					<h2 className="text-2xl font-semibold text-white mb-4">Usage</h2>
					<div className="bg-black/50 rounded p-4 font-mono text-sm text-green-400 mb-4">
						{`import { Button } from "@syr-ui/button";

export default function App() {
  return <Button>Click me</Button>;
}`}
					</div>
				</section>

				{/* Variants */}
				<section className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10 mb-8">
					<h2 className="text-2xl font-semibold text-white mb-4">Variants</h2>
					<p className="text-gray-300 mb-6">
						Button supports 6 different variants for different use cases
					</p>
					<div className="space-y-6">
						<div className="flex items-center gap-4">
							<Button variant="default">Default</Button>
							<code className="text-sm text-gray-400">variant="default"</code>
						</div>
						<div className="flex items-center gap-4">
							<Button variant="secondary">Secondary</Button>
							<code className="text-sm text-gray-400">variant="secondary"</code>
						</div>
						<div className="flex items-center gap-4">
							<Button variant="destructive">Destructive</Button>
							<code className="text-sm text-gray-400">
								variant="destructive"
							</code>
						</div>
						<div className="flex items-center gap-4">
							<Button variant="outline">Outline</Button>
							<code className="text-sm text-gray-400">variant="outline"</code>
						</div>
						<div className="flex items-center gap-4">
							<Button variant="ghost">Ghost</Button>
							<code className="text-sm text-gray-400">variant="ghost"</code>
						</div>
						<div className="flex items-center gap-4">
							<Button variant="link">Link</Button>
							<code className="text-sm text-gray-400">variant="link"</code>
						</div>
					</div>
				</section>

				{/* Sizes */}
				<section className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10 mb-8">
					<h2 className="text-2xl font-semibold text-white mb-4">Sizes</h2>
					<p className="text-gray-300 mb-6">
						Button supports 8 different sizes including icon-only variants
					</p>
					<div className="space-y-6">
						<div className="flex items-center gap-4">
							<Button size="xs">Extra Small</Button>
							<code className="text-sm text-gray-400">size="xs"</code>
						</div>
						<div className="flex items-center gap-4">
							<Button size="sm">Small</Button>
							<code className="text-sm text-gray-400">size="sm"</code>
						</div>
						<div className="flex items-center gap-4">
							<Button size="default">Default</Button>
							<code className="text-sm text-gray-400">size="default"</code>
						</div>
						<div className="flex items-center gap-4">
							<Button size="lg">Large</Button>
							<code className="text-sm text-gray-400">size="lg"</code>
						</div>
						<div className="flex items-center gap-4">
							<Button size="icon">→</Button>
							<code className="text-sm text-gray-400">size="icon"</code>
						</div>
						<div className="flex items-center gap-4">
							<Button size="icon-xs">→</Button>
							<code className="text-sm text-gray-400">size="icon-xs"</code>
						</div>
						<div className="flex items-center gap-4">
							<Button size="icon-sm">→</Button>
							<code className="text-sm text-gray-400">size="icon-sm"</code>
						</div>
						<div className="flex items-center gap-4">
							<Button size="icon-lg">→</Button>
							<code className="text-sm text-gray-400">size="icon-lg"</code>
						</div>
					</div>
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
										variant
									</td>
									<td className="py-3 px-4 font-mono text-xs">string</td>
									<td className="py-3 px-4 font-mono text-xs">"default"</td>
									<td className="py-3 px-4">Button style variant</td>
								</tr>
								<tr className="border-b border-white/10">
									<td className="py-3 px-4 font-mono text-purple-400">size</td>
									<td className="py-3 px-4 font-mono text-xs">string</td>
									<td className="py-3 px-4 font-mono text-xs">"default"</td>
									<td className="py-3 px-4">Button size</td>
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
									<td className="py-3 px-4 font-mono text-xs">ButtonProps</td>
									<td className="py-3 px-4 font-mono text-xs">-</td>
									<td className="py-3 px-4">All HTML button attributes</td>
								</tr>
							</tbody>
						</table>
					</div>
				</section>
			</div>
		</div>
	);
}
