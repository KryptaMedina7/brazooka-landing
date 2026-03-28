# Brazooka SPA — Landing Page Premium

Plataforma web comercial para **Importadora Brazooka SPA**, especialista en vaporizadores, cigarros Backwoods y accesorios premium en Chile.

## Stack Tecnológico

| Tecnología | Uso |
|---|---|
| **Next.js 16** | Framework React con App Router y Turbopack |
| **Framer Motion** | Animaciones de scroll, parallax y transiciones |
| **CSS Modules** | Estilos encapsulados por componente |
| **TypeScript** | Tipado estático |

## Estructura del Proyecto

```
src/
├── app/              # Rutas de la aplicación
│   ├── page.tsx      # Homepage (Hero + Propuestas + Lifestyle)
│   ├── catalogo/     # Catálogo completo (Hardware + Backwoods)
│   ├── faq/          # Preguntas Frecuentes (acordeón) + Proceso de Compra
│   └── comunidad/    # Feed de Instagram
├── components/       # Componentes reutilizables con CSS Modules
├── config/           # siteData.ts — CMS local (productos, posts IG)
└── context/          # CartContext — Estado global del carrito
```

## Configuración del Catálogo

Todo el contenido del sitio (productos, posts de Instagram) se gestiona desde un único archivo:

```
src/config/siteData.ts
```

Para agregar o modificar productos, edita el array `CATALOG_PRODUCTS`. Para actualizar posts de Instagram, edita `INSTAGRAM_POSTS`.

## Gestión de Imágenes

Las imágenes de producto viven en `public/products/` con fondo transparente (PNG). Para reemplazar una imagen, sobrescribe el archivo manteniendo el mismo nombre.

## Desarrollo Local

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Deploy

El proyecto está optimizado para **Vercel**. Conecta el repositorio de GitHub y Vercel detectará automáticamente la configuración de Next.js.

## Licencia

Proyecto privado — Importadora Brazooka SPA. Todos los derechos reservados.
