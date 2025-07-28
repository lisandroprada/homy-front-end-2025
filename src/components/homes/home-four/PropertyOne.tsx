'use client';
import {usePublicProperties} from '@/services/api/usePublicProperties';
import Image from 'next/image';
import Link from 'next/link';
import titleShape from '@/assets/images/shape/title_shape_03.svg';
import propertyIcon_1 from '@/assets/images/icon/icon_04.svg';
import propertyIcon_2 from '@/assets/images/icon/icon_05.svg';
import propertyIcon_3 from '@/assets/images/icon/icon_06.svg';

const PropertyOne = ({style_1, style_2}: any) => {
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
            {mappedProperties.map((item) => (
              <div key={item.id} className='col-lg-4 col-md-6 d-flex mt-40 wow fadeInUp'>
                <div className='listing-card-one style-two shadow-none h-100 w-100'>
                  <div className='img-gallery'>
                    <div className='position-relative overflow-hidden'>
                      {item.imgCover ? (
                        <Image src={item.imgCover} width={400} height={250} className='w-100' alt={item.address} priority />
                      ) : (
                        <div style={{width: 400, height: 250, background: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                          <span>Sin imagen</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className='property-info pt-20'>
                    <Link href={'/listing_details_01?id=' + item.id} className='title tran3s'>
                      {item.title || item.address}
                    </Link>
                    <div className='address'>{item.address}</div>
                    <ul className='style-none feature d-flex flex-wrap align-items-center justify-content-between pb-15 pt-5'>
                      {item.property_info.map((info, index) => (
                        <li key={index} className='d-flex align-items-center'>
                          <Image src={info.icon} alt='' className='lazy-img icon me-2' width={20} height={20} />
                          <span className='fs-16'>
                            {info.total_feature} {info.feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <div className='pl-footer top-border bottom-border d-flex align-items-center justify-content-between'>
                      <strong className='price fw-500 color-dark'>{item.price ? `$${item.price.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}` : 'Consultar'}</strong>
                      <Link href={'/listing_details_01?id=' + item.id} className='btn-four'>
                        <i className='bi bi-arrow-up-right'></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className='section-btn text-center md-mt-60'>
            <Link href='/listing_08' className='btn-eight'>
              <span>Explorar todas</span> <i className='bi bi-arrow-up-right'></i>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyOne;
