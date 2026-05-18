import "./globals.css";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<head>
				<title>AKEX - Docs & Playground</title>
			</head>
			<body>{children}</body>
		</html>
	);
}
