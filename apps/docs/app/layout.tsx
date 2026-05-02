import "./globals.css";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<head>
				<title>Alakel UI - Documentation</title>
			</head>
			<body>{children}</body>
		</html>
	);
}
