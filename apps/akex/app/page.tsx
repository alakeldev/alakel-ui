import Link from "next/link";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { components } from "./lib/components";

export default function Home() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-slate-900 flex flex-col">
			<Header active="home" />

			<main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{components.map((component) => (
						<Link
							key={component.name}
							href={component.href}
							className="group block bg-black border border-purple-900/30 rounded-xl p-6 text-center hover:border-purple-400 hover:bg-purple-900/60 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 ease-in-out"
						>
							<h2 className="text-2xl font-bold text-white mb-2">
								{component.name}
							</h2>
							<p className="text-gray-400 text-sm mb-4">
								{component.description}
							</p>
							<span className="text-purple-400 group-hover:text-white text-sm font-medium transition-colors">
								Click to view docs
							</span>
						</Link>
					))}
				</div>
			</main>

			<Footer />
		</div>
	);
}
