import path from "path";
import { fileURLToPath } from "url";

/** @type {import('next').NextConfig} */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nextConfig = {
	allowedDevOrigins: ["http://localhost:3000", "http://192.168.178.24:3000"],
	transpilePackages: ["@alakel-ui/ui"],
	webpack(config) {
		config.resolve.alias["@alakel-ui/ui"] = path.resolve(
			__dirname,
			"../../packages/ui/src",
		);
		return config;
	},
};

export default nextConfig;
