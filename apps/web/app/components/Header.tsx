import Link from "next/link";

const ACTIVE_CLASS = "text-lg text-gray-100 font-semibold";
const INACTIVE_CLASS =
	"text-lg text-purple-400 hover:text-gray-100 transition-colors font-medium";

export interface HeaderProps {
	/** Which nav link to highlight as the current page. */
	active?: "home" | "privacy";
}

export function Header({ active = "home" }: HeaderProps) {
	return (
		<nav
			aria-label="Main navigation"
			className="border-b border-white/10 bg-black"
		>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-22">
					<Link
						href="/"
						aria-label="Alakel UI home"
						className="text-2xl font-bold text-white hover:text-purple-300 transition-colors"
					>
						Alakel UI
					</Link>

					<div className="flex items-center space-x-8">
						<Link
							href="/"
							className={active === "home" ? ACTIVE_CLASS : INACTIVE_CLASS}
						>
							Home
						</Link>
						<Link
							href="/privacy-policy"
							className={active === "privacy" ? ACTIVE_CLASS : INACTIVE_CLASS}
						>
							Privacy Policy
						</Link>
					</div>
				</div>
			</div>
		</nav>
	);
}
