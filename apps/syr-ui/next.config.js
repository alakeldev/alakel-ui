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
const transpilePackages = packages.map((pkg) => `@syr-ui/${pkg}`);

// Generate webpack aliases
const packageAliases = packages.reduce((aliases, pkg) => {
	aliases[`@syr-ui/${pkg}`] = path.resolve(
		__dirname,
		`../../packages/${pkg}/src`,
	);
	return aliases;
}, {});

const nextConfig = {
	allowedDevOrigins: ["http://localhost:3001"],
	transpilePackages,
	webpack(config) {
		config.resolve.alias = {
			...config.resolve.alias,
			...packageAliases,
		};
		return config;
	},
};

export default nextConfig;
