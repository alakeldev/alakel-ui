import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

export default function PrivacyPolicy() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-slate-900 flex flex-col">
			<Header active="privacy" />

			{/* Privacy Policy Content */}
			<main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
				<article className="bg-black rounded-lg p-8">
					<h1 className="text-4xl font-bold text-purple-400 mb-6 text-center">
						Privacy Policy
					</h1>
					<div className="text-purple-300 space-y-6">
						<p className="text-sm text-purple-400 text-center">
							Last updated: June 2025
						</p>

						<section>
							<h2 className="text-2xl font-semibold text-purple-400 mb-3">
								1. Introduction
							</h2>
							<p>
								Welcome to Alakel UI, a modern React component library. We
								respect your privacy and are committed to protecting your
								personal data. This privacy policy will inform you about how we
								handle your personal data.
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
								contact us through our{" "}
								<a
									href="https://github.com/alakeldev"
									target="_blank"
									rel="noopener noreferrer"
									className="text-white font-semibold underline decoration-purple-400 decoration-2 underline-offset-4 hover:decoration-purple-300 hover:text-purple-100 transition-all"
								>
									GitHub account
								</a>{" "}
								or{" "}
								<a
									href="https://www.alakel.eu"
									target="_blank"
									rel="noopener noreferrer"
									className="text-white font-semibold underline decoration-purple-400 decoration-2 underline-offset-4 hover:decoration-purple-300 hover:text-purple-100 transition-all"
								>
									my personal website
								</a>
								.
							</p>
						</section>
					</div>
				</article>
			</main>

			<Footer />
		</div>
	);
}
