"use client";

import { Button } from "@alakel-ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@alakel-ui/card";
import { Label } from "@alakel-ui/label";
import Link from "next/link";

export default function LabelPlaygroundPage() {
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
					<div className="text-5xl mb-4">🏷️</div>
					<h1 className="text-5xl font-bold text-white mb-4">
						Label Playground
					</h1>
					<p className="text-lg text-gray-300">
						Interactive label examples and form demonstrations
					</p>
				</header>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
					{/* Basic Labels */}
					<Card className="bg-white/10 border-white/20">
						<CardHeader>
							<CardTitle className="text-white">Basic Labels</CardTitle>
							<CardDescription className="text-gray-300">
								Default label styling
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div>
								<Label className="text-white">Default Label</Label>
								<p className="text-sm text-gray-400 mt-1">
									Standard label style
								</p>
							</div>
							<div>
								<Label className="text-white text-lg">Large Label</Label>
								<p className="text-sm text-gray-400 mt-1">
									Increased text size
								</p>
							</div>
							<div>
								<Label className="text-white text-sm">Small Label</Label>
								<p className="text-sm text-gray-400 mt-1">
									Decreased text size
								</p>
							</div>
						</CardContent>
					</Card>

					{/* Colored Labels */}
					<Card className="bg-white/10 border-white/20">
						<CardHeader>
							<CardTitle className="text-white">Colored Labels</CardTitle>
							<CardDescription className="text-gray-300">
								Custom color variations
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div>
								<Label className="text-blue-400">Blue Label</Label>
								<p className="text-sm text-gray-400 mt-1">
									Informational style
								</p>
							</div>
							<div>
								<Label className="text-green-400">Green Label</Label>
								<p className="text-sm text-gray-400 mt-1">Success style</p>
							</div>
							<div>
								<Label className="text-yellow-400">Yellow Label</Label>
								<p className="text-sm text-gray-400 mt-1">Warning style</p>
							</div>
							<div>
								<Label className="text-red-400">Red Label</Label>
								<p className="text-sm text-gray-400 mt-1">Error style</p>
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Form Example */}
				<Card className="bg-white/10 border-white/20 mt-8">
					<CardHeader>
						<CardTitle className="text-white">Form Example</CardTitle>
						<CardDescription className="text-gray-300">
							Labels working with form inputs
						</CardDescription>
					</CardHeader>
					<CardContent>
						<form className="space-y-6">
							<div className="space-y-2">
								<Label htmlFor="username" className="text-white">
									Username
								</Label>
								<input
									id="username"
									type="text"
									className="w-full px-3 py-2 bg-black/30 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
									placeholder="Enter your username"
								/>
								<p className="text-xs text-gray-400">
									Choose a unique username
								</p>
							</div>

							<div className="space-y-2">
								<Label htmlFor="email" className="text-white">
									Email Address
								</Label>
								<input
									id="email"
									type="email"
									className="w-full px-3 py-2 bg-black/30 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
									placeholder="you@example.com"
								/>
								<p className="text-xs text-gray-400">
									We'll never share your email
								</p>
							</div>

							<div className="space-y-2">
								<Label htmlFor="password" className="text-white">
									Password
								</Label>
								<input
									id="password"
									type="password"
									className="w-full px-3 py-2 bg-black/30 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
									placeholder="••••••••"
								/>
								<p className="text-xs text-gray-400">Minimum 8 characters</p>
							</div>

							<div className="space-y-2">
								<Label htmlFor="bio" className="text-white">
									Bio
								</Label>
								<textarea
									id="bio"
									className="w-full px-3 py-2 bg-black/30 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
									placeholder="Tell us about yourself..."
									rows={4}
								/>
								<p className="text-xs text-gray-400">
									Brief description for your profile
								</p>
							</div>

							<div className="flex items-center gap-2">
								<input
									id="terms"
									type="checkbox"
									className="w-4 h-4 rounded border-white/20 bg-black/30 text-blue-500 focus:ring-2 focus:ring-blue-500"
								/>
								<Label htmlFor="terms" className="text-white">
									I agree to the terms and conditions
								</Label>
							</div>

							<div className="flex gap-3">
								<Button variant="outline" type="button">
									Cancel
								</Button>
								<Button variant="default" type="submit">
									Submit
								</Button>
							</div>
						</form>
					</CardContent>
				</Card>

				{/* Accessibility Example */}
				<Card className="bg-white/10 border-white/20 mt-8">
					<CardHeader>
						<CardTitle className="text-white">Accessibility Features</CardTitle>
						<CardDescription className="text-gray-300">
							Labels improve form accessibility
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4 text-gray-300">
						<div className="flex items-start gap-3">
							<span className="text-green-400 text-xl">✓</span>
							<div>
								<p className="font-medium text-white">Proper Association</p>
								<p className="text-sm">
									Labels are associated with inputs via htmlFor/id attributes
								</p>
							</div>
						</div>
						<div className="flex items-start gap-3">
							<span className="text-green-400 text-xl">✓</span>
							<div>
								<p className="font-medium text-white">Screen Reader Support</p>
								<p className="text-sm">
									Screen readers announce label text when input is focused
								</p>
							</div>
						</div>
						<div className="flex items-start gap-3">
							<span className="text-green-400 text-xl">✓</span>
							<div>
								<p className="font-medium text-white">Clickable Area</p>
								<p className="text-sm">
									Clicking the label focuses the associated input
								</p>
							</div>
						</div>
						<div className="flex items-start gap-3">
							<span className="text-green-400 text-xl">✓</span>
							<div>
								<p className="font-medium text-white">Keyboard Navigation</p>
								<p className="text-sm">
									Works seamlessly with keyboard-only navigation
								</p>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Code Example */}
				<Card className="bg-white/10 border-white/20 mt-8">
					<CardHeader>
						<CardTitle className="text-white">Code Example</CardTitle>
						<CardDescription className="text-gray-300">
							How to use the Label component
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="bg-black/50 rounded border border-white/20 p-4">
							<code className="text-sm text-green-400 whitespace-pre">
								{`<div className="space-y-2">
  <Label htmlFor="email" className="text-white">
    Email Address
  </Label>
  <input
    id="email"
    type="email"
    className="..."
    placeholder="you@example.com"
  />
</div>`}
							</code>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
