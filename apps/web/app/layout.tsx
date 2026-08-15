import type { Metadata, Viewport } from "next";
import type React from "react";
import "./globals.css";

export const metadata: Metadata = {
	metadataBase: new URL("https://ui.alakel.eu"),
	title: "Alakel UI - Docs & Playground",
	description:
		"Accessible, animated React UI components — independently published packages from the Alakel UI Turborepo monorepo.",
};

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}
