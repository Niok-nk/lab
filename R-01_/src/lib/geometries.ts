import * as THREE from 'three';

const width = 1;
const height = 1;
const depth = 1;

export function createCubeGeometry() {
    return new THREE.BoxGeometry(width, height, depth);
}