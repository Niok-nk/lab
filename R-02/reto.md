# R-02: El Sistema Solar Mínimo

**Concepto JS/TS**: Arrays, loops (`for`, `.forEach`), interfaces TypeScript  
**Stack**: Astro + TypeScript + Three.js  

---

## Objetivo

Reemplazar el cubo solitario por **tres planetas** (esferas) con materiales sólidos iluminados, generados desde un array de datos. Cada planeta tendrá tamaño, color y posición distintos.

---

## Laboratorio Técnico

Al terminar, el navegador debe mostrar **tres esferas de colores distintos** iluminadas por una luz puntual, rotando cada una sobre su propio eje. No hardcodees tres meshes — genéralos con un **loop sobre un array**.

---

## Estructura de Archivos

```
R-02_/
├── src/
│   ├── lib/
│   │   ├── scene.ts        ← initScene() con luz y múltiples meshes
│   │   ├── geometries.ts   ← createSphereGeometry(radius)
│   │   ├── materials.ts    ← createPlanetMaterial(color)
│   │   └── planets.ts      ← datos de los planetas (array + interface)
│   ├── components/
│   │   └── SolarScene.astro
│   └── pages/
│       └── index.astro
```

---

## Requerimientos por Archivo

### `src/lib/planets.ts`
Define una **interfaz TypeScript** y exporta el array de datos:

```ts
interface Planet {
  name: string;
  radius: number;
  color: number;
  positionX: number;
}

export const planets: Planet[] = [ ... ] // 3 planetas
```

### `src/lib/geometries.ts`
- Modifica `createSphereGeometry(radius: number)` → retorna `THREE.SphereGeometry`

### `src/lib/materials.ts`
- Cambia a `THREE.MeshStandardMaterial` (necesita luz para verse)
- `createPlanetMaterial(color: number)` → retorna el material

### `src/lib/scene.ts`
- Agrega una `THREE.PointLight` a la escena
- Itera el array `planets` con `.forEach()` para crear y posicionar cada mesh
- Guarda los meshes en un array y rótalos en el loop `animate()`

### `src/components/SolarScene.astro`
- Mismo patrón que `CubeScene.astro`

---

## Concepto Clave: Por Qué un Array

```ts
// ❌ Sin array: copias y pegas 3 veces, no escala
const mesh1 = new THREE.Mesh(geo1, mat1);
const mesh2 = new THREE.Mesh(geo2, mat2);
const mesh3 = new THREE.Mesh(geo3, mat3);

// ✅ Con array: el loop hace el trabajo, escala a N planetas
const meshes: THREE.Mesh[] = [];
planets.forEach(planet => {
  const mesh = new THREE.Mesh(
    createSphereGeometry(planet.radius),
    createPlanetMaterial(planet.color)
  );
  mesh.position.x = planet.positionX;
  meshes.push(mesh);
  scene.add(mesh);
});
```

---

## Por Qué `MeshStandardMaterial` Necesita Luz

`MeshBasicMaterial` ignora la iluminación — siempre se ve igual.  
`MeshStandardMaterial` simula física real: sin luz, el objeto es negro.

```ts
// Agrega esto en scene.ts antes de renderizar
const light = new THREE.PointLight(0xffffff, 100);
light.position.set(0, 5, 5);
scene.add(light);
```

---

## Criterios de Evaluación

| Criterio | ¿Cumplido? |
|---|---|
| `planets.ts` define una interface TypeScript | ⬜ |
| Los meshes se crean con `.forEach()`, no hardcodeados | ⬜ |
| Se usa `MeshStandardMaterial` con luz visible | ⬜ |
| Cada esfera tiene posición X diferente | ⬜ |
| Los meshes rotan en el loop de animación | ⬜ |
