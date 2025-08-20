'use client';
import Image from 'next/image';
import Fancybox from '@/components/common/Fancybox';
import {useCallback, useMemo} from 'react';

interface MediaGalleryProps {
  property: any;
}

const MediaGallery = ({property}: MediaGalleryProps) => {
  const images = useMemo(() => property?.img || [], [property?.img]);
  const cover = useMemo(() => property?.imgCover?.thumbWeb || images[0]?.thumbWeb || '/assets/images/listing/img_61.jpg', [property?.imgCover?.thumbWeb, images]);

  const fancyboxImages = useCallback(() => {
    return images.map((img: any) => <a key={img._id} className='d-none' data-fancybox='gallery9' href={img.imgSlider}></a>);
  }, [images]);

  return (
    <div className='media-gallery-grid mb-50'>
      <div className='row'>
        <div className='col-md-7 d-flex'>
          <div className='position-relative h-100 w-100 sm-pb-20'>
            <div className='media-bg h-100 position-relative'>
              <Image
                src={cover}
                alt='Imagen de portada de la propiedad'
                fill
                style={{
                  objectFit: 'cover',
                  borderRadius: 'inherit',
                }}
                sizes='(max-width: 768px) 100vw, 600px'
                priority
              />
            </div>
            <Fancybox
              options={{
                Carousel: {
                  infinite: true,
                },
              }}
            >
              <div className='img-fancy-btn fw-500 fs-16 color-dark'>
                Ver todas las fotos
                {fancyboxImages()}
              </div>
            </Fancybox>
          </div>
        </div>
        <div className='col-md-5 d-flex'>
          <div className='w-100 h-100'>
            <Fancybox
              options={{
                Carousel: {
                  infinite: true,
                },
              }}
            >
              <div className='row'>
                {images.slice(1, 5).map((img: any, idx: number) => (
                  <div className='col-6 mb-25 md-mb-20' key={idx}>
                    <div className='media-bg sm position-relative'>
                      <a href={img.thumbWeb} data-fancybox='gallery9' className='d-block h-100 w-100'>
                        <Image
                          src={img.thumbWeb}
                          alt={`Imagen ${idx + 2} de la propiedad`}
                          fill
                          style={{
                            objectFit: 'cover',
                            borderRadius: 'inherit',
                          }}
                          sizes='(max-width: 768px) 50vw, 250px'
                        />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </Fancybox>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaGallery;
