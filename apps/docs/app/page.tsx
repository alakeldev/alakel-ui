import Link from "next/link";

const platforms = [
	{
		href: "/web",
		title: "Web",
		description: "Explore packages designed for browser applications.",
	},
	{
		href: "/react-native",
		title: "React Native",
		description: "Explore packages designed for React Native applications.",
	},
] as const;

export default function HomePage() {
	return (
		<div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
			<section className="max-w-3xl">
				<p className="font-medium text-slate-500 text-sm uppercase tracking-widest">
					Documentation
				</p>
				<h1 className="mt-4 font-semibold text-4xl text-slate-950 tracking-tight sm:text-6xl">
					Build with Alakel UI
				</h1>
				<p className="mt-6 text-lg text-slate-600 leading-8">
					Alakel UI provides independently maintained packages with focused
					APIs, documentation, and release lifecycles.
				</p>
			</section>

			<section aria-labelledby="platforms-heading" className="mt-16">
				<h2
					className="font-semibold text-2xl text-slate-950"
					id="platforms-heading"
				>
					Choose a platform
				</h2>
				<div className="mt-6 grid gap-4 md:grid-cols-2">
					{platforms.map((platform) => (
						<Link
							className="rounded-xl border border-slate-200 p-6 transition-colors hover:border-slate-400 hover:bg-slate-50"
							href={platform.href}
							key={platform.href}
						>
							<h3 className="font-semibold text-slate-950 text-xl">
								{platform.title}
							</h3>
							<p className="mt-2 text-slate-600 leading-7">
								{platform.description}
							</p>
						</Link>
					))}
				</div>
			</section>
		</div>
	);
}
