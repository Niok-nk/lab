import * as THREE from 'three';
import { createCubeGeometry } from './geometries';
import { createCubeMaterial } from './materials';

export function initScene(container: HTMLElement) {
    //escena
    const scene = new THREE.Scene();

    //camara
    const camera = new THREE.PerspectiveCamera(
        75,
        container.clientWidth /
        container.clientHeight, 0.1, 1000);
    camera.position.z = 3;

    //renderizador
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setAnimationLoop(animate);
    container.appendChild(renderer.domElement);


    //geometria
    const geometry = createCubeGeometry();
    //material
    const material = createCubeMaterial(0x00ff00);
    //malla
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    //animacion
    function animate(time: number) {
        mesh.rotation.x += 0.01;
        mesh.rotation.y += 0.01;
        renderer.render(scene, camera);
    }
    renderer.setAnimationLoop(animate);
}