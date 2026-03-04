import * as THREE from 'three';

export function createCubeMaterial(color:number) {
    return new THREE.MeshBasicMaterial({
        color,
        wireframe: true
    });
}