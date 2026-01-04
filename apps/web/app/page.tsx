import { Button } from "@alakel-ui/ui";

export default function HomePage() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center">
			<div className="max-w-2xl mx-auto p-8 text-center space-y-8">
				<h1 className="text-6xl font-bold text-white mb-4 animate-pulse">
					Alakel UI 🚀
				</h1>
				<p className="text-xl text-gray-300 mb-8">
					Beautiful components with Tailwind CSS + CVA
				</p>
				<div className="flex flex-wrap gap-4 justify-center">
					<Button variant="default">Default</Button>
					<Button variant="secondary">Secondary</Button>
					<Button variant="destructive">Destructive</Button>
					<Button variant="outline">Outline</Button>
					<Button variant="ghost">Ghost</Button>
					<Button variant="link">Link</Button>
				</div>
				<div className="flex flex-wrap gap-4 justify-center">
					<Button size="sm">Small</Button>
					<Button size="default">Default</Button>
					<Button size="lg">Large</Button>
					<Button size="icon">→</Button>
				</div>
			</div>
		</div>
	);
}
