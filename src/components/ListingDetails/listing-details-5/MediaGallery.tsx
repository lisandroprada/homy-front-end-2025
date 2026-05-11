'use client';
import Image from 'next/image';
import SafeImage from '@/components/common/SafeImage';
import Fancybox from '@/components/common/Fancybox';
import {useCallback, useMemo} from 'react';

interface MediaGalleryProps {
  property: any;
}

const MediaGallery = ({property}: MediaGalleryProps) => {
  const images = useMemo(() => property?.img || [], [property?.img]);
  const cover = useMemo(() => property?.imgCover?.thumbWeb || images[0]?.thumbWeb || '/assets/images/listing/img_61.jpg', [property?.imgCover?.thumbWeb, images]);

  // Devuelve la mejor imagen grande disponible
  const getLargeImg = (img: any) => img?.imgSlider || img?.original || img?.thumbWeb;

  return (
    <div className='media-gallery-grid mb-50'>
      <Fancybox
        options={{
          Carousel: {
            infinite: true,
          },
        }}
      >
        <div className='row'>
          <div className='col-md-7 d-flex'>
            <div className='position-relative h-100 w-100 sm-pb-20'>
              <div className='media-bg lg h-100 position-relative' style={{minHeight: '560px'}}>
                <SafeImage
                  src={cover}
                  alt='Imagen de portada de la propiedad'
                  fill
                  style={{
                    objectFit: 'cover',
                    borderRadius: 'inherit',
                  }}
                  sizes='(max-width: 768px) 100vw, 800px'
                  priority
                  fallbackHeight='100%'
                />
              </div>
              <a href={getLargeImg(images[0])} data-fancybox='gallery9' className='img-fancy-btn fw-500 fs-16 color-dark' style={{cursor: 'pointer', zIndex: 2}}>
                Ver todas las fotos
              </a>
              {/* Imágenes 5+ ocultas para incluirlas en el slideshow completo */}
              {images.slice(5).map((img: any) => (
                <a key={img._id} className='d-none' data-fancybox='gallery9' href={getLargeImg(img)} />
              ))}
            </div>
          </div>
          <div className='col-md-5 d-flex'>
            <div className='w-100 h-100'>
              <div className='row'>
                {images.slice(1, 5).map((img: any, idx: number) => (
                  <div className='col-6 mb-25 md-mb-20' key={idx}>
                    <div className='media-bg sm position-relative' style={{minHeight: '230px'}}>
                      <a href={getLargeImg(img)} data-fancybox='gallery9' className='d-block h-100 w-100' style={{position: 'relative', minHeight: '230px'}}>
                        <SafeImage
                            src={img.thumbWeb}
                            alt={`Imagen ${idx + 2} de la propiedad`}
                            fill
                            style={{
                              objectFit: 'cover',
                              borderRadius: 'inherit',
                            }}
                            sizes='(max-width: 768px) 50vw, 300px'
                            fallbackHeight='100%'
                          />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Fancybox>
    </div>
  );
};

export default MediaGallery;
