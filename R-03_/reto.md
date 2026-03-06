# R-03: El Click que Cambia el Mundo

**Concepto JS/TS**: Eventos (`addEventListener`), condicionales (`if/else`), estado con `let`  
**Stack**: Astro + TypeScript + Three.js  

---

## Objetivo

Agregar **interactividad al click** sobre los planetas: cuando el usuario haga clic sobre un planeta, este debe cambiar de color y escalar hacia arriba. Un segundo clic lo devuelve a su estado original.

---

## Laboratorio Técnico

Al terminar, el usuario puede hacer clic en cualquiera de los 3 planetas y verá un cambio visual inmediato. Los planetas que no fueron clickeados no se alteran.

---

## Estructura de Archivos

```
R-03_/
├── src/
│   ├── lib/
│   │   ├── scene.ts        ← initScene() con Raycaster + eventos
│   │   ├── geometries.ts   ← createSphereGeometry(radius)
│   │   ├── materials.ts    ← createPlanetMaterial(color)
│   │   └── planets.ts      ← interface Planet + array de datos
│   ├── components/
│   │   └── SolarScene.astro
│   └── pages/
│       └── index.astro
```

---

## Nuevo Módulo: El `Raycaster`

Three.js incluye un `Raycaster` — lanza un rayo invisible desde la cámara hacia donde el usuario hizo clic y detecta qué objetos intersecta.

```ts
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

window.addEventListener('click', (event) => {
    // Convertir coordenadas del mouse a espacio normalizado (-1 a 1)
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(pointer, camera);
    const intersects = raycaster.intersectObjects(meshes);

    if (intersects.length > 0) {
        // El primer objeto intersectado es intersects[0].object
        const clicked = intersects[0].object as THREE.Mesh;
        // aquí cambias el material o escala
    }
});
```

---

## Requerimientos

### Estado por planeta
Cada mesh necesita recordar si está "activo" o no. Usa un `Map` o un array paralelo de booleanos:

```ts
const activeState = new Map<THREE.Mesh, boolean>();
meshes.forEach(mesh => activeState.set(mesh, false));
```

### Al hacer click en un planeta:
- Si estaba inactivo → escala a `1.5`, color a `0xffffff`
- Si estaba activo → escala a `1.0`, color original del planeta

### Condicional que debes implementar:
```ts
const isActive = activeState.get(clicked);
if (isActive) {
    // revertir
} else {
    // activar
}
activeState.set(clicked, !isActive);
```

---

## Concepto Clave: Estado con `Map`

Un `Map` es como una tabla de dos columnas — clave y valor:

```ts
const activeState = new Map<THREE.Mesh, boolean>();
// clave: el mesh        valor: true/false

activeState.set(mesh, false);    // guarda
activeState.get(mesh);           // lee
activeState.set(mesh, !valor);   // actualiza
```

La ventaja sobre un array normal: puedes usar **objetos** como clave, no solo índices numéricos.

---

## Criterios de Evaluación

| Criterio | ¿Cumplido? |
|---|---|
| `Raycaster` detecta el click sobre el planeta correcto | ⬜ |
| El estado activo/inactivo se guarda correctamente | ⬜ |
| El color cambia al hacer click | ⬜ |
| La escala cambia al hacer click | ⬜ |
| Un segundo click revierte el estado original | ⬜ |
