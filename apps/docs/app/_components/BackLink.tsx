import Link from "next/link";

interface BackLinkProps {
	href: string;
	label: string;
}

export function BackLink({ href, label }: BackLinkProps) {
	return (
		<Link
			className="mb-8 inline-flex min-h-10 items-center gap-2 rounded-lg border border-brand/70 px-4 py-2 font-medium text-sm text-white transition-colors hover:border-brand hover:bg-brand/15 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
			href={href}
		>
			<svg
				aria-hidden="true"
				className="size-4"
				fill="none"
				viewBox="0 0 24 24"
			>
				<path
					d="m15 18-6-6 6-6M9 12h10"
					stroke="currentColor"
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="1.8"
				/>
			</svg>
			{label}
		</Link>
	);
}
