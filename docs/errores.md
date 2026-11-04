# Errores típicos de JSX (paso 11)

Los tres errores se provocaron a propósito en este proyecto y se registró el mensaje exacto
que muestra la herramienta. El proyecto se dejó funcionando: los fragmentos de abajo son solo
la reproducción del fallo, no el código final.

Entorno usado:

- Node.js v24.15.0
- npm 11.12.1
- Vite 8.3.8
- React 19.3.1

---

## 1. Usar `class` en vez de `className`

JSX no usa los atributos HTML directamente: `class` es una palabra reservada de JavaScript y
React espera la propiedad `className`.

Código con el error:

```jsx
function Caja() {
  return <div class="caja">Hola</div>
}
```

Mensaje registrado en la consola del navegador (F12 → Console):

```text
Invalid DOM property `class`. Did you mean `className`?
```

Qué ocurre: la página se dibuja, pero el atributo se ignora y React avisa del nombre
incorrecto. Si el error se repite en muchos sitios, los estilos dejan de aplicarse.

Corrección:

```jsx
function Caja() {
  return <div className="caja">Hola</div>
}
```

Cómo se reprodujo: se renderizó el componente con `react-dom/server` y se capturó el
`console.error` de React.

---

## 2. Devolver dos nodos raíz

Un componente solo puede devolver un nodo raíz. Dos etiquetas hermanas al mismo nivel no son
válidas para el compilador de JSX.

Código con el error:

```jsx
function App() {
  return (
    <h1>Hola</h1>
    <p>Mundo</p>
  )
}
```

Mensaje registrado al compilar con `npm run build`:

```text
[builtin:vite-transform] Adjacent JSX elements must be wrapped in an enclosing tag.
   ╭─[ src/App.jsx:4:5 ]
   │
 4 │     <p>Mundo</p>
   │     ┬
   │     ╰──
   │
   │ Help: Did you want a JSX fragment `<>...</>`?
```

Qué ocurre: Vite no puede transformar el archivo y la aplicación no arranca. El error apunta
a la línea del segundo nodo.

Corrección: envolver los dos nodos en un fragmento o en un contenedor.

```jsx
function App() {
  return (
    <>
      <h1>Hola</h1>
      <p>Mundo</p>
    </>
  )
}
```

Cómo se reprodujo: se guardó temporalmente esa versión de `App.jsx` y se ejecutó
`npm run build`; después se restauró el archivo con `git checkout -- src/App.jsx`.

---

## 3. Olvidar la `key` en un `map`

Cuando `map` devuelve una lista de elementos, cada uno necesita una `key` única y estable para
que React sepa qué elemento cambió, se agregó o se quitó.

Código con el error:

```jsx
<ul>
  {movie.schedules.map((schedule) => (
    <li>{schedule}</li>
  ))}
</ul>
```

Mensaje registrado en la consola del navegador:

```text
Each child in a list should have a unique "key" prop.
Check the top-level render call using <li>. See https://react.dev/link/warning-keys for more information.
```

Qué ocurre: la lista se dibuja igual, pero React avisa en consola y puede reutilizar mal los
nodos al cambiar el orden o eliminar elementos.

Corrección: usar un dato único del elemento como `key`. En los horarios sirve el propio texto
porque no se repite dentro de la misma película.

```jsx
<ul>
  {movie.schedules.map((schedule) => (
    <li key={schedule}>{schedule}</li>
  ))}
</ul>
```

En la cartelera se usa el `id` de la película:

```jsx
{movies.map((movie) => (
  <MovieCard key={movie.id} movie={movie} />
))}
```

Cómo se reprodujo: se renderizó una lista de elementos sin `key` con `react-dom/server` y se
capturó el `console.error` de React.

---

## Resumen

| Error | Dónde se ve | Mensaje | Corrección |
| --- | --- | --- | --- |
| `class` en vez de `className` | Consola del navegador | ``Invalid DOM property `class`. Did you mean `className`?`` | Usar `className` |
| Dos nodos raíz | `npm run build` | `Adjacent JSX elements must be wrapped in an enclosing tag.` | Envolver en `<>...</>` |
| Falta la `key` en `map` | Consola del navegador | `Each child in a list should have a unique "key" prop.` | Pasar `key={movie.id}` |
