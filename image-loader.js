// image-loader.js
const customLoader = ({src, width, quality}) => {
  const s = String(src);
  const lower = s.toLowerCase();

  // Never try to optimize SVGs (Next's image optimizer blocks them by default)
  // Return as-is so they load directly from the asset path or remote URL
  if (lower.endsWith('.svg') || lower.includes('.svg?') || lower.startsWith('data:image/svg')) {
    return s;
  }
  // Para imágenes del API, usa el servidor original (SIN optimización de Vercel)
  if (s.startsWith('/uploads/')) {
    const API_HOST = process.env.NODE_ENV === 'production' ? 'https://api.netra.com.ar' : 'http://localhost:3050';

    // Retorna la imagen directa del API sin procesar
    return `${API_HOST}${s}`;
  }

  // Para placeholder u otras imágenes externas
  if (s.includes('placehold.co')) {
    return `${s}/${width}x${Math.round(width * 0.6)}?text=Loading`;
  }

  // Para imágenes estáticas locales (en /public), usa Vercel Image Optimization
  if (s.startsWith('/') && !s.startsWith('/uploads/')) {
    return `/_next/image?url=${encodeURIComponent(s)}&w=${width}&q=${quality || 75}`;
  }

  // Para URLs externas, retorna tal como están
  return s;
};

export default customLoader;
