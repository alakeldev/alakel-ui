import "./global.css";
import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import type { ReactNode } from "react";
import { MainFooter } from "./_components/MainFooter";
import { MainHeader } from "./_components/MainHeader";
import { ParticlesBackground } from "./_components/ParticlesBackground";

const spaceGrotesk = Space_Grotesk({
	display: "swap",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	metadataBase: new URL("https://ui.alakel.dev"),
	title: {
		default: "Alakel UI",
		template: "%s | Alakel UI",
	},
	description:
		"Design-led, animated interface sections for Web and React Native.",
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
			<body
				className={`${spaceGrotesk.className} bg-black text-white antialiased`}
			>
				<ParticlesBackground />
				<div className="relative z-10 flex min-h-screen flex-col">
					<MainHeader />
					<main className="flex flex-1">{children}</main>
					<MainFooter />
				</div>
			</body>
		</html>
	);
}
