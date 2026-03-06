import * as THREE from 'three';

export function createPlanetMaterial(color: number) {
    return new THREE.MeshStandardMaterial({ color });
}