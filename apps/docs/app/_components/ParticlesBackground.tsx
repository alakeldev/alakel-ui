"use client";

import type { Engine } from "@tsparticles/engine";
import { NextParticles, NextParticlesProvider } from "@tsparticles/nextjs";

async function initializeParticles(engine: Engine): Promise<void> {
	const [{ loadSlim }, { loadThemesPlugin }] = await Promise.all([
		import("@tsparticles/slim"),
		import("@tsparticles/plugin-themes"),
	]);

	await Promise.all([loadSlim(engine), loadThemesPlugin(engine)]);
}

export function ParticlesBackground() {
	return (
		<NextParticlesProvider init={initializeParticles}>
			<NextParticles
				id="tsparticles"
				options={{
					fullScreen: {
						enable: true,
						zIndex: 0,
					},
					particles: {
						number: {
							value: 70,
						},
						color: {
							value: "#e5e5e5",
						},
						links: {
							color: "#525252",
							distance: 150,
							enable: true,
							opacity: 0.3,
						},
						move: {
							enable: true,
							speed: 0.2,
						},
						opacity: {
							value: 1,
						},
						size: {
							value: {
								min: 1,
								max: 3,
							},
						},
					},
				}}
			/>
		</NextParticlesProvider>
	);
}
