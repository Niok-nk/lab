import * as THREE from 'three';

export function createSphereGeometry(radius: number, widthSegments: number, heightSegments: number): THREE.SphereGeometry {
    return new THREE.SphereGeometry(radius, widthSegments, heightSegments);
}