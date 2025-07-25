import Fancybox from '@/components/common/Fancybox';

interface MediaGalleryProps {
  property: any;
}

const MediaGallery = ({property}: MediaGalleryProps) => {
  const images = property?.img || [];
  const cover = property?.imgCover?.thumbWeb || images[0]?.thumbWeb || '/assets/images/listing/img_61.jpg';
  return (
    <div className='media-gallery-grid mb-50'>
      <div className='row'>
        <div className='col-md-7 d-flex'>
          <div className='position-relative h-100 w-100 sm-pb-20'>
            <a className='media-bg h-100' style={{backgroundImage: `url(${cover})`}}></a>
            <Fancybox
              options={{
                Carousel: {
                  infinite: true,
                },
              }}
            >
              <div className='img-fancy-btn fw-500 fs-16 color-dark'>
                Ver todas las fotos
                {images.map((img: any, index: number) => (
                  <a key={index} className='d-block' data-fancybox='gallery9' href={img.imgSlider}></a>
                ))}
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
                    <a href={img.thumbWeb} className='media-bg sm' data-fancybox style={{backgroundImage: `url(${img.thumbWeb})`}}></a>
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
