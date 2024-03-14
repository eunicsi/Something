import * as THREE from "three";
import { useEffect, useRef } from "react";
import BKG1_BACK from "../assets/bkg1_back.png";
import BKG1_FRONT from "../assets/bkg1_front.png";
import BKG1_TOP from "../assets/bkg1_top.png";
import BKG1_BOT from "../assets/bkg1_bot.png";
import BKG1_RIGHT from "../assets/bkg1_right.png";
import BKG1_LEFT from "../assets/bkg1_left.png";

export default function Background() {
	const refContainer = useRef(null);

	useEffect(() => {
		window.addEventListener("resize", () => {
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
			renderer.setSize(window.innerWidth, window.innerHeight);
		});

		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(
			45,
			window.innerWidth / window.innerHeight,
			1,
			2000,
		);
		const renderer = new THREE.WebGLRenderer({ antialias: true });
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.setPixelRatio(window.devicePixelRatio);

		refContainer.current &&
			refContainer.current.appendChild(renderer.domElement);

		scene.background = new THREE.CubeTextureLoader().load([
			BKG1_BACK,
			BKG1_FRONT,
			BKG1_TOP,
			BKG1_BOT,
			BKG1_RIGHT,
			BKG1_LEFT,
		]);

		const group = new THREE.Group();
		group.add(camera);

		// camera group
		scene.add(group);
		const step = (Math.PI * 2) / 15000;
		let rotationValue = 0;

		const animate = () => {
			requestAnimationFrame(animate);
			rotationValue = (rotationValue + step) % (Math.PI * 2);
			group.rotation.x = rotationValue;
			group.rotation.y = rotationValue;
			group.rotation.z = rotationValue;
			renderer.render(scene, camera);
		};

		animate();
	}, []);

	return <div ref={refContainer}></div>;
}
