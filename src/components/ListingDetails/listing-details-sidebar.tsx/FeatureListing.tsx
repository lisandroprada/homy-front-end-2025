'use client';

import Link from 'next/link';
import { usePublicProperties } from '@/services/api/usePublicProperties';
import SafeImage from '@/components/common/SafeImage';
import { PropertyItem } from '@/types/api/property';
import { formatPropertyPrice } from '@/utils/property-price';

const FeatureListing = () => {
  const { properties, isLoading, isError } = usePublicProperties({ 
    pageSize: 3,
    sort: 'createdAt',
    order: 'desc'
  });

  if (isLoading) {
    return (
      <div className='feature-listing bg-white border-20 p-30'>
        <h5 className='mb-40'>Propiedades Destacadas</h5>
        <div className='text-center py-4'>
          <div className='spinner-border text-primary' role='status'>
            <span className='visually-hidden'>Cargando...</span>
          </div>
        </div>
      </div>
    );
  }

  if (isError || properties.length === 0) {
    return null;
  }

  return (
    <div className='feature-listing bg-white border-20 p-30'>
      <h5 className='mb-40'>Propiedades Destacadas</h5>
      <div id='F-listing' className='carousel slide' data-bs-ride='carousel'>
        <div className='carousel-indicators'>
          {properties.map((_, index) => (
            <button
              key={index}
              type='button'
              data-bs-target='#F-listing'
              data-bs-slide-to={index}
              className={index === 0 ? 'active' : ''}
              aria-current={index === 0 ? 'true' : 'false'}
              aria-label={`Diapositiva ${index + 1}`}
            ></button>
          ))}
        </div>
        <div className='carousel-inner'>
          {properties.map((item: PropertyItem, index: number) => {
            const isRent = item.publishForRent;
            const priceData = isRent ? item.valueForRent : item.valueForSale;
            const tag = isRent ? 'EN ALQUILER' : 'EN VENTA';
            const thumb = item.imgCover?.thumbWeb || (item.img && item.img[0]?.thumb);

            return (
              <div key={item._id} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                <div className='listing-card-one style-three border-10'>
                  <div className='img-gallery'>
                    <div className='position-relative border-10 overflow-hidden'>
                      <div className='tag bg-white text-dark fw-500 border-20' style={{ zIndex: 1 }}>{tag}</div>
                      <Link href='#' className='fav-btn tran3s' style={{ zIndex: 1 }}>
                        <i className='fa-light fa-heart'></i>
                      </Link>
                      <SafeImage 
                        src={thumb} 
                        className='w-100 border-10' 
                        alt={item.address || 'Propiedad'}
                        fallbackHeight={250}
                      />
                    </div>
                  </div>
                  <div className='property-info mt-15'>
                    <div className='d-flex justify-content-between align-items-end'>
                      <div className='overflow-hidden'>
                        <strong className='price fw-500 color-dark'>
                          {formatPropertyPrice(priceData, isRent ? 'ARS' : 'USD')}
                        </strong>
                        <div className='address m0 pt-5 text-truncate' title={item.address}>
                          {item.address}
                        </div>
                      </div>
                      <Link href={`/listing_details_05/${item._id}`} className='btn-four rounded-circle flex-shrink-0'>
                        <i className='bi bi-arrow-up-right'></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FeatureListing;
