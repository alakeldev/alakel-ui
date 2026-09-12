import type { Metadata } from "next";
import { NavbarDemo } from "./NavbarDemo";

export const metadata: Metadata = {
	title: "Navbar",
	description: "Interactive preview of the Alakel UI web navbar.",
};

export default function NavbarPage() {
	return (
		<div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
			<div className="mx-auto mb-10 max-w-3xl text-center">
				<p className="font-medium text-brand text-sm uppercase tracking-widest">
					Web package preview
				</p>
				<h1 className="mt-3 font-semibold text-4xl text-white tracking-tight sm:text-5xl">
					Navbar
				</h1>
				<p className="mt-4 text-base text-neutral-300 leading-7 sm:text-lg">
					A responsive navbar with configurable links, accessible dropdowns,
					optional actions, and a mobile drawer.
				</p>
			</div>

			<NavbarDemo />

			<div className="mx-auto mt-8 max-w-3xl rounded-xl border border-neutral-800 bg-neutral-950/80 p-5 text-left text-sm text-neutral-300 leading-6">
				<p>
					Try the dropdown with a mouse and keyboard. Use the controls and
					resize the browser to test each responsive mode, then change the props
					in <code className="text-brand">NavbarDemo.tsx</code> to experiment
					locally.
				</p>
			</div>
		</div>
	);
}
