"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
	{ href: "/", label: "Home" },
	{ href: "/web", label: "Web" },
	{ href: "/react-native", label: "React Native" },
] as const;

export function MainHeader() {
	const pathname = usePathname();

	return (
		<header className="sticky top-0 z-50 border-neutral-800 border-b bg-black">
			<nav
				aria-label="Main navigation"
				className="mx-auto flex min-h-14 max-w-7xl items-center justify-center px-4 sm:min-h-16 sm:px-6 lg:min-h-20 lg:px-8"
			>
				<ul className="flex items-center justify-center gap-4 text-sm sm:gap-8 sm:text-base lg:gap-12 lg:text-lg">
					{navigation.map((item) => {
						const isActive =
							item.href === "/"
								? pathname === "/"
								: pathname === item.href ||
									pathname.startsWith(`${item.href}/`);

						return (
							<li key={item.href}>
								<Link
									aria-current={isActive ? "page" : undefined}
									className={`rounded-sm py-2 font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white ${
										isActive
											? "text-brand"
											: "text-neutral-400 hover:text-white"
									}`}
									href={item.href}
								>
									{item.label}
								</Link>
							</li>
						);
					})}
				</ul>
			</nav>
		</header>
	);
}
