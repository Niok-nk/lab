import * as THREE from 'three';
import { planets } from './planets';
import { createSphereGeometry } from './geometries';
import { createPlanetMaterial } from './materials';

export function initScene(container: HTMLElement) {

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(0, 0, 10);

    const light = new THREE.PointLight(0xffffff, 200);
    light.position.set(0, 0, 0);
    scene.add(light);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
    scene.add(ambientLight);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);


    planets.forEach(planet => {
        const mesh = new THREE.Mesh(
            createSphereGeometry(planet.radius, 32, 32),
            createPlanetMaterial(planet.color)
        );
        scene.add(mesh);

    })




}
