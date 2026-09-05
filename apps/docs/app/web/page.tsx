import type { Metadata } from "next";
import { WebContent } from "../_components/web/WebContent";

export const metadata: Metadata = {
	title: "Web documentation",
	description: "Documentation for Alakel UI web packages.",
};

export default function WebDocumentationPage() {
	return <WebContent />;
}
