'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useFeaturedProperties } from '@/services/api/useFeaturedProperties';
import SafeImage from '@/components/common/SafeImage';
import { formatPropertyPrice } from '@/utils/property-price';
import titleShape from '@/assets/images/shape/title_shape_03.svg';
import propertyIcon_1 from '@/assets/images/icon/icon_04.svg';
import propertyIcon_2 from '@/assets/images/icon/icon_05.svg';
import propertyIcon_3 from '@/assets/images/icon/icon_06.svg';

const FeaturedProperties = () => {
  const { properties, isLoading, isError } = useFeaturedProperties(6);

  if (isLoading) {
    return (
      <div className="property-listing-five mt-80">
        <div className="container container-large">
          <div className="row gx-xxl-5">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="col-lg-4 col-md-6 mt-40">
                <div className="listing-card-one style-two shadow-none h-100 w-100 bg-light rounded" style={{ minHeight: 320 }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (isError || properties.length === 0) return null;

  return (
    <div className="property-listing-five mt-80 xl-mt-60 pb-80 xl-pb-60">
      <div className="container container-large">
        <div className="position-relative">
          <div className="title-one mb-25 lg-mb-10 wow fadeInUp">
            <h3>
              Propiedades{' '}
              <span>
                Destacadas
                <Image src={titleShape} alt="" className="lazy-img" width={120} height={20} />
              </span>
            </h3>
            <p className="fs-22">Selección especial de propiedades destacadas por nuestro equipo.</p>
          </div>

          <div className="row gx-xxl-5">
            {properties.map((item: any) => {
              const priceDisplay =
                item.publishForRent && item.valueForRent?.amount > 0
                  ? formatPropertyPrice(item.valueForRent, 'ARS') + '/mes'
                  : formatPropertyPrice(item.valueForSale, 'USD');

              const property_info = [
                {
                  icon: propertyIcon_1,
                  feature: 'm²',
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
                <div key={item._id} className="col-lg-4 col-md-6 d-flex mt-40 wow fadeInUp">
                  <div className="listing-card-one style-two shadow-none h-100 w-100">
                    <div className="img-gallery">
                      <div className="position-relative overflow-hidden">
                        <div
                          style={{
                            position: 'absolute',
                            top: 12,
                            left: 12,
                            zIndex: 2,
                            background: '#6366f1',
                            color: '#fff',
                            fontSize: 11,
                            fontWeight: 700,
                            padding: '3px 10px',
                            borderRadius: 20,
                          }}
                        >
                          Destacada
                        </div>
                        <SafeImage
                          src={
                            typeof item.imgCover?.thumbWeb === 'string' && item.imgCover.thumbWeb
                              ? item.imgCover.thumbWeb
                              : ''
                          }
                          width={400}
                          height={250}
                          className="w-100"
                          alt={item.address}
                          priority
                          fallbackHeight={250}
                        />
                      </div>
                    </div>
                    <div className="property-info pt-20">
                      <Link href={'/listing_details_05/' + item._id} className="title tran3s">
                        {item.title || item.address}
                      </Link>
                      <div className="address">{item.address}</div>
                      <ul className="style-none feature d-flex flex-wrap align-items-center justify-content-between pb-15 pt-5">
                        {property_info
                          .filter((info) => info.total_feature !== '' && info.total_feature !== undefined)
                          .map((info, index) => (
                            <li key={index} className="d-flex align-items-center">
                              <Image
                                src={info.icon}
                                alt=""
                                className="lazy-img icon me-2"
                                width={20}
                                height={20}
                                style={{ height: 'auto' }}
                              />
                              <span className="fs-16">
                                {info.total_feature} {info.feature}
                              </span>
                            </li>
                          ))}
                      </ul>
                      <div className="pl-footer top-border bottom-border d-flex align-items-center justify-content-between">
                        <strong className="price fw-500 color-dark">{priceDisplay}</strong>
                        <Link href={'/listing_details_05/' + item._id} className="btn-four">
                          <i className="bi bi-arrow-up-right"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="section-btn text-center md-mt-60 mt-50">
            <Link href="/listing_05" className="btn-eight">
              <span>Ver todas las propiedades</span> <i className="bi bi-arrow-up-right"></i>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProperties;
