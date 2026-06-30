"use client";

import { useEffect } from "react";

interface ErrorPageProps {
	error: Error & { digest?: string };
	reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
	useEffect(() => {
		// Log to an error reporting service in production if needed.
		console.error(error);
	}, [error]);

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-slate-900 flex items-center justify-center px-4">
			<div className="bg-black border border-purple-900/40 rounded-2xl p-10 max-w-md w-full text-center space-y-6">
				<h1 className="text-3xl font-bold text-purple-400">
					Something went wrong
				</h1>
				<p className="text-gray-400 text-sm">
					An unexpected error occurred while rendering this page.
				</p>
				<button
					type="button"
					onClick={reset}
					className="inline-flex items-center justify-center rounded-full bg-purple-600 hover:bg-purple-500 text-white font-medium text-sm px-6 h-9 transition-colors"
				>
					Try again
				</button>
			</div>
		</div>
	);
}
