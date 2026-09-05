import "./global.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { MainFooter } from "./_components/MainFooter";
import { MainHeader } from "./_components/MainHeader";

export const metadata: Metadata = {
	metadataBase: new URL("https://ui.alakel.dev"),
	title: {
		default: "Alakel UI",
		template: "%s | Alakel UI",
	},
	description: "Documentation for Alakel UI packages.",
	icons: {
		icon: [
			{ url: "/favicon.ico" },
			{ url: "/favicon.png", sizes: "512x512", type: "image/png" },
		],
		apple: [{ url: "/favicon.png", sizes: "512x512", type: "image/png" }],
	},
};

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="en">
			<body className="flex min-h-screen flex-col bg-white text-slate-950 antialiased">
				<MainHeader />
				<main className="flex flex-1">{children}</main>
				<MainFooter />
			</body>
		</html>
	);
}
