'use client';
import {usePublicProperties} from '@/services/api/usePublicProperties';
import propertyIcon_1 from '@/assets/images/icon/icon_04.svg';
import propertyIcon_2 from '@/assets/images/icon/icon_05.svg';
import propertyIcon_3 from '@/assets/images/icon/icon_06.svg';
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';

const PropertyTwo = (): any => {
  // Emula la consulta de PropertyOne: usa el hook con los mismos parámetros y manejo de estado
  const {properties, isLoading, isError} = usePublicProperties({page: 0, pageSize: 3});

  // Mapeo backend -> frontend
  const mappedProperties = properties.map((item: any) => ({
    id: item._id,
    tag: item.publishForRent ? 'FOR RENT' : item.publishForSale ? 'FOR SALE' : item.status,
    carousel_thumb: Array.isArray(item.img)
      ? item.img.map((img: any, i: number) => ({
          img: img.thumbWeb || img.thumb,
          active: i === 0 ? 'active' : '',
        }))
      : [],
    title: item.detailedDescription?.title || '',
    address: item.address,
    property_info: [
      {
        icon: propertyIcon_1,
        feature: 'm2',
        total_feature: item.detailedDescription?.sqFt ?? '',
      },
      {
        icon: propertyIcon_2,
        feature: 'habitaciones',
        total_feature: item.detailedDescription?.rooms ?? '',
      },
      {
        icon: propertyIcon_3,
        feature: 'baños',
        total_feature: item.detailedDescription?.bathrooms ?? '',
      },
    ],
    price: item.valueForSale && typeof item.valueForSale === 'object' && item.valueForSale.pricePublic ? item.valueForSale.amount : undefined,
    price_text: item.valueForSale && typeof item.valueForSale === 'object' ? item.valueForSale.currency || '' : '',
    carousel: item._id,
    imgCover: item.imgCover?.thumbWeb,
  }));

  if (isLoading) {
    return <div className='text-center py-5'>Cargando propiedades...</div>;
  }
  if (isError) {
    return <div className='text-center py-5 text-danger'>Error al cargar propiedades.</div>;
  }

  return (
    <div className='property-listing-one mt-170 xl-mt-120'>
      <div className='container container-large'>
        <div className='position-relative'>
          <div className='title-one mb-25 lg-mb-10 wow fadeInUp'>
            <h3>Propiedades Destacadas</h3>
            <p className='fs-22 mt-xs'>Explora propiedades destacadas en venta.</p>
          </div>

          <div className='row gx-xxl-5'>
            {mappedProperties.map((item: any) => (
              <div key={item.id} className='col-lg-4 col-md-6 mt-40 wow fadeInUp'>
                <div className={`listing-card-four overflow-hidden d-flex align-items-end position-relative z-1`}>
                  {/* Imagen principal de la propiedad */}
                  {item.imgCover && (
                    <div className='property-img position-absolute w-100 h-100 top-0 start-0 z-0'>
                      <Image src={item.imgCover} alt={item.title || 'Imagen de propiedad'} fill style={{objectFit: 'cover'}} sizes='(max-width: 768px) 100vw, 33vw' priority />
                    </div>
                  )}
                  <div className='tag fw-500'>{item.tag}</div>
                  <div className='property-info tran3s w-100'>
                    <div className='d-flex align-items-center justify-content-between'>
                      <div className='pe-3'>
                        <Link href={'/listing_details_05'} className='title fw-500 tran4s'>
                          {item.title}
                        </Link>
                        <div className='address tran4s'>{item.address}</div>
                      </div>
                      <Link href={'/listing_details_05'} className='btn-four inverse'>
                        <i className='bi bi-arrow-up-right'></i>
                      </Link>
                    </div>

                    <div className='pl-footer tran4s'>
                      <ul className='style-none feature d-flex flex-wrap align-items-center justify-content-between'>
                        {item.property_info.map((info: any, i: number) => (
                          <li key={i}>
                            <strong className='color-dark fw-500'>{info.total_feature}</strong>
                            <span className='fs-16'>{info.feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className='section-btn text-center md-mt-60'>
            <Link href='/listing_05' className='btn-eight'>
              <span>Ver todas</span> <i className='bi bi-arrow-up-right'></i>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyTwo;
