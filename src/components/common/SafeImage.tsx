'use client';
import Image, {ImageProps} from 'next/image';

/**
 * SafeImage: wrapper defensivo de next/image que previene el error
 * "Failed to construct 'URL': Invalid URL" cuando src es inválido.
 *
 * Valida que src sea:
 * 1. Un string no vacío que comience con / o http/https
 * 2. Un objeto StaticImageData (importación de módulo)
 *
 * Si src es inválido, renderiza un placeholder div en su lugar.
 */
interface SafeImageProps extends Omit<ImageProps, 'src'> {
  src: any;
  fallbackHeight?: number | string;
  fallbackBg?: string;
}

function isValidSrc(src: any): boolean {
  if (!src) return false;

  // Si es un objeto (posible StaticImageData), validamos su propiedad src interna
  if (typeof src === 'object' && src !== null) {
    if ('src' in src) {
      const innerSrc = (src as any).src;
      if (typeof innerSrc !== 'string' || innerSrc.trim() === '') return false;
      return true;
    }
    return false;
  }

  if (typeof src !== 'string') return false;
  
  const trimmed = src.trim();
  if (trimmed === '') return false;

  // Si comienza con /, es una ruta relativa válida para Next.js
  if (trimmed.startsWith('/')) return true;

  // Para URLs absolutas, probamos si el constructor URL las acepta
  try {
    // Next.js requiere un base si es relativa o fallará en new URL()
    // Pero si empieza con /, ya lo cubrimos arriba.
    // Aquí solo llegan URLs que deberían ser absolutas.
    new URL(trimmed);
    return true;
  } catch (e) {
    return false;
  }
}

const SafeImage = ({src, alt, fallbackHeight = 250, fallbackBg = '#eee', style, ...rest}: SafeImageProps) => {
  if (!isValidSrc(src)) {
    return (
      <div
        style={{
          width: '100%',
          height: typeof fallbackHeight === 'number' ? fallbackHeight : undefined,
          minHeight: fallbackHeight,
          background: fallbackBg,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          ...style,
        }}
      >
        <span style={{color: '#999', fontSize: 12}}>Sin imagen</span>
      </div>
    );
  }
  const finalStyle = {
    ...style,
    ...(rest.width && !rest.height ? {height: 'auto'} : {}),
    ...(rest.height && !rest.width ? {width: 'auto'} : {}),
  };

  return <Image src={src} alt={alt || ''} style={finalStyle} {...rest} />;
};

export default SafeImage;
