import type { Metadata } from "next";
import { ReactNativeContent } from "../_components/react-native/ReactNativeContent";

export const metadata: Metadata = {
	title: "React Native documentation",
	description: "Documentation for Alakel UI React Native packages.",
};

export default function ReactNativeDocumentationPage() {
	return <ReactNativeContent />;
}
