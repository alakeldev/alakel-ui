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
import { useState } from "react";

export default function ButtonPlaygroundPage() {
	const [variant, setVariant] = useState<
		"default" | "secondary" | "destructive" | "outline" | "ghost" | "link"
	>("default");
	const [size, setSize] = useState<"xs" | "sm" | "default" | "lg">("default");

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
					<div className="text-5xl mb-4">🔘</div>
					<h1 className="text-5xl font-bold text-white mb-4">
						Button Playground
					</h1>
					<p className="text-lg text-gray-300">
						Interactive button customizer - Try different variants and sizes
					</p>
				</header>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
					{/* Controls */}
					<Card className="bg-white/10 border-white/20">
						<CardHeader>
							<CardTitle className="text-white">Customize</CardTitle>
							<CardDescription className="text-gray-300">
								Select variant and size options
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-6">
							{/* Variant Controls */}
							<div>
								<Label className="text-white mb-3 block">Variant</Label>
								<div className="flex flex-wrap gap-2">
									{(
										[
											"default",
											"secondary",
											"destructive",
											"outline",
											"ghost",
											"link",
										] as const
									).map((v) => (
										<Button
											key={v}
											size="sm"
											variant={variant === v ? "default" : "outline"}
											onClick={() => setVariant(v)}
										>
											{v}
										</Button>
									))}
								</div>
							</div>

							{/* Size Controls */}
							<div>
								<Label className="text-white mb-3 block">Size</Label>
								<div className="flex flex-wrap gap-2">
									{(["xs", "sm", "default", "lg"] as const).map((s) => (
										<Button
											key={s}
											size="sm"
											variant={size === s ? "default" : "outline"}
											onClick={() => setSize(s)}
										>
											{s}
										</Button>
									))}
								</div>
							</div>
						</CardContent>
					</Card>

					{/* Preview */}
					<Card className="bg-white/10 border-white/20">
						<CardHeader>
							<CardTitle className="text-white">Preview</CardTitle>
							<CardDescription className="text-gray-300">
								Live button preview
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="bg-black/30 rounded-lg p-12 flex items-center justify-center border border-white/10 mb-6">
								<Button variant={variant} size={size}>
									{variant.charAt(0).toUpperCase() + variant.slice(1)} Button
								</Button>
							</div>

							{/* Code Display */}
							<div>
								<Label className="text-white mb-2 block">Code</Label>
								<div className="bg-black/50 rounded border border-white/20 p-4">
									<code className="text-sm text-green-400">
										{`<Button\n  variant="${variant}"\n  size="${size}"\n>\n  Button Text\n</Button>`}
									</code>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>

				{/* All Variants Showcase */}
				<Card className="bg-white/10 border-white/20 mt-8">
					<CardHeader>
						<CardTitle className="text-white">All Variants</CardTitle>
						<CardDescription className="text-gray-300">
							Complete button variant showcase
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							<div className="space-y-3">
								<Label className="text-white block">Default</Label>
								<Button variant="default" className="w-full">
									Default Button
								</Button>
							</div>
							<div className="space-y-3">
								<Label className="text-white block">Secondary</Label>
								<Button variant="secondary" className="w-full">
									Secondary Button
								</Button>
							</div>
							<div className="space-y-3">
								<Label className="text-white block">Destructive</Label>
								<Button variant="destructive" className="w-full">
									Destructive Button
								</Button>
							</div>
							<div className="space-y-3">
								<Label className="text-white block">Outline</Label>
								<Button variant="outline" className="w-full">
									Outline Button
								</Button>
							</div>
							<div className="space-y-3">
								<Label className="text-white block">Ghost</Label>
								<Button variant="ghost" className="w-full">
									Ghost Button
								</Button>
							</div>
							<div className="space-y-3">
								<Label className="text-white block">Link</Label>
								<Button variant="link" className="w-full">
									Link Button
								</Button>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* All Sizes Showcase */}
				<Card className="bg-white/10 border-white/20 mt-8">
					<CardHeader>
						<CardTitle className="text-white">All Sizes</CardTitle>
						<CardDescription className="text-gray-300">
							Complete button size showcase
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="flex flex-wrap items-center gap-4">
							<Button size="xs">Extra Small</Button>
							<Button size="sm">Small</Button>
							<Button size="default">Default</Button>
							<Button size="lg">Large</Button>
							<Button size="icon">→</Button>
							<Button size="icon-xs">→</Button>
							<Button size="icon-sm">→</Button>
							<Button size="icon-lg">→</Button>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
