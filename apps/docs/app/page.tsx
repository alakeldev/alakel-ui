import Link from "next/link";

const platforms = [
	{
		href: "/web",
		title: "Web",
		description:
			"Explore a growing collection of responsive interface experiences with distinctive design and polished motion.",
	},
	{
		href: "/react-native",
		title: "React Native",
		description:
			"Explore a growing collection of native interface experiences shaped by thoughtful interaction and motion.",
	},
] as const;

export default function HomePage() {
	return (
		<div className="mx-auto flex w-full max-w-6xl flex-1 items-center px-4 py-12 text-center sm:px-6 sm:py-20 lg:px-8 lg:py-28">
			<div className="w-full">
				<section className="mx-auto max-w-3xl lg:max-w-5xl">
					<h1 className="font-semibold text-4xl text-brand tracking-tight sm:text-6xl lg:whitespace-nowrap lg:text-6xl">
						Build distinctive interfaces
					</h1>
					<p className="mx-auto mt-5 max-w-3xl text-base text-neutral-300 leading-7 sm:mt-6 sm:text-lg sm:leading-8 lg:text-xl">
						Alakel UI is a design-led framework of responsive, animated sections
						for creating polished Web and React Native experiences.
					</p>
				</section>

				<section
					aria-labelledby="platforms-heading"
					className="mt-12 sm:mt-16 lg:mt-20"
				>
					<h2
						className="font-semibold text-white text-xl sm:text-2xl lg:text-3xl"
						id="platforms-heading"
					>
						Choose a platform
					</h2>
					<div className="mt-5 grid gap-4 sm:mt-6 sm:gap-6 md:grid-cols-2">
						{platforms.map((platform) => (
							<Link
								className="rounded-xl border border-brand bg-neutral-950/80 p-5 transition-colors hover:bg-brand/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:p-6 lg:p-8"
								href={platform.href}
								key={platform.href}
							>
								<h3 className="font-semibold text-lg text-white sm:text-xl lg:text-2xl">
									{platform.title}
								</h3>
								<p className="mt-2 text-neutral-300 text-sm leading-6 sm:text-base sm:leading-7 lg:text-lg">
									{platform.description}
								</p>
							</Link>
						))}
					</div>
				</section>
			</div>
		</div>
	);
}
