import * as THREE from 'three';
import { planets } from './planets';
import { createSphereGeometry } from './geometries';
import { createPlanetMaterial } from './materials';

export function initScene(container: HTMLElement) {


    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 50;


    const light = new THREE.PointLight(0xffffff, 100);
    light.position.set(0, 5, 5);
    scene.add(light);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
    scene.add(ambientLight);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    /**
     * planets          // el array — la lista de 3 objetos
     * .forEach(      // "para cada elemento de la lista, haz esto:"
     * planet =>    // nombre temporal que le doy a CADA elemento mientras  lo proceso
     * {            // aquí empieza lo que hago con ese elemento
     * ...
     * }            // aquí termina
     * );             // cierra el forEach 
     */

    const meshes: THREE.Mesh[] = [];
    planets.forEach(planet => {
        const geometry = createSphereGeometry(planet.radius);
        const material = createPlanetMaterial(planet.color);
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.x = planet.positionX;
        meshes.push(mesh);
        scene.add(mesh);
    });

    function animate(time: number) {
        meshes.forEach((mesh, index) => {
            const offset = (index / meshes.length) * Math.PI * 2; // 0°, 120°, 240°
            mesh.position.x = Math.sin(time * 0.001 + offset) * 5;
            mesh.position.y = Math.cos(time * 0.001 + offset) * 5;
        });
        renderer.render(scene, camera);
    }
    renderer.setAnimationLoop(animate);

}