import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

/** @type {import('next').NextConfig} */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Auto-discover all packages
const packagesDir = path.resolve(__dirname, "../../packages");
const packages = fs.readdirSync(packagesDir).filter((dir) => {
	const packagePath = path.join(packagesDir, dir);
	return fs.statSync(packagePath).isDirectory();
});

// Generate transpile packages list
const transpilePackages = packages.map((pkg) => `@akex/${pkg}`);

// Generate webpack aliases
const packageAliases = packages.reduce((aliases, pkg) => {
	aliases[`@akex/${pkg}`] = path.resolve(
		__dirname,
		`../../packages/${pkg}/src`,
	);
	return aliases;
}, {});

const securityHeaders = [
	{ key: "X-Content-Type-Options", value: "nosniff" },
	{ key: "X-Frame-Options", value: "DENY" },
	{ key: "X-DNS-Prefetch-Control", value: "on" },
	{ key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
	{
		key: "Permissions-Policy",
		value: "camera=(), microphone=(), geolocation=()",
	},
];

const nextConfig = {
	allowedDevOrigins: ["http://localhost:3001"],
	transpilePackages,
	async headers() {
		return [{ source: "/(.*)", headers: securityHeaders }];
	},
	webpack(config) {
		config.resolve.alias = {
			...config.resolve.alias,
			...packageAliases,
		};
		return config;
	},
};

export default nextConfig;
