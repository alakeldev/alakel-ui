import path from "path";
import { fileURLToPath } from "url";

/** @type {import('next').NextConfig} */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nextConfig = {
	allowedDevOrigins: ["http://localhost:3001"],
	transpilePackages: [
		"@alakel-ui/button",
		"@alakel-ui/card",
		"@alakel-ui/label",
		"@alakel-ui/utils",
	],
	webpack(config) {
		config.resolve.alias = {
			...config.resolve.alias,
			"@alakel-ui/button": path.resolve(__dirname, "../../packages/button/src"),
			"@alakel-ui/card": path.resolve(__dirname, "../../packages/card/src"),
			"@alakel-ui/label": path.resolve(__dirname, "../../packages/label/src"),
			"@alakel-ui/utils": path.resolve(__dirname, "../../packages/utils/src"),
		};
		return config;
	},
};

export default nextConfig;
