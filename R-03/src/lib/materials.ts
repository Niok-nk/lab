import * as THREE from 'three';

export function createPlanetMaterial(color: number): THREE.MeshBasicMaterial {
    return new THREE.MeshBasicMaterial({ color });
}