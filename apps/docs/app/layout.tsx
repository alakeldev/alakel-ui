import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
	metadataBase: new URL("https://ui.alakel.dev"),
	title: {
		default: "Alakel UI",
		template: "%s | Alakel UI",
	},
	description: "Documentation for Alakel UI web and React Native packages.",
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
			<body>{children}</body>
		</html>
	);
}
