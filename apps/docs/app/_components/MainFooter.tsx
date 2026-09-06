import Link from "next/link";

export function MainFooter() {
	return (
		<footer className="flex min-h-28 w-full items-center justify-center border-neutral-800 border-t bg-black sm:min-h-20 lg:min-h-24">
			<div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center gap-3 px-4 py-4 text-center text-neutral-400 text-xs sm:flex-row sm:justify-between sm:px-6 sm:text-left sm:text-sm lg:px-8 lg:text-base">
				<p>
					<Link
						className="font-medium text-brand transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
						href="/"
					>
						Alakel UI
					</Link>{" "}
					is available under the{" "}
					<a
						className="font-medium text-brand transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
						href="https://github.com/alakeldev/alakel-ui/blob/main/LICENSE"
						rel="noreferrer"
						target="_blank"
					>
						MIT License
					</a>
					.
				</p>
				<nav
					aria-label="Alakel UI links"
					className="flex items-center justify-center gap-2 sm:gap-3"
				>
					<a
						aria-label="View Alakel UI on GitHub"
						className="flex h-9 w-32 items-center justify-center gap-2 rounded-sm px-2 font-medium text-brand transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:h-10 sm:w-36 lg:h-11"
						href="https://github.com/alakeldev/alakel-ui"
						rel="noreferrer"
						target="_blank"
					>
						<svg
							aria-hidden="true"
							className="size-5 sm:size-6 lg:size-7"
							fill="currentColor"
							viewBox="0 0 24 24"
						>
							<path d="M12 .7a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2.24c-3.22.7-3.9-1.37-3.9-1.37-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.78 1.2 1.78 1.2 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.57-.29-5.27-1.29-5.27-5.69 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.16 1.18a10.9 10.9 0 0 1 5.76 0c2.19-1.49 3.16-1.18 3.16-1.18.63 1.59.23 2.76.11 3.05.74.8 1.19 1.83 1.19 3.09 0 4.41-2.71 5.39-5.29 5.68.42.36.79 1.06.79 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .7Z" />
						</svg>
						<span>GitHub</span>
					</a>
					<a
						className="flex h-9 w-32 items-center justify-center gap-2 rounded-sm px-2 font-medium text-brand transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:h-10 sm:w-36 lg:h-11"
						href="https://alakel.dev"
						rel="noreferrer"
						target="_blank"
					>
						<svg
							aria-hidden="true"
							className="size-5 sm:size-6 lg:size-7"
							fill="none"
							stroke="currentColor"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							viewBox="0 0 24 24"
						>
							<path d="M14 9a2 2 0 0 1-2 2H6l-4 4V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v4Z" />
							<path d="M18 9h2a2 2 0 0 1 2 2v10l-4-4h-6a2 2 0 0 1-2-2v-1" />
						</svg>
						<span>Contact Me</span>
					</a>
				</nav>
			</div>
		</footer>
	);
}
