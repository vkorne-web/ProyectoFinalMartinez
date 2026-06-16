# TechStore - Tienda Online

Una aplicacion de tienda online desarrollada con React, Vite y React Router. Permite navegar por un catalogo de productos, filtrar por categorias, ver el detalle de cada producto y gestionar un carrito de compras.

## Caracteristicas

- **Catalogo de productos**: Visualiza todos los productos disponibles.
- **Filtro por categorias**: Navega por categorias (Electronica, Ropa, Hogar, Deportes).
- **Detalle de producto**: Vista individual con descripcion, precio, stock y contador de unidades.
- **Carrito de compras**: Agrega productos, modifica cantidades, elimina items y vacia el carrito.
- **Página 404**: Manejo de rutas inexistentes.
- **Diseño responsive**: Adaptado a dispositivos moviles y desktop.

## Tecnologias utilizadas

- **React 19** - Libreria de interfaz de usuario
- **Vite** - Herramienta de construccion rapida
- **React Router DOM** - Enrutamiento y navegacion
- **React Context API** - Manejo de estado global del carrito

## Estructura del proyecto

```
src/
├── components/        # Componentes de React
│   ├── NavBar.jsx           # Barra de navegacion con links a categorias
│   ├── CartWidget.jsx       # Widget del carrito con contador
│   ├── CartContainer.jsx    # Vista del carrito de compras
│   ├── ItemListContainer.jsx  # Contenedor del listado de productos
│   ├── ItemDetailContainer.jsx # Contenedor del detalle del producto
│   ├── ItemList.jsx         # Listado de productos (grid)
│   ├── Item.jsx             # Tarjeta individual de producto
│   └── ItemCount.jsx        # Contador de unidades para agregar al carrito
├── context/
│   └── CartContext.jsx      # Contexto global del carrito
├── data/
│   ├── products.js          # Datos mock de productos
│   └── productsAsync.js     # Funciones asincronas simuladas con Promises
├── App.jsx                  # Componente principal con rutas
├── main.jsx                 # Punto de entrada
└── index.css                # Estilos globales
```

## Rutas disponibles

| Ruta | Descripcion |
|------|-------------|
| `/` | Catalogo principal con todos los productos |
| `/category/:categoryId` | Productos filtrados por categoria |
| `/item/:itemId` | Detalle completo del producto |
| `/cart` | Carrito de compras |
| `*` | Pagina 404 personalizada |

## Instalacion y uso

1. Clona el repositorio:
   ```bash
   git clone https://github.com/vkorne-web/CreaTuLandingMartinez.git
   cd CreaTuLandingMartinez
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

4. Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

## Comandos disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Compila la aplicacion para produccion
- `npm run preview` - Vista previa de la compilacion de produccion
- `npm run lint` - Ejecuta el linter

## Entrega 2: Navega las rutas

Implementacion de React Router con navegacion entre vistas:
- Catalogo principal de productos
- Catalogo filtrado por categorias
- Vista en detalle de un producto
- Integracion de ItemCount para agregar unidades al carrito
- Ruta 404 para manejo de errores de navegacion
