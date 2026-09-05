import type { Metadata } from "next";
import { ReactNativeContent } from "../_components/react-native/react-native-content";

export const metadata: Metadata = {
	title: "React Native documentation",
	description: "Documentation for Alakel UI React Native packages.",
};

export default function ReactNativeDocumentationPage() {
	return <ReactNativeContent />;
}
