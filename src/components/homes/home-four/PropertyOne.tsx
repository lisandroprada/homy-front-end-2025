'use client';
import {usePublicProperties} from '@/services/api/usePublicProperties';
import Image from 'next/image';
import SafeImage from '@/components/common/SafeImage';
import Link from 'next/link';
import titleShape from '@/assets/images/shape/title_shape_03.svg';
import propertyIcon_1 from '@/assets/images/icon/icon_04.svg';
import propertyIcon_2 from '@/assets/images/icon/icon_05.svg';
import propertyIcon_3 from '@/assets/images/icon/icon_06.svg';

import { formatPropertyPrice } from '@/utils/property-price';

const PropertyOne = ({style_1, style_2}: any) => {
  const {properties, isLoading, isError} = usePublicProperties({page: 0, pageSize: 3});

  if (isLoading) {
    return <div className='text-center py-5'>Cargando propiedades...</div>;
  }
  if (isError) {
    return <div className='text-center py-5 text-danger'>Error al cargar propiedades.</div>;
  }

  return (
    <div className='property-listing-five mt-170 xl-mt-120'>
      <div className='container container-large'>
        <div className='position-relative'>
          <div className='title-one mb-25 lg-mb-10 wow fadeInUp'>
            {style_2 ? (
              <h3>
                <span>
                  Nuevas
                  <Image src={titleShape} alt='' className='lazy-img' />
                </span>{' '}
                Propiedades
              </h3>
            ) : (
              <h3>{style_1 ? 'Propiedades Populares' : 'Nuevas Propiedades'}</h3>
            )}
            <p className='fs-22'>Explora las últimas y destacadas propiedades en venta, alquiler y financiación.</p>
          </div>

          <div className='row gx-xxl-5'>
            {properties.map((item: any) => {
              const priceDisplay = formatPropertyPrice(item.valueForSale, 'USD');
              const property_info = [
                {
                  icon: propertyIcon_1,
                  feature: 'm2',
                  total_feature: item.detailedDescription?.sqFt ?? '',
                },
                {
                  icon: propertyIcon_2,
                  feature: 'hab.',
                  total_feature: item.detailedDescription?.rooms ?? '',
                },
                {
                  icon: propertyIcon_3,
                  feature: 'baños',
                  total_feature: item.detailedDescription?.bathrooms ?? '',
                },
              ];

              return (
                <div key={item._id} className='col-lg-4 col-md-6 d-flex mt-40 wow fadeInUp'>
                  <div className='listing-card-one style-two shadow-none h-100 w-100'>
                    <div className='img-gallery'>
                      <div className='position-relative overflow-hidden'>
                        <SafeImage 
                          src={(typeof item.imgCover?.thumbWeb === 'string' && item.imgCover.thumbWeb) ? item.imgCover.thumbWeb : ''} 
                          width={400} 
                          height={250} 
                          className='w-100' 
                          alt={item.address} 
                          priority 
                          fallbackHeight={250} 
                        />
                      </div>
                    </div>
                    <div className='property-info pt-20'>
                      <Link href={'/listing_details_05/' + item._id} className='title tran3s'>
                        {item.title || item.address}
                      </Link>
                      <div className='address'>{item.address}</div>
                      <ul className='style-none feature d-flex flex-wrap align-items-center justify-content-between pb-15 pt-5'>
                        {property_info.map((info, index) => (
                          <li key={index} className='d-flex align-items-center'>
                            <Image src={info.icon} alt='' className='lazy-img icon me-2' width={20} height={20} style={{ height: 'auto' }} />
                            <span className='fs-16'>
                              {info.total_feature} {info.feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                      <div className='pl-footer top-border bottom-border d-flex align-items-center justify-content-between'>
                        <strong className='price fw-500 color-dark'>{priceDisplay}</strong>
                        <Link href={'/listing_details_05/' + item._id} className='btn-four'>
                          <i className='bi bi-arrow-up-right'></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className='section-btn text-center md-mt-60'>
            <Link href='/listing_05' className='btn-eight'>
              <span>Explorar todas</span> <i className='bi bi-arrow-up-right'></i>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyOne;
