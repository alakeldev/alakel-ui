"use client";

import {
	Navbar,
	type NavbarCollapseAt,
	type NavbarDisplayMode,
	type NavbarItem,
	type NavbarMotion,
} from "@alakel/navbar";
import { useState } from "react";

const plainLinks: readonly NavbarItem[] = [
	{ type: "link", label: "Home", href: "#home" },
	{ type: "link", label: "Features", href: "#features" },
	{ type: "link", label: "Solutions", href: "#solutions" },
	{ type: "link", label: "Pricing", href: "#pricing" },
	{ type: "link", label: "Resources", href: "#resources" },
	{ type: "link", label: "Company", href: "#company" },
	{ type: "link", label: "Blog", href: "#blog" },
	{ type: "link", label: "Contact", href: "#contact" },
];

const productsDropdown: NavbarItem = {
	type: "dropdown",
	label: "Products",
	items: [
		{
			type: "link",
			label: "Analytics",
			href: "#analytics",
			description: "Understand how your product is being used.",
		},
		{
			type: "link",
			label: "Automation",
			href: "#automation",
			description: "Turn repeated work into reliable workflows.",
		},
		{
			type: "link",
			label: "Collaboration",
			href: "#collaboration",
			description: "Keep your team aligned in one shared space.",
		},
	],
};

const linkCountOptions = [2, 4, 7, 8] as const;

const demoSections = [
	["features", "Features"],
	["solutions", "Solutions"],
	["pricing", "Pricing"],
	["resources", "Resources"],
	["company", "Company"],
	["blog", "Blog"],
	["contact", "Contact"],
	["analytics", "Analytics"],
	["automation", "Automation"],
	["collaboration", "Collaboration"],
	["get-started", "Get started"],
] as const;

function Toggle({
	label,
	checked,
	onChange,
}: {
	label: string;
	checked: boolean;
	onChange: (checked: boolean) => void;
}) {
	return (
		<label className="flex items-center gap-2 text-neutral-300 text-sm">
			<input
				checked={checked}
				className="size-4 accent-brand"
				onChange={(event) => onChange(event.target.checked)}
				type="checkbox"
			/>
			{label}
		</label>
	);
}

export function NavbarDemo() {
	const [linkCount, setLinkCount] =
		useState<(typeof linkCountOptions)[number]>(4);
	const [dropdown, setDropdown] = useState(true);
	const [motionPreset, setMotionPreset] = useState<NavbarMotion>("smooth");
	const [alignment, setAlignment] = useState<"left" | "center" | "right">(
		"right",
	);
	const [collapseAt, setCollapseAt] = useState<NavbarCollapseAt>("md");
	const [displayMode, setDisplayMode] =
		useState<NavbarDisplayMode>("responsive");
	const [mobileMenu, setMobileMenu] = useState(true);
	const [activeIndicator, setActiveIndicator] = useState(true);
	const [showAction, setShowAction] = useState(true);
	const [activeHref, setActiveHref] = useState("#home");

	const navigation = plainLinks
		.map((item, index) => (dropdown && index === 1 ? productsDropdown : item))
		.slice(0, linkCount);

	return (
		<>
			<div className="mb-6 grid gap-4 rounded-2xl border border-neutral-800 bg-neutral-950/90 p-5 sm:grid-cols-2 lg:grid-cols-5">
				<fieldset>
					<legend className="mb-2 font-medium text-neutral-300 text-sm">
						Navigation items
					</legend>
					<div className="flex flex-wrap gap-2">
						{linkCountOptions.map((count) => (
							<button
								className={`rounded-md border px-3 py-1.5 text-sm transition-colors ${
									linkCount === count
										? "border-brand bg-brand/20 text-white"
										: "border-neutral-700 text-neutral-400 hover:text-white"
								}`}
								key={count}
								onClick={() => setLinkCount(count)}
								type="button"
							>
								{count}
							</button>
						))}
					</div>
				</fieldset>

				<label className="grid gap-2 text-neutral-300 text-sm">
					Motion preset
					<select
						className="rounded-md border border-neutral-700 bg-black px-3 py-2 text-white"
						onChange={(event) =>
							setMotionPreset(event.target.value as NavbarMotion)
						}
						value={motionPreset}
					>
						<option value="none">None</option>
						<option value="subtle">Subtle</option>
						<option value="smooth">Smooth</option>
						<option value="spring">Spring</option>
					</select>
				</label>

				<label className="grid gap-2 text-neutral-300 text-sm">
					Desktop alignment
					<select
						className="rounded-md border border-neutral-700 bg-black px-3 py-2 text-white"
						onChange={(event) => {
							setAlignment(event.target.value as "left" | "center" | "right");
							setDisplayMode("desktop");
						}}
						value={alignment}
					>
						<option value="left">Left</option>
						<option value="center">Center</option>
						<option value="right">Right</option>
					</select>
				</label>

				<label className="grid gap-2 text-neutral-300 text-sm">
					Preview mode
					<select
						className="rounded-md border border-neutral-700 bg-black px-3 py-2 text-white"
						onChange={(event) =>
							setDisplayMode(event.target.value as NavbarDisplayMode)
						}
						value={displayMode}
					>
						<option value="responsive">Responsive</option>
						<option value="desktop">Force desktop</option>
						<option value="mobile">Force mobile</option>
					</select>
				</label>

				<label className="grid gap-2 text-neutral-300 text-sm">
					Mobile breakpoint
					<select
						className="rounded-md border border-neutral-700 bg-black px-3 py-2 text-white"
						onChange={(event) => {
							setCollapseAt(event.target.value as NavbarCollapseAt);
							setDisplayMode("responsive");
						}}
						value={collapseAt}
					>
						<option value="sm">Below 640px</option>
						<option value="md">Below 768px</option>
						<option value="lg">Below 1024px</option>
					</select>
				</label>

				<div className="flex flex-wrap gap-x-5 gap-y-3 sm:col-span-2 lg:col-span-5">
					<Toggle checked={dropdown} label="Dropdown" onChange={setDropdown} />
					<Toggle
						checked={mobileMenu}
						label="Mobile menu"
						onChange={setMobileMenu}
					/>
					<Toggle
						checked={activeIndicator}
						label="Active indicator"
						onChange={setActiveIndicator}
					/>
					<Toggle
						checked={showAction}
						label="Action"
						onChange={setShowAction}
					/>
				</div>
			</div>

			<div
				className="overflow-visible rounded-2xl border border-neutral-800 bg-neutral-950 shadow-2xl"
				id="home"
			>
				<Navbar
					action={
						showAction ? (
							<a
								className="inline-flex min-h-10 items-center rounded-lg bg-brand px-4 font-semibold text-sm text-white transition-opacity hover:opacity-90"
								href="#get-started"
							>
								Get started
							</a>
						) : undefined
					}
					activeHref={activeHref}
					alignment={alignment}
					brand={{
						content: "Acme",
						href: "/web/navbar",
						ariaLabel: "Acme home",
					}}
					collapseAt={collapseAt}
					displayMode={displayMode}
					items={navigation}
					key={motionPreset}
					mobileMenu={mobileMenu}
					motion={motionPreset}
					onNavigate={(item) => setActiveHref(item.href)}
					showActiveIndicator={activeIndicator}
				/>
				<div className="px-6 pt-16 text-center sm:px-10">
					<p className="text-neutral-500 text-sm uppercase tracking-[0.2em]">
						Interactive canvas
					</p>
					<h2 className="mt-3 font-semibold text-2xl text-white sm:text-3xl">
						Make the navigation yours
					</h2>
					<p className="mx-auto mt-3 max-w-xl text-neutral-400 leading-7">
						Use the controls to test link counts, dropdown behavior, layout,
						responsive collapse, and Motion presets before changing your package
						code.
					</p>
				</div>
				<div className="grid gap-4 px-6 py-12 sm:grid-cols-2 sm:px-10 lg:grid-cols-3">
					{demoSections.map(([id, title]) => (
						<section
							className="scroll-mt-24 rounded-xl border border-neutral-800 bg-black/60 p-5 text-left"
							id={id}
							key={id}
						>
							<h3 className="font-semibold text-lg text-white">{title}</h3>
							<p className="mt-2 text-neutral-400 text-sm leading-6">
								This section is a local navigation target for testing the
								Navbar.
							</p>
						</section>
					))}
				</div>
			</div>
		</>
	);
}
