'use client';
import {usePublicProperties} from '@/services/api/usePublicProperties';
import propertyIcon_1 from '@/assets/images/icon/icon_04.svg';
import propertyIcon_2 from '@/assets/images/icon/icon_05.svg';
import propertyIcon_3 from '@/assets/images/icon/icon_06.svg';
import Link from 'next/link';
import Image from 'next/image';
import SafeImage from '@/components/common/SafeImage';
import React from 'react';
import { formatPropertyPrice } from '@/utils/property-price';

const PropertyTwo = (): any => {
  // Emula la consulta de PropertyOne: usa el hook con los mismos parámetros y manejo de estado
  const {properties, isLoading, isError} = usePublicProperties({page: 0, pageSize: 3, featured: true});

  // Mapeo backend -> frontend
  const mappedProperties = properties.map((item: any) => ({
    id: item._id,
    tag: item.publishForRent ? 'EN ALQUILER' : item.publishForSale ? 'EN VENTA' : item.status,
    carousel_thumb: Array.isArray(item.img)
      ? item.img.map((img: any, i: number) => ({
          img: img.thumbWeb || img.thumb,
          active: i === 0 ? 'active' : '',
        }))
      : [],
    title: item.title || '',
    address: item.address,
    property_info: [
      {
        icon: propertyIcon_1,
        feature: 'm²',
        total_feature: item.specs?.totalSquareMeters || item.specs?.coveredSquareMeters || '',
      },
      {
        icon: propertyIcon_2,
        feature: 'hab.',
        total_feature: item.specs?.bedrooms || '',
      },
      {
        icon: propertyIcon_3,
        feature: 'baños',
        total_feature: item.specs?.bathrooms || '',
      },
    ],
    price: formatPropertyPrice(item.valueForSale, 'USD'),
    carousel: item._id,
    imgCover: (typeof item.imgCover?.thumbWeb === 'string' && item.imgCover.thumbWeb) ? item.imgCover.thumbWeb : '',
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
                  <div className='property-img position-absolute w-100 h-100 top-0 start-0 z-0'>
                    <SafeImage src={item.imgCover} alt={item.title || 'Imagen de propiedad'} fill style={{objectFit: 'cover'}} sizes='(max-width: 768px) 100vw, 33vw' priority fallbackHeight='100%' />
                  </div>

                  {/* Etiquetas (Tags) */}
                  <div className='position-absolute' style={{ top: 20, left: 20, zIndex: 2, display: 'flex', gap: '8px' }}>
                    <div
                      style={{
                        background: '#6366f1',
                        color: '#fff',
                        fontSize: '11px',
                        fontWeight: 700,
                        padding: '4px 12px',
                        borderRadius: '4px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                      }}
                    >
                      Destacada
                    </div>
                    <div
                      style={{
                        background: '#fff',
                        color: '#000',
                        fontSize: '11px',
                        fontWeight: 700,
                        padding: '4px 12px',
                        borderRadius: '4px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                      }}
                    >
                      {item.tag}
                    </div>
                  </div>

                  <div className='property-info tran3s w-100'>
                    <div className='d-flex align-items-center justify-content-between'>
                      <div className='pe-3'>
                        <Link href={`/listing_details_05/${item.id}`} className='title fw-500 tran4s'>
                          {item.title}
                        </Link>
                        <div className='address tran4s'>{item.address}</div>
                      </div>
                      <Link href={`/listing_details_05/${item.id}`} className='btn-four inverse'>
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
