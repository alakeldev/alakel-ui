import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@alakel-ui/card";
import Link from "next/link";

const components = [
	{
		name: "Button",
		href: "/button",
		description: "Flexible button component with multiple variants and sizes",
		package: "@alakel-ui/button",
		icon: "🔘",
	},
	{
		name: "Card",
		href: "/card",
		description:
			"Flexible card container with header, content, and footer sections",
		package: "@alakel-ui/card",
		icon: "🃏",
	},
	{
		name: "Label",
		href: "/label",
		description: "Accessible label component for form inputs and elements",
		package: "@alakel-ui/label",
		icon: "🏷️",
	},
];

export default function DocsPage() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
			<div className="max-w-6xl mx-auto p-8">
				{/* Header */}
				<header className="text-center mb-16">
					<h1 className="text-6xl font-bold text-white mb-4 animate-pulse">
						Alakel UI 📚
					</h1>
					<p className="text-xl text-gray-300 mb-2">
						Component Documentation & Examples
					</p>
					<p className="text-sm text-gray-400">
						Beautiful, accessible components built with Tailwind CSS + CVA
					</p>
				</header>

				{/* Component Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{components.map((component) => (
						<Link key={component.href} href={component.href} className="group">
							<Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 h-full cursor-pointer">
								<CardHeader>
									<div className="text-5xl mb-3">{component.icon}</div>
									<CardTitle className="text-white text-2xl group-hover:text-purple-400 transition-colors">
										{component.name}
									</CardTitle>
									<CardDescription className="text-gray-400 text-xs font-mono">
										{component.package}
									</CardDescription>
								</CardHeader>
								<CardContent>
									<p className="text-gray-300 text-sm">
										{component.description}
									</p>
									<div className="mt-4 text-purple-400 text-sm font-medium group-hover:translate-x-2 transition-transform">
										View Documentation →
									</div>
								</CardContent>
							</Card>
						</Link>
					))}
				</div>

				{/* Footer */}
				<footer className="text-center mt-16 text-gray-400 text-sm">
					<p>Built with Next.js, Tailwind CSS, and TypeScript</p>
				</footer>
			</div>
		</div>
	);
}
