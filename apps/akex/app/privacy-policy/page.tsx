import Image from "next/image";
import Link from "next/link";

export default function PrivacyPolicy() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-slate-900 flex flex-col">
			{/* Navigation */}
			<nav className="border-b border-white/10 bg-black">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex items-center justify-between h-22">
						<Link href="/" className="hover:opacity-80 transition-opacity">
							<Image
								src="/images/logo.jpg"
								alt="AKEX Logo"
								width={100}
								height={100}
								className="rounded-lg"
							/>
						</Link>

						{/* Navigation Links */}
						<div className="flex items-center space-x-8">
							<Link
								href="/"
								className="text-lg text-purple-400 hover:text-gray-100 transition-colors font-medium"
							>
								Home
							</Link>
							<Link
								href="/privacy-policy"
								className="text-lg text-gray-100 font-semibold"
							>
								Privacy Policy
							</Link>
						</div>
					</div>
				</div>
			</nav>

			{/* Privacy Policy Content */}
			<main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
				<article className="bg-black rounded-lg p-8">
					<h1 className="text-4xl font-bold text-purple-400 mb-6 text-center">
						Privacy Policy
					</h1>
					<div className="text-purple-300 space-y-6">
						<p className="text-sm text-purple-400 text-center">
							Last updated: {new Date().toLocaleDateString()}
						</p>

						<section>
							<h2 className="text-2xl font-semibold text-purple-400 mb-3">
								1. Introduction
							</h2>
							<p>
								Welcome to AKEX. We respect your privacy and are committed to
								protecting your personal data. This privacy policy will inform
								you about how we handle your personal data.
							</p>
						</section>

						<section>
							<h2 className="text-2xl font-semibold text-purple-400 mb-3">
								2. Data We Collect
							</h2>
							<p>
								As a component library documentation site, we collect minimal
								data. We may collect usage statistics to improve our
								documentation and user experience.
							</p>
						</section>

						<section>
							<h2 className="text-2xl font-semibold text-purple-400 mb-3">
								3. How We Use Your Data
							</h2>
							<p>
								Any data collected is used solely to improve the quality and
								usability of our component library and documentation.
							</p>
						</section>

						<section>
							<h2 className="text-2xl font-semibold text-purple-400 mb-3">
								4. Contact Us
							</h2>
							<p>
								If you have any questions about this privacy policy, please
								contact us through our GitHub repository.
							</p>
						</section>
					</div>
				</article>
			</main>

			{/* Footer */}
			<footer className="border-t border-white/10 py-6 text-center text-sm text-gray-400 bg-black">
				<p>Built with 💜 using TypeScript, Next.js, React, and Tailwind CSS.</p>
				<div className="mt-4 flex justify-center">
					<a
						href="https://github.com/alakeldev"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="Visit AKEX on GitHub"
						className="text-purple-400 hover:text-purple-300 transition-colors"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="32"
							height="32"
							viewBox="0 0 24 24"
							fill="currentColor"
							className="w-8 h-8"
						>
							<title>GitHub</title>
							<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
						</svg>
					</a>
				</div>
			</footer>
		</div>
	);
}
