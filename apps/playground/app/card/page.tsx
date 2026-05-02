"use client";

import { Button } from "@alakel-ui/button";
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@alakel-ui/card";
import { Label } from "@alakel-ui/label";
import Link from "next/link";
import { useState } from "react";

export default function CardPlaygroundPage() {
	const [count, setCount] = useState(0);

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
			<div className="max-w-7xl mx-auto p-8">
				{/* Back Navigation */}
				<Link
					href="/"
					className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-8"
				>
					← Back to Playground
				</Link>

				{/* Header */}
				<header className="mb-12">
					<div className="text-5xl mb-4">🃏</div>
					<h1 className="text-5xl font-bold text-white mb-4">
						Card Playground
					</h1>
					<p className="text-lg text-gray-300">
						Interactive card examples and demonstrations
					</p>
				</header>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
					{/* Basic Card */}
					<Card className="bg-white/10 border-white/20">
						<CardHeader>
							<CardTitle className="text-white">Basic Card</CardTitle>
							<CardDescription className="text-gray-300">
								Simple card with header and content
							</CardDescription>
						</CardHeader>
						<CardContent>
							<p className="text-gray-300">
								This is a basic card example. It contains a header with title
								and description, plus a content area for your main content.
							</p>
						</CardContent>
					</Card>

					{/* Card with Action */}
					<Card className="bg-white/10 border-white/20">
						<CardHeader>
							<CardTitle className="text-white">Card with Action</CardTitle>
							<CardDescription className="text-gray-300">
								Header includes action button
							</CardDescription>
							<CardAction>
								<Button size="icon-sm" variant="ghost">
									×
								</Button>
							</CardAction>
						</CardHeader>
						<CardContent>
							<p className="text-gray-300">
								This card demonstrates the CardAction component, which places a
								button or icon in the header area.
							</p>
						</CardContent>
					</Card>

					{/* Card with Footer */}
					<Card className="bg-white/10 border-white/20">
						<CardHeader>
							<CardTitle className="text-white">Card with Footer</CardTitle>
							<CardDescription className="text-gray-300">
								Includes footer with action buttons
							</CardDescription>
						</CardHeader>
						<CardContent>
							<p className="text-gray-300">
								This card includes a footer section with action buttons, perfect
								for forms or confirmation dialogs.
							</p>
						</CardContent>
						<CardFooter>
							<Button variant="outline" size="sm">
								Cancel
							</Button>
							<Button size="sm">Confirm</Button>
						</CardFooter>
					</Card>

					{/* Interactive Counter Card */}
					<Card className="bg-gradient-to-br from-green-500/20 to-teal-500/20 border-white/20">
						<CardHeader>
							<CardTitle className="text-white">Interactive Counter</CardTitle>
							<CardDescription className="text-gray-300">
								Fully functional card component
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="bg-black/30 rounded-lg p-8 text-center border border-white/10">
								<Label className="text-white text-lg mb-4 block">
									Current Count
								</Label>
								<div className="text-6xl font-bold text-white mb-6">
									{count}
								</div>
								<div className="flex gap-3 justify-center">
									<Button
										variant="destructive"
										onClick={() => setCount(count - 1)}
									>
										−
									</Button>
									<Button variant="secondary" onClick={() => setCount(0)}>
										Reset
									</Button>
									<Button variant="default" onClick={() => setCount(count + 1)}>
										+
									</Button>
								</div>
							</div>
						</CardContent>
						<CardFooter className="justify-between">
							<p className="text-sm text-gray-300">Count: {count}</p>
							<Button variant="ghost" size="sm" onClick={() => setCount(0)}>
								Clear
							</Button>
						</CardFooter>
					</Card>
				</div>

				{/* Form Card */}
				<Card className="bg-white/10 border-white/20 mt-8">
					<CardHeader>
						<CardTitle className="text-white">Form Card Example</CardTitle>
						<CardDescription className="text-gray-300">
							Card component with a complete form
						</CardDescription>
					</CardHeader>
					<CardContent>
						<form className="space-y-6">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div className="space-y-2">
									<Label className="text-white">First Name</Label>
									<input
										type="text"
										className="w-full px-3 py-2 bg-black/30 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
										placeholder="Enter first name"
									/>
								</div>
								<div className="space-y-2">
									<Label className="text-white">Last Name</Label>
									<input
										type="text"
										className="w-full px-3 py-2 bg-black/30 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
										placeholder="Enter last name"
									/>
								</div>
							</div>
							<div className="space-y-2">
								<Label className="text-white">Email Address</Label>
								<input
									type="email"
									className="w-full px-3 py-2 bg-black/30 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
									placeholder="you@example.com"
								/>
							</div>
							<div className="space-y-2">
								<Label className="text-white">Message</Label>
								<textarea
									className="w-full px-3 py-2 bg-black/30 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
									placeholder="Your message here..."
									rows={4}
								/>
							</div>
						</form>
					</CardContent>
					<CardFooter>
						<Button variant="outline" type="button">
							Cancel
						</Button>
						<Button variant="default" type="submit">
							Submit Form
						</Button>
					</CardFooter>
				</Card>

				{/* Code Examples */}
				<Card className="bg-white/10 border-white/20 mt-8">
					<CardHeader>
						<CardTitle className="text-white">Code Examples</CardTitle>
						<CardDescription className="text-gray-300">
							How to use the Card component
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-6">
						<div>
							<Label className="text-white mb-2 block">Basic Card</Label>
							<div className="bg-black/50 rounded border border-white/20 p-4">
								<code className="text-sm text-green-400">
									{`<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Content goes here</p>
  </CardContent>
</Card>`}
								</code>
							</div>
						</div>

						<div>
							<Label className="text-white mb-2 block">Card with Footer</Label>
							<div className="bg-black/50 rounded border border-white/20 p-4">
								<code className="text-sm text-green-400">
									{`<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Content</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>`}
								</code>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
