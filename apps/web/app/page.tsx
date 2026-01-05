import { Button, Label } from "@alakel-ui/ui";

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
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					{/* Labels section */}
					<section className="bg-white/5 rounded-lg p-6">
						<h2 className="text-lg font-semibold text-white mb-4">Labels</h2>
						<div className="space-y-4 text-left">
							<div>
								<Label className="">Default label</Label>
								<p className="text-sm text-gray-400">
									No extra props — base appearance.
								</p>
							</div>
							<div>
								<Label className="text-gray-400">Subtle label</Label>
								<p className="text-sm text-gray-400">
									Use <code className="px-1 rounded bg-white/5">className</code>{" "}
									to tone down.
								</p>
							</div>
							<div>
								<Label className="text-indigo-400">Accent label</Label>
								<p className="text-sm text-gray-400">
									Accent color via{" "}
									<code className="px-1 rounded bg-white/5">className</code>.
								</p>
							</div>
							<div>
								<Label className="text-sm">Small label (text-sm)</Label>
								<p className="text-sm text-gray-400">
									You can pass sizing classes too.
								</p>
							</div>
						</div>
					</section>

					{/* Buttons section */}
					<section className="bg-white/5 rounded-lg p-6">
						<h2 className="text-lg font-semibold text-white mb-4">Buttons</h2>
						<div className="flex flex-wrap gap-4 justify-center">
							<Button variant="default">Default</Button>
							<Button variant="secondary">Secondary</Button>
							<Button variant="destructive">Destructive</Button>
							<Button variant="outline">Outline</Button>
							<Button variant="ghost">Ghost</Button>
							<Button variant="link">Link</Button>
						</div>
						<div className="mt-6 flex flex-wrap gap-4 justify-center">
							<Button size="sm">Small</Button>
							<Button size="default">Default</Button>
							<Button size="lg">Large</Button>
							<Button size="icon">→</Button>
						</div>
					</section>
				</div>
			</div>
		</div>
	);
}
