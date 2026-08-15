import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
	metadataBase: new URL("https://ui.alakel.eu"),
	title: "Alakel UI",
	description: "Alakel UI web application.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}
