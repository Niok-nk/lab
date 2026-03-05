# R-01: La Escena Fundacional

**Concepto JS/TS**: Variables, const/let, imports ES Modules, estructura modular  
**Stack**: Astro + TypeScript + Three.js  

---

## Objetivo

Montar un **proyecto Astro desde cero** con una escena Three.js básica organizada de forma **modular**: cada responsabilidad en su propio archivo.

---

## Laboratorio Técnico

Al terminar, el navegador debe mostrar un **cubo 3D rotando** en el centro de la pantalla, con fondo oscuro. Pero lo importante no es el cubo — es **cómo está organizado el código**.

---

## Estructura de Archivos Esperada

```
R-01_/
├── src/
│   ├── lib/
│   │   ├── scene.ts        ← Crea la Scene, Camera, Renderer
│   │   ├── geometries.ts   ← Crea las geometrías (el cubo)
│   │   └── materials.ts    ← Crea los materiales (color, wireframe)
│   ├── components/
│   │   └── CubeScene.astro ← Monta el canvas + importa los módulos
│   └── pages/
│       └── index.astro     ← Página principal
├── package.json
└── astro.config.mjs
```

---

## Requerimientos por Archivo

### `src/lib/geometries.ts`
- Exporta una función `createCubeGeometry()` que retorna un `THREE.BoxGeometry`
- Usa `const` para las dimensiones (width, height, depth)

### `src/lib/materials.ts`
- Exporta una función `createCubeMaterial()` que retorna un `THREE.MeshStandardMaterial`
- El color lo recibes como parámetro (`color: number`)

### `src/lib/scene.ts`
- Exporta una función `initScene(container: HTMLElement)` que:
  1. Crea `Scene`, `PerspectiveCamera`, `WebGLRenderer`
  2. Crea el `Mesh` combinando geometry + material
  3. Agrega el mesh a la escena
  4. Inicia el loop de animación con `requestAnimationFrame`
  5. Hace `renderer.setSize()` con el tamaño del container

### `src/components/CubeScene.astro`
- Tiene un `<canvas>` o `<div id="canvas-container">`
- En el `<script>` importa y llama `initScene()`

### `src/pages/index.astro`
- Importa y usa `<CubeScene />`

---

## Pista del Maestro

La clave es el **flujo de datos entre módulos**:

```ts
// geometries.ts exporta...
export function createCubeGeometry() { ... }

// scene.ts importa y usa...
import { createCubeGeometry } from './geometries'
import { createCubeMaterial } from './materials'
```

¿Por qué separarlo así? Si mañana quieres cambiar el cubo por una esfera, **solo tocas `geometries.ts`** — sin tocar `scene.ts`.

---

## Criterios de Evaluación

| Criterio | ¿Cumplido? |
|---|---|
| `geometries.ts` exporta su función correctamente | ✅ |
| `materials.ts` recibe el color como parámetro | ✅ |
| `scene.ts` importa de los otros módulos | ✅ |
| El cubo rota en el loop de animación | ✅ |
| No hay lógica de Three.js en el `.astro` | ✅ |
