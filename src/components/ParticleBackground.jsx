import { useEffect, useRef } from "react";
import { tsParticles } from "@tsparticles/engine";
import { loadFull } from "tsparticles";

let initPromise = null;

export default function ParticleBackground() {
    const hostRef = useRef(null);
    const particleContainerRef = useRef(null);

    useEffect(() => {
        let mounted = true;

        const start = async () => {
            if (!initPromise) initPromise = loadFull(tsParticles);
            await initPromise;
            if (!mounted || !hostRef.current) return;

            particleContainerRef.current = await tsParticles.load({
                element: hostRef.current,
                options: {
                    background: { opacity: 0 },
                    fpsLimit: 60,
                    detectRetina: true,
                    particles: {
                        number: { value: 150, density: { enable: true, area: 800 } },
                        color: { value: ["#059669", "#a3e635", "#facc15"] },
                        opacity: { value: { min: 0.3, max: 0.8 } },
                        size: { value: { min: 5, max: 8 } },
                        links: {
                            enable: false,
                            distance: 150,
                            color: "#a3e635",
                            opacity: 0.35,
                            width: 1,
                        },
                        move: {
                            enable: true,
                            speed: 0.9,
                            outModes: { default: "bounce" },
                        },
                    },
                    interactivity: {
                        events: {
                            onHover: { enable: false },
                            onClick: { enable: false },
                        },
                    },
                },
            });
        };

        start();

        return () => {
            mounted = false;
            particleContainerRef.current?.destroy();
            particleContainerRef.current = null;
        };
    }, []);

    return (
        <div
            ref={hostRef}
            style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}
        />
    );
}
