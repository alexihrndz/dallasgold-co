/**
 * ImageService — Utilitaria para resolución de URLs de imágenes.
 *
 * Permite alternar entre diferentes proveedores de almacenamiento
 * de imágenes (local, Cloudinary, etc.) modificando solo la
 * configuración en IMAGE_CONFIG.
 *
 * Proveedores disponibles:
 *  - 'local'      : Usa archivos dentro del proyecto (images/productos/)
 *  - 'cloudinary' : Usa una URL base de Cloudinary
 */

// ─────────────────────────────────────────────
//  CONFIGURACIÓN — Edita aquí para cambiar proveedor
// ─────────────────────────────────────────────
const IMAGE_CONFIG = {
  /**
   * Proveedor activo.
   * Valores posibles: 'local' | 'cloudinary'
   */
  provider: 'local',

  /**
   * Configuración para imágenes locales.
   * Las imágenes deben estar en esta ruta dentro del proyecto.
   */
  local: {
    basePath: 'images/productos/'
  },

  /**
   * Configuración para Cloudinary.
   * Reemplaza 'tu-usuario' y 'dallasgold' por los valores reales
   * de tu cuenta cuando hagas la migración.
   */
  cloudinary: {
    baseUrl: 'https://res.cloudinary.com/tu-usuario/image/upload',
    folder: 'dallasgold/productos',
    // Transformaciones por defecto (opcionales): tamaño, calidad, formato
    defaultTransform: 'f_auto,q_auto,w_800'
  },

  /**
   * Imagen de fallback si no se encuentra la imagen del producto.
   */
  placeholder: 'images/placeholder.jpg'
};

// ─────────────────────────────────────────────
//  CLASE ImageService
// ─────────────────────────────────────────────
class ImageService {
  constructor(config) {
    this._config = config;
    this._provider = config.provider || 'local';
  }

  /**
   * Resuelve la URL completa de una imagen a partir de su nombre de archivo.
   * @param {string} imageName - Nombre del archivo (ej: 'anillo-elite.jpg')
   * @returns {string} URL completa lista para usar en un atributo src
   */
  resolveUrl(imageName) {
    if (!imageName) return this._config.placeholder;

    switch (this._provider) {
      case 'cloudinary': {
        const { baseUrl, folder, defaultTransform } = this._config.cloudinary;
        const transform = defaultTransform ? `${defaultTransform}/` : '';
        return `${baseUrl}/${transform}${folder}/${imageName}`;
      }

      case 'local':
      default: {
        const { basePath } = this._config.local;
        return `${basePath}${imageName}`;
      }
    }
  }

  /**
   * Cambia el proveedor activo en tiempo de ejecución.
   * Útil para depuración o cambios dinámicos.
   * @param {'local'|'cloudinary'} provider
   */
  setProvider(provider) {
    const available = ['local', 'cloudinary'];
    if (!available.includes(provider)) {
      console.warn(`[ImageService] Proveedor desconocido: "${provider}". Opciones: ${available.join(', ')}`);
      return;
    }
    this._provider = provider;
    console.info(`[ImageService] Proveedor cambiado a: "${provider}"`);
  }

  /**
   * Retorna el proveedor actualmente activo.
   * @returns {string}
   */
  getProvider() {
    return this._provider;
  }
}

// ─────────────────────────────────────────────
//  Instancia global — disponible en todos los scripts
// ─────────────────────────────────────────────
const imageService = new ImageService(IMAGE_CONFIG);
