'use client';

import React from 'react';
import Link from 'next/link';
import { usePublicProperties } from '@/services/api/usePublicProperties';
import SafeImage from '@/components/common/SafeImage';
import { PropertyItem } from '@/types/api/property';
import { formatPropertyPrice } from '@/utils/property-price';

interface SimilarPropertyProps {
  propertyType?: string;
  locality?: string;
  excludeId?: string;
}

const SimilarProperty = ({ propertyType, locality, excludeId }: SimilarPropertyProps) => {
  const { properties, isLoading, isError } = usePublicProperties({
    pageSize: 3, // Fetch 3 to ensure we have 2 after excluding current
    type: propertyType,
    locality: locality,
  });

  // Filter out the current property and limit to 2
  const filteredProperties = properties
    .filter((item) => item._id !== excludeId)
    .slice(0, 2);

  if (isLoading) {
    return (
      <div className='accordion-item'>
        <h2 className='accordion-header'>
          <button className='accordion-button' type='button'>
            Propiedades Similares
          </button>
        </h2>
        <div className='accordion-body'>
          <div className='text-center py-4'>
            <div className='spinner-border text-primary' role='status'>
              <span className='visually-hidden'>Cargando...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isError || filteredProperties.length === 0) {
    return null;
  }

  return (
    <div className='accordion-item'>
      <h2 className='accordion-header'>
        <button className='accordion-button' type='button' data-bs-toggle='collapse' data-bs-target='#collapseSimilar' aria-expanded='true' aria-controls='collapseSimilar'>
          Propiedades que podrían interesarte
        </button>
      </h2>
      <div id='collapseSimilar' className='accordion-collapse collapse show'>
        <div className='accordion-body'>
          <div className='similar-property'>
            <div className='row'>
              {filteredProperties.map((item: PropertyItem) => {
                const isRent = item.publishForRent;
                const priceData = isRent ? item.valueForRent : item.valueForSale;
                const tag = isRent ? 'EN ALQUILER' : 'EN VENTA';
                const thumb = item.imgCover?.thumbWeb || (item.img && item.img[0]?.thumb);

                return (
                  <div key={item._id} className='col-md-6 item'>
                    <div className='listing-card-one style-three border border-30 sm-mb-40'>
                      <div className='img-gallery p-15'>
                        <div className='position-relative border-20 overflow-hidden'>
                          <div className='tag bg-white text-dark fw-500 border-20' style={{ zIndex: 1 }}>{tag}</div>
                          <SafeImage src={thumb} className='w-100 border-20' alt={item.address} fallbackHeight={200} />
                          <Link href={`/listing_details_05/${item._id}`} className='btn-four inverse rounded-circle position-absolute'>
                            <i className='bi bi-arrow-up-right'></i>
                          </Link>
                        </div>
                      </div>
                      <div className='property-info pe-4 ps-4 pb-15'>
                        <Link href={`/listing_details_05/${item._id}`} className='title tran3s text-truncate d-block'>
                          {item.address}
                        </Link>
                        <div className='address m0 pb-5 text-truncate'>{item.locality?.name}, {item.province?.name}</div>
                        <div className='pl-footer m0 d-flex align-items-center justify-content-between'>
                          <strong className='price fw-500 color-dark'>
                            {formatPropertyPrice(priceData, isRent ? 'ARS' : 'USD')}
                          </strong>
                          <ul className='style-none d-flex action-icons'>
                            <li><Link href='#'><i className='fa-light fa-heart'></i></Link></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimilarProperty;
