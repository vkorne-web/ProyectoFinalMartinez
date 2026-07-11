# TechStore - Tienda Online (Proyecto Final)

Single Page Application de e-commerce desarrollada con React, Vite y React Router, con Firebase (Firestore) como base de datos en la nube. Permite navegar un catalogo de productos, filtrar por categorias, ver el detalle de cada producto, gestionar un carrito de compras y finalizar la compra generando una orden en Firestore.

## Caracteristicas

- **Catalogo de productos**: listado dinamico obtenido desde Firestore.
- **Filtro por categorias**: Electronica, Ropa, Hogar y Deportes.
- **Detalle de producto**: descripcion, precio, stock y contador de unidades (`ItemCount`).
- **Carrito de compras**: agregar productos, ver cantidades y subtotales, eliminar items y vaciar el carrito. Estado global con Context API.
- **Checkout**: formulario con validaciones que genera una orden en Firestore y devuelve el id de la orden al usuario.
- **Renderizado condicional**: loaders, "carrito vacio", "producto no encontrado", mensajes de exito, etc.
- **SPA**: navegacion con React Router sin recargas de pagina.
- **Pagina 404** para rutas inexistentes.
- **Diseño responsive**.

## Tecnologias utilizadas

- **React 19** - Libreria de interfaz de usuario (componentes, hooks, Virtual DOM).
- **Vite** - Herramienta de build y servidor de desarrollo.
- **React Router DOM** - Enrutamiento y navegacion.
- **React Context API** - Estado global del carrito.
- **Firebase / Firestore** - Base de datos en la nube para productos y ordenes.
- **react-icons** - Iconografia.

## Estructura del proyecto

```
src/
├── components/
│   ├── NavBar.jsx              # Barra de navegacion con links a categorias
│   ├── CartWidget.jsx          # Icono del carrito con total de unidades
│   ├── ItemListContainer.jsx   # Contenedor: consulta productos (catalogo/categoria)
│   ├── ItemList.jsx            # Presentacion: grid de productos
│   ├── Item.jsx                # Tarjeta individual de producto
│   ├── ItemDetailContainer.jsx # Contenedor: consulta un producto por id
│   ├── ItemCount.jsx           # Selector de cantidad con validaciones
│   ├── CartContainer.jsx       # Vista del carrito
│   ├── CartItem.jsx            # Item individual dentro del carrito
│   └── CheckoutForm.jsx        # Formulario de compra + generacion de orden
├── context/
│   └── CartContext.jsx         # Contexto global del carrito
├── data/
│   ├── products.js             # Datos mock (fallback / modo demo)
│   ├── productsAsync.js        # Consultas de productos a Firestore
│   └── orders.js               # Generacion de ordenes en Firestore
├── firebase/
│   └── config.js               # Inicializacion de Firebase / Firestore
├── App.jsx                     # Componente principal con las rutas
├── main.jsx                    # Punto de entrada
└── index.css                   # Estilos globales
```

## Rutas disponibles

| Ruta | Descripcion |
|------|-------------|
| `/` | Catalogo principal con todos los productos |
| `/category/:categoryId` | Productos filtrados por categoria |
| `/item/:itemId` | Detalle completo del producto |
| `/cart` | Carrito de compras |
| `/checkout` | Formulario de compra y confirmacion de la orden |
| `*` | Pagina 404 personalizada |

## Instalacion y uso

1. Clona el repositorio e instala dependencias:
   ```bash
   git clone <URL-del-repositorio>
   cd React
   npm install
   ```

2. Crea el archivo de variables de entorno a partir de la plantilla:
   ```bash
   cp .env.example .env
   ```

3. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

4. Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

> Con `VITE_USE_FIREBASE=false` la app funciona con datos mock, sin necesidad de credenciales. Para usar Firestore, sigue la seccion siguiente.

## Configuracion de Firebase (Firestore)

1. Entra en [Firebase Console](https://console.firebase.google.com/) y crea un proyecto.
2. Crea una base de datos **Cloud Firestore** (modo de prueba para desarrollo).
3. En *Configuracion del proyecto > Tus apps > SDK web*, copia las credenciales.
4. Pega esas credenciales en tu archivo `.env` y pon `VITE_USE_FIREBASE=true`:
   ```
   VITE_USE_FIREBASE=true
   VITE_FIREBASE_API_KEY=...
   VITE_FIREBASE_AUTH_DOMAIN=...
   VITE_FIREBASE_PROJECT_ID=...
   VITE_FIREBASE_STORAGE_BUCKET=...
   VITE_FIREBASE_MESSAGING_SENDER_ID=...
   VITE_FIREBASE_APP_ID=...
   ```
5. **Cargar los productos** en la coleccion `products` (una sola vez). Con la app corriendo, abre la consola del navegador y ejecuta:
   ```js
   seedFirestore()
   ```
   Esto crea los 12 productos de `src/data/products.js` en Firestore.

Colecciones utilizadas:
- **`products`**: catalogo de productos que consume la app.
- **`orders`**: se crea un documento por cada compra confirmada, con los datos del comprador, los items y el total.

> El archivo `.env` esta ignorado en `.gitignore` para no exponer credenciales. La plantilla publica es `.env.example`.

## Comandos disponibles

- `npm run dev` - Servidor de desarrollo
- `npm run build` - Compilacion para produccion
- `npm run preview` - Vista previa de la compilacion
- `npm run lint` - Linter

## Arquitectura de componentes

Se respeta la separacion entre **componentes contenedores** (manejan estado y datos: `ItemListContainer`, `ItemDetailContainer`, `CartContainer`) y **componentes de presentacion** (`ItemList`, `Item`, `CartItem`). El estado del carrito se administra de forma global con Context API (`CartContext`), y la comunicacion entre componentes se realiza mediante props, eventos y hooks (`useState`, `useEffect`, `useContext`, `useParams`).
