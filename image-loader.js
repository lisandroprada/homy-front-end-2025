// image-loader.js
const customLoader = ({src, width, quality}) => {
  // Para imágenes del API, usa el servidor original (SIN optimización de Vercel)
  if (src.startsWith('/uploads/')) {
    const API_HOST = process.env.NODE_ENV === 'production' ? 'https://api.netra.com.ar' : 'http://localhost:3050';

    // Retorna la imagen directa del API sin procesar
    return `${API_HOST}${src}`;
  }

  // Para placeholder u otras imágenes externas
  if (src.includes('placehold.co')) {
    return `${src}/${width}x${Math.round(width * 0.6)}?text=Loading`;
  }

  // Para imágenes estáticas locales (en /public), usa Vercel Image Optimization
  if (src.startsWith('/') && !src.startsWith('/uploads/')) {
    return `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=${quality || 75}`;
  }

  // Para URLs externas, retorna tal como están
  return src;
};

export default customLoader;
