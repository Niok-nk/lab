import * as THREE from 'three';

const radius = 1;
const width = 5;
const height = 5;

export function createSphereGeometry(radius: number) {
    return new THREE.SphereGeometry(radius, width, height);
}