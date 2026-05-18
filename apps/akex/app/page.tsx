import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@akex/card";
import Link from "next/link";

const components = [
	{
		name: "Button",
		href: "/button",
		description:
			"Interactive button component with multiple variants, sizes, and playground",
		package: "@akex/button",
		icon: "🔘",
		color: "from-blue-500/20 to-purple-500/20",
	},
	{
		name: "Card",
		href: "/card",
		description:
			"Flexible card container with documentation and interactive demos",
		package: "@akex/card",
		icon: "🃏",
		color: "from-green-500/20 to-teal-500/20",
	},
	{
		name: "Label",
		href: "/label",
		description: "Accessible label component with examples and playground",
		package: "@akex/label",
		icon: "🏷️",
		color: "from-orange-500/20 to-red-500/20",
	},
];

export default function DocsPage() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-slate-900">
			<div className="max-w-6xl mx-auto p-8">
				{/* Header */}
				<header className="text-center mb-16">
					<h1 className="text-6xl font-bold text-white mb-4 animate-pulse">
						AKEX 📚🎮
					</h1>
					<p className="text-xl text-gray-300 mb-2">
						Component Documentation & Interactive Playground
					</p>
					<p className="text-sm text-gray-400">
						Beautiful, accessible components built with Tailwind CSS + CVA
					</p>
				</header>

				{/* Component Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{components.map((component) => (
						<Link key={component.href} href={component.href} className="group">
							<Card
								className={`bg-gradient-to-br ${component.color} backdrop-blur-sm border-white/10 hover:border-white/30 transition-all duration-300 h-full cursor-pointer hover:scale-105`}
							>
								<CardHeader>
									<div className="text-5xl mb-3">{component.icon}</div>
									<CardTitle className="text-white text-2xl group-hover:text-purple-300 transition-colors">
										{component.name}
									</CardTitle>
									<CardDescription className="text-gray-300 text-xs font-mono">
										{component.package}
									</CardDescription>
								</CardHeader>
								<CardContent>
									<p className="text-gray-200 text-sm">
										{component.description}
									</p>
									<div className="mt-4 text-purple-300 text-sm font-medium group-hover:translate-x-2 transition-transform">
										Explore Component →
									</div>
								</CardContent>
							</Card>
						</Link>
					))}
				</div>

				{/* Footer */}
				<footer className="text-center mt-16 text-gray-400 text-sm">
					<p>Built with Next.js, Tailwind CSS, and TypeScript</p>
					<p className="mt-2 text-xs">
						📚 Documentation + 🎮 Interactive Playground in One Place
					</p>
				</footer>
			</div>
		</div>
	);
}
