# Dallas Gold Colombia

Página web para Dallas Gold Colombia.

## 🏢 Iniciativa de Negocio
Dallas Gold Colombia busca establecer una presencia digital sólida mediante una página web profesional, elegante y moderna. El objetivo principal es exhibir sus colecciones exclusivas de joyería fina (anillos, cadenas, pulseras y relojes) para clientes en Colombia. La plataforma sirve como un catálogo visual de alta calidad que transmite lujo, seguridad y confianza, facilitando el descubrimiento de piezas únicas para momentos inolvidables.

## 🏗️ Arquitectura e Integraciones
El proyecto está diseñado como un **sitio web estático altamente optimizado**, orientado a la visualización de contenido de lujo y carga rápida.
- **Fuente de Datos (Data Source):** Los datos de los productos se gestionan y consumen dinámicamente desde un archivo estático JSON (`data/products.json`), simulando el comportamiento de una API sin necesidad de un backend complejo.
- **Integraciones:**
  - Enlaces y botones de acción directos hacia canales de atención como WhatsApp y redes sociales.
  - Estructura lista para integrar un mapa interactivo (Google Maps) para ubicación de tiendas físicas.
  - Arquitectura preparada para despliegue nativo en **GitHub Pages** (también compatible con Vercel o Netlify).

## 💻 Stack Tecnológico
La aplicación se construyó con tecnologías web nativas ("Vanilla") para asegurar un rendimiento óptimo, ausencia de dependencias vulnerables y un control absoluto sobre el diseño:
- **HTML5:** Estructura semántica, vital para el SEO.
- **CSS3 (Vanilla):** Estilos a la medida, variables nativas para la paleta de colores de lujo, diseño 100% responsivo y animaciones fluidas. Sin frameworks pesados.
- **JavaScript (Vanilla / ES6+):** Lógica del lado del cliente, consumo asíncrono del catálogo JSON (`fetch`), filtrado dinámico de productos, menú móvil y resolución inteligente de imágenes.

## 🖼️ Relacionamiento y Gestión de Imágenes (Local vs Remoto)
El manejo de los assets gráficos está centralizado a través de un módulo utilitario (`js/ImageService.js`) que permite alternar la fuente de las imágenes de manera transparente:
- **Entorno Local (Desarrollo / MVP):** El proveedor (`provider: 'local'`) busca los archivos de imagen en la carpeta `images/productos/`. Si estas imágenes locales no están disponibles, el sistema en `main.js` inyecta automáticamente **placeholders estéticos desde Unsplash** basados en la categoría del producto, garantizando que el diseño nunca se rompa y mantenga una visual profesional.
- **Entorno Remoto (Producción):** Modificando la configuración a `provider: 'cloudinary'`, el servicio apuntará a un CDN como Cloudinary. Esto permite gestionar los assets pesados en la nube, entregándolos comprimidos y dimensionados de forma óptima (`f_auto,q_auto,w_800`), mejorando drásticamente el rendimiento web en producción.

## 🛠️ Consideraciones Importantes del Mantenimiento
- **Actualización del Catálogo:** Para agregar, editar o eliminar productos, basta con modificar el archivo `data/products.json`. El frontend se actualizará dinámicamente sin necesidad de tocar el HTML.
- **Gestión de Imágenes Reales:** A medida que se obtengan las fotografías reales de los productos, se deben cargar en la carpeta local o en el CDN configurado y actualizar el valor del campo `image` en el JSON.
- **Despliegues (Deploy):** Al ser una arquitectura estática, todo cambio fusionado a la rama principal (`main`) puede ser desplegado automáticamente en plataformas como GitHub Pages.
- **Prácticas SEO:** Cada vez que se añade un producto al JSON, es mandatorio incluir el atributo `alt` (ej. `"alt": "Anillo de diamantes"`). Esto es crucial para la indexación en buscadores web y la accesibilidad para lectores de pantalla.
