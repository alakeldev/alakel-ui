import Link from "next/link";

const navigation = [
	{ href: "/", label: "Home" },
	{ href: "/web", label: "Web" },
	{ href: "/react-native", label: "React Native" },
] as const;

export function MainHeader() {
	return (
		<header className="border-slate-200 border-b bg-white">
			<div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
				<Link className="font-semibold text-slate-950 text-xl" href="/">
					Alakel UI
				</Link>

				<nav aria-label="Main navigation">
					<ul className="flex items-center gap-5 text-sm">
						{navigation.map((item) => (
							<li key={item.href}>
								<Link
									className="font-medium text-slate-600 transition-colors hover:text-slate-950"
									href={item.href}
								>
									{item.label}
								</Link>
							</li>
						))}
					</ul>
				</nav>
			</div>
		</header>
	);
}
