import { Button } from "@syr-ui/button";
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@syr-ui/card";
import Link from "next/link";

export default function CardDocsPage() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
			<div className="max-w-6xl mx-auto p-8">
				{/* Back Navigation */}
				<Link
					href="/"
					className="inline-flex items-center text-purple-400 hover:text-purple-300 mb-8"
				>
					← Back to Components
				</Link>

				{/* Header */}
				<header className="mb-12">
					<div className="text-5xl mb-4">🃏</div>
					<h1 className="text-5xl font-bold text-white mb-4">Card</h1>
					<p className="text-xl text-gray-300 mb-2">
						Flexible card container with header, content, and footer sections
					</p>
					<code className="text-sm text-purple-400 bg-black/30 px-3 py-1 rounded">
						@syr-ui/card
					</code>
				</header>

				{/* Installation */}
				<section className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10 mb-8">
					<h2 className="text-2xl font-semibold text-white mb-4">
						Installation
					</h2>
					<div className="bg-black/50 rounded p-4 font-mono text-sm text-green-400">
						npm install @syr-ui/card
					</div>
				</section>

				{/* Usage */}
				<section className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10 mb-8">
					<h2 className="text-2xl font-semibold text-white mb-4">Usage</h2>
					<div className="bg-black/50 rounded p-4 font-mono text-sm text-green-400 mb-4">
						{`import { Card, CardHeader, CardTitle, CardContent } from "@syr-ui/card";

export default function App() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Card content goes here</p>
      </CardContent>
    </Card>
  );
}`}
					</div>
				</section>

				{/* Basic Example */}
				<section className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10 mb-8">
					<h2 className="text-2xl font-semibold text-white mb-4">Basic Card</h2>
					<Card className="bg-white/10 max-w-md">
						<CardHeader>
							<CardTitle>Basic Card</CardTitle>
							<CardDescription>
								Simple card with header and content
							</CardDescription>
						</CardHeader>
						<CardContent>
							<p className="text-gray-300">
								This is a basic card example with a header and content section.
							</p>
						</CardContent>
					</Card>
				</section>

				{/* Card with Action */}
				<section className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10 mb-8">
					<h2 className="text-2xl font-semibold text-white mb-4">
						Card with Action
					</h2>
					<Card className="bg-white/10 max-w-md">
						<CardHeader>
							<CardTitle>Card with Action Button</CardTitle>
							<CardDescription>
								Header includes an action button
							</CardDescription>
							<CardAction>
								<Button size="icon-sm" variant="ghost">
									×
								</Button>
							</CardAction>
						</CardHeader>
						<CardContent>
							<p className="text-gray-300">
								The CardAction component can be used to place buttons or icons
								in the header.
							</p>
						</CardContent>
					</Card>
				</section>

				{/* Card with Footer */}
				<section className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10 mb-8">
					<h2 className="text-2xl font-semibold text-white mb-4">
						Card with Footer
					</h2>
					<Card className="bg-white/10 max-w-md">
						<CardHeader>
							<CardTitle>Confirmation Dialog</CardTitle>
							<CardDescription>
								Are you sure you want to proceed?
							</CardDescription>
						</CardHeader>
						<CardContent>
							<p className="text-gray-300">
								This action cannot be undone. Please confirm your choice.
							</p>
						</CardContent>
						<CardFooter>
							<Button variant="outline" size="sm">
								Cancel
							</Button>
							<Button size="sm">Confirm</Button>
						</CardFooter>
					</Card>
				</section>

				{/* Components */}
				<section className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
					<h2 className="text-2xl font-semibold text-white mb-4">
						Card Components
					</h2>
					<div className="space-y-4 text-gray-300">
						<div>
							<code className="text-purple-400 font-mono">Card</code>
							<p className="text-sm mt-1">Main container component</p>
						</div>
						<div>
							<code className="text-purple-400 font-mono">CardHeader</code>
							<p className="text-sm mt-1">
								Header section for title and description
							</p>
						</div>
						<div>
							<code className="text-purple-400 font-mono">CardTitle</code>
							<p className="text-sm mt-1">Main title text</p>
						</div>
						<div>
							<code className="text-purple-400 font-mono">CardDescription</code>
							<p className="text-sm mt-1">Supporting description text</p>
						</div>
						<div>
							<code className="text-purple-400 font-mono">CardAction</code>
							<p className="text-sm mt-1">Action button area in header</p>
						</div>
						<div>
							<code className="text-purple-400 font-mono">CardContent</code>
							<p className="text-sm mt-1">Main content area</p>
						</div>
						<div>
							<code className="text-purple-400 font-mono">CardFooter</code>
							<p className="text-sm mt-1">Footer section for actions</p>
						</div>
					</div>
				</section>
			</div>
		</div>
	);
}
