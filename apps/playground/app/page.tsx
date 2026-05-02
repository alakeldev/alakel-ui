"use client";

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
		description:
			"Interactive button playground with variant and size customization",
		package: "@alakel-ui/button",
		icon: "🔘",
		color: "from-blue-500/20 to-purple-500/20",
	},
	{
		name: "Card",
		href: "/card",
		description: "Card component examples with interactive demonstrations",
		package: "@alakel-ui/card",
		icon: "🃏",
		color: "from-green-500/20 to-teal-500/20",
	},
	{
		name: "Label",
		href: "/label",
		description: "Label component with styling and accessibility features",
		package: "@alakel-ui/label",
		icon: "🏷️",
		color: "from-orange-500/20 to-red-500/20",
	},
];

export default function PlaygroundPage() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
			<div className="max-w-6xl mx-auto p-8">
				<header className="text-center mb-16">
					<h1 className="text-5xl font-bold text-white mb-4">
						🎮 Alakel UI Playground
					</h1>
					<p className="text-lg text-gray-300 mb-2">
						Interactive Component Playground
					</p>
					<p className="text-sm text-gray-400">
						Try out components in real-time with live customization
					</p>
				</header>

				{/* Component Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{components.map((component) => (
						<Link key={component.href} href={component.href} className="group">
							<Card
								className={`bg-gradient-to-br ${component.color} backdrop-blur-sm border-white/20 hover:border-white/40 transition-all duration-300 h-full cursor-pointer hover:scale-105 hover:shadow-2xl`}
							>
								<CardHeader>
									<div className="text-5xl mb-3 group-hover:scale-110 transition-transform">
										{component.icon}
									</div>
									<CardTitle className="text-white text-2xl group-hover:text-blue-300 transition-colors">
										{component.name}
									</CardTitle>
									<CardDescription className="text-gray-300 text-xs font-mono">
										{component.package}
									</CardDescription>
								</CardHeader>
								<CardContent>
									<p className="text-gray-200 text-sm mb-4">
										{component.description}
									</p>
									<div className="text-blue-300 text-sm font-medium group-hover:translate-x-2 transition-transform">
										Try it out →
									</div>
								</CardContent>
							</Card>
						</Link>
					))}
				</div>

				{/* Footer */}
				<footer className="text-center mt-16 text-gray-400 text-sm">
					<p>Interactive playground powered by React 19 and Next.js 16</p>
				</footer>
			</div>
		</div>
	);
}
