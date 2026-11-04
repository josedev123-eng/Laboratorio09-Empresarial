# CineTecsup - Laboratorio 09

Cartelera de cine hecha con React y Vite para el curso Desarrollo de Aplicaciones Empresariales.

## Cómo ejecutarlo

```bash
npm install
npm run dev
```

## Estructura

```
src/
├── components/
│   ├── Header/      nombre del cine y navegación
│   ├── Hero/        banner de la película destacada (recibe movie por props)
│   ├── MovieList/   recorre la cartelera con map (recibe movies por props)
│   ├── MovieCard/   tarjeta de una película (recibe movie por props)
│   └── Footer/      contacto e información
├── data/
│   └── movies.js    cartelera con 8 películas
├── styles/
│   ├── variables.css
│   ├── base.css
│   ├── layout.css
│   └── index.css
├── App.jsx          compone todos los componentes
└── main.jsx
```

App.jsx importa los datos y los pasa hacia abajo: la película destacada a Hero y la cartelera completa a MovieList, que a su vez le pasa cada película a MovieCard.

## Dependencias

- react, react-dom
- vite, @vitejs/plugin-react
