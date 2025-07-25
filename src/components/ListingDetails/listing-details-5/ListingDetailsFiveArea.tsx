'use client';
import property_feature_list from '@/data/inner-data/PropertyFeatureListData';
import RentalRequirementsArea from '../listing-details-common/RentalRequirementsArea';
import CommonBanner from '../listing-details-common/CommonBanner';
import MediaGallery from './MediaGallery';
import PropertyOverview from './PropertyOverview';
import VideoTour from './VideoTour';
import FloorPlan from './FloorPlan';
import NearbyList from './NearbyList';
import SimilarProperty from './SimilarProperty';
import ProPertyScore from '../listing-details-3/ProPertyScore';
import MortgageCalculator from './MortgageCalculator';
import Location from './Location';
import ReviewArea from './ReviewArea';
import ReviewFormArea from './ReviewFormArea';
import Sidebar from '../listing-details-1/Sidebar';

const ammenities_data = [
  {key: 'aire_acondicionado', iconClass: 'fa-solid fa-wind', label: 'Aire Acondicionado'},
  {key: 'calefaccion', iconClass: 'bi-thermometer-sun', label: 'Calefacción'},
  {key: 'portero', iconClass: 'bi-door-closed', label: 'Portero'},
  {key: 'ascensor', iconClass: 'fa-solid fa-elevator', label: 'Ascensor'}, // Si no existe fa-elevator, usar 'bi-building'
  {key: 'cochera', iconClass: 'bi-car-front', label: 'Cochera'},
  {key: 'piscina', iconClass: 'bi-water', label: 'Piscina'},
  {key: 'jardin', iconClass: 'bi-flower1', label: 'Jardín'},
  {key: 'parrilla', iconClass: 'fa-solid fa-fire', label: 'Parrilla'},
  {key: 'balcon', iconClass: 'bi-building', label: 'Balcón'},
  {key: 'terraza', iconClass: 'bi-sunset', label: 'Terraza'},
  {key: 'lavadero', iconClass: 'bi-basket', label: 'Lavadero'},
  {key: 'baulera', iconClass: 'bi-box', label: 'Baulera'},
  {key: 'sum', iconClass: 'bi-people', label: 'SUM'},
  {key: 'gimnasio', iconClass: 'fa-solid fa-dumbbell', label: 'Gimnasio'},
  {key: 'seguridad_24h', iconClass: 'bi-shield-lock', label: 'Seguridad 24h'},
];

interface ListingDetailsFiveAreaProps {
  property: any;
}

const ListingDetailsFiveArea = ({property}: ListingDetailsFiveAreaProps) => {
  return (
    <div className='listing-details-one theme-details-one mt-130 lg-mt-100 pb-150 xl-pb-120'>
      <MediaGallery property={property} />
      <div className='container'>
        <CommonBanner style_3={true} property={property} />
        <div className='property-feature-list position-relative z-2 mt-65 mb-75'>
          <div className='dark-bg ps-3 ps-md-5 pe-3 pt-30 pb-30'>
            <PropertyOverview property={property} />
          </div>
        </div>

        <div className='row'>
          <div className='col-xl-8'>
            <div className='accordion-style-two full-accordion'>
              <div className='accordion' id='accordionTwo'>
                <div className='accordion-item'>
                  <h2 className='accordion-header'>
                    <button className='accordion-button' type='button' data-bs-toggle='collapse' data-bs-target='#collapseOneA' aria-expanded='false' aria-controls='collapseOneA'>
                      Descripción
                    </button>
                  </h2>
                  <div id='collapseOneA' className='accordion-collapse collapse show'>
                    <div className='accordion-body'>
                      <p className='fs-20 lh-lg m0'>{property?.detailedDescription?.brief || property?.detailedDescription?.title || property?.address}</p>
                    </div>
                  </div>
                </div>

                <div className='accordion-item'>
                  <h2 className='accordion-header'>
                    <button className='accordion-button collapsed' type='button' data-bs-toggle='collapse' data-bs-target='#collapseTwoA' aria-expanded='false' aria-controls='collapseTwoA'>
                      Características de la propiedad
                    </button>
                  </h2>
                  <div id='collapseTwoA' className='accordion-collapse collapse'>
                    <div className='accordion-body'>
                      {/* Renderizado limpio de características usando property.detailedDescription */}
                      {property?.detailedDescription ? (
                        <div className='feature-list-two'>
                          <ul className='style-none d-flex flex-wrap justify-content-between'>
                            <li>
                              <span>Ambientes </span> <span className='fw-500 color-dark'>{property.detailedDescription.rooms ?? '-'}</span>
                            </li>
                            <li>
                              <span>Dormitorios </span> <span className='fw-500 color-dark'>{property.detailedDescription.bedrooms ?? '-'}</span>
                            </li>
                            <li>
                              <span>Baños </span> <span className='fw-500 color-dark'>{property.detailedDescription.bathrooms ?? '-'}</span>
                            </li>
                            <li>
                              <span>Superficie total </span> <span className='fw-500 color-dark'>{property.detailedDescription.sqFt ? property.detailedDescription.sqFt + ' m²' : '-'}</span>
                            </li>
                            <li>
                              <span>Antigüedad </span> <span className='fw-500 color-dark'>{property.detailedDescription.age ? property.detailedDescription.age + ' años' : '-'}</span>
                            </li>
                            <li>
                              <span>Orientación </span> <span className='fw-500 color-dark'>{property.detailedDescription.orientation ?? '-'}</span>
                            </li>
                            <li className='mb-0'>
                              <span>Pet Friendly </span>{' '}
                              <span className='fw-500 color-dark'>{property.detailedDescription.petFriendly !== undefined ? (property.detailedDescription.petFriendly ? 'Sí' : 'No') : '-'}</span>
                            </li>
                          </ul>
                        </div>
                      ) : (
                        <span className='text-muted'>Sin características registradas</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className='accordion-item'>
                  <h2 className='accordion-header'>
                    <button className='accordion-button collapsed' type='button' data-bs-toggle='collapse' data-bs-target='#collapseThreeA' aria-expanded='true' aria-controls='collapseThreeA'>
                      Comodidades
                    </button>
                  </h2>
                  <div id='collapseThreeA' className='accordion-collapse collapse'>
                    <div className='accordion-body'>
                      {property?.specs && property.specs.length > 0 ? (
                        <div className='row'>
                          {property.specs.map((item: string, i: number) => {
                            const amenity = ammenities_data.find((a) => a.key === item.toLowerCase());
                            return (
                              <div className='col-6 col-md-4 mb-2' key={i}>
                                <li className='list-unstyled py-1 px-2 bg-light rounded-2 d-inline-block w-100 mb-1 d-flex align-items-center'>
                                  {amenity && <i className={`${amenity.iconClass} me-2`} style={{fontSize: '1.1em', minWidth: 18}}></i>}
                                  {amenity ? amenity.label : item}
                                </li>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <span className='text-muted'>Sin comodidades registradas</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* <VideoTour /> */}
                {property?.publishForRent && <RentalRequirementsArea />}
                {property?.floorPlans && property.floorPlans.length > 0 && <FloorPlan floorPlans={property.floorPlans} />}
                {/* <NearbyList /> */}
                {/* <SimilarProperty /> */}
                {/* <ProPertyScore /> */}
                {/* <MortgageCalculator /> */}
                <Location property={property} />
                {/* <ReviewArea /> */}
                <ReviewFormArea />
              </div>
            </div>
          </div>
          <Sidebar property={property} />
        </div>
      </div>
    </div>
  );
};

export default ListingDetailsFiveArea;
