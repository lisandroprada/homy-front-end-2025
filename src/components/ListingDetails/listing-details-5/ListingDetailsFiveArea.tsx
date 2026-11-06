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
import LoteInformation from './LoteInformation';
import {getPropertySpaceEntries, getPropertySpaces} from '@/utils/property-spaces';

const AMENITY_LABELS = new Map([
  ['aire_acondicionado', 'Aire Acondicionado'],
  ['calefaccion', 'Calefacción'],
  ['portero', 'Portero'],
  ['ascensor', 'Ascensor'],
  ['cochera', 'Cochera'],
  ['piscina', 'Piscina'],
  ['jardin', 'Jardín'],
  ['parrilla', 'Parrilla'],
  ['balcon', 'Balcón'],
  ['terraza', 'Terraza'],
  ['lavadero', 'Lavadero'],
  ['baulera', 'Baulera'],
  ['sum', 'SUM'],
  ['gimnasio', 'Gimnasio'],
  ['seguridad_24h', 'Seguridad 24h'],
]);

const SPACE_ICONS = new Map([
  ['living', 'bi-house-door'],
  ['living_comedor', 'bi-house-door'],
  ['cocina', 'bi-cup-hot'],
  ['cocina_comedor', 'bi-cup-hot'],
  ['dormitorio', 'bi-moon'],
  ['escritorio', 'bi-laptop'],
  ['vestidor', 'bi-door-closed'],
  ['salon_comercial', 'bi-shop'],
  ['vidriera', 'bi-shop-window'],
  ['carteleria', 'bi-signpost'],
  ['mostrador', 'bi-person-workspace'],
  ['probador', 'bi-door-closed'],
  ['entrepiso', 'bi-layers'],
  ['bano', 'bi-droplet'],
  ['bano_suite', 'bi-droplet'],
  ['bano_accesible', 'bi-universal-access'],
  ['toilette', 'bi-droplet'],
  ['lavadero', 'bi-basket'],
  ['deposito', 'bi-box-seam'],
  ['patio', 'bi-sun'],
  ['patio_fogon', 'bi-fire'],
  ['jardin', 'bi-flower1'],
  ['jardin_parquizado', 'bi-flower1'],
  ['quincho', 'bi-house'],
  ['balcon', 'bi-building'],
  ['terraza', 'bi-sunset'],
  ['piscina', 'bi-water'],
  ['piscina_climatizada', 'bi-thermometer-sun'],
  ['hall_entrada', 'bi-door-open'],
  ['cochera', 'bi-car-front'],
  ['entrada_auto', 'bi-car-front'],
  ['acceso_compartido', 'bi-people'],
  ['patio_compartido', 'bi-sun'],
  ['persiana_metalica', 'bi-view-stacked'],
  ['acceso_carga_descarga', 'bi-truck'],
  ['aire_acondicionado', 'bi-wind'],
  ['calefaccion', 'bi-thermometer-sun'],
  ['portero', 'bi-door-closed'],
  ['ascensor', 'bi-arrows-vertical'],
  ['parrilla', 'bi-fire'],
  ['baulera', 'bi-box'],
  ['sum', 'bi-people'],
  ['gimnasio', 'bi-activity'],
  ['seguridad_24h', 'bi-shield-lock'],
  ['seguridad_24hs', 'bi-shield-lock'],
]);

interface ListingDetailsFiveAreaProps {
  property: any;
}

const ListingDetailsFiveArea = ({property}: ListingDetailsFiveAreaProps) => {
  const spaces = getPropertySpaces(property?.spaces, property?.specs);
  const amenities = (property?.amenities ?? []).map((name: string) => AMENITY_LABELS.get(name.toLowerCase()) ?? name);
  const entries = getPropertySpaceEntries(spaces, amenities);
  return (
    <div className='listing-details-one theme-details-one mt-130 lg-mt-100 pb-150 xl-pb-120'>
      {/* Línea 46: solo si es lote */}
      {property?.type === 'lote' && (
        <div className='container border-bottom border-2 pb-4 mb-4'>
          <LoteInformation property={property} />
        </div>
      )}

      <div className='container'>{property?.type === 'lote' && <CommonBanner style_3={true} property={property} />}</div>

      {/* Línea 51: solo si NO es lote */}
      <MediaGallery property={property} />
      <div className='container'>
        {property?.type !== 'lote' && <CommonBanner style_3={true} property={property} />}
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
                      <div className='fs-20 lh-lg m0' dangerouslySetInnerHTML={{ __html: property?.detailedDescription || property?.title || property?.address || '' }} />
                    </div>
                  </div>
                </div>

                {property?.type !== 'lote' && (
                  <div className='accordion-item'>
                    <h2 className='accordion-header'>
                      <button className='accordion-button collapsed' type='button' data-bs-toggle='collapse' data-bs-target='#collapseTwoA' aria-expanded='false' aria-controls='collapseTwoA'>
                        Características de la propiedad
                      </button>
                    </h2>
                    <div id='collapseTwoA' className='accordion-collapse collapse'>
                      <div className='accordion-body'>
                        {/* Renderizado limpio de características usando property.detailedDescription */}
                        {property?.specs ? (
                          <div className='feature-list-two'>
                            <ul className='style-none d-flex flex-wrap justify-content-between'>
                              <li>
                                <span>Ambientes </span> <span className='fw-500 color-dark'>{property.specs.rooms ?? '-'}</span>
                              </li>
                              <li>
                                <span>Dormitorios </span> <span className='fw-500 color-dark'>{property.specs.bedrooms ?? '-'}</span>
                              </li>
                              <li>
                                <span>Baños </span> <span className='fw-500 color-dark'>{property.specs.bathrooms ?? '-'}</span>
                              </li>
                              <li>
                                <span>Superficie total </span> <span className='fw-500 color-dark'>{property.specs.coveredSquareMeters ? property.specs.coveredSquareMeters + ' m²' : (property.specs.totalSquareMeters ? property.specs.totalSquareMeters + ' m²' : '-')}</span>
                              </li>
                              <li>
                                <span>Antigüedad </span> <span className='fw-500 color-dark'>{property.specs.age ? property.specs.age + ' años' : '-'}</span>
                              </li>
                              <li>
                                <span>Orientación </span> <span className='fw-500 color-dark'>{property.orientation ?? '-'}</span>
                              </li>
                              <li className='mb-0'>
                                <span>Pet Friendly </span>{' '}
                                <span className='fw-500 color-dark'>-</span>
                              </li>
                            </ul>
                          </div>
                        ) : (
                          <span className='text-muted'>Sin características registradas</span>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                <div className='accordion-item'>
                  <h2 className='accordion-header'>
                    <button className='accordion-button' type='button' data-bs-toggle='collapse' data-bs-target='#collapseSpacesA' aria-expanded='true' aria-controls='collapseSpacesA'>
                      Ambientes y espacios
                    </button>
                  </h2>
                  <div id='collapseSpacesA' className='accordion-collapse collapse show'>
                    <div className='accordion-body'>
                      {entries.length > 0 ? (
                        <ul className='row list-unstyled mb-0' aria-label='Ambientes y espacios de la propiedad'>
                          {entries.map(({key, label, quantity}) => {
                            const type = key.startsWith('amenity:') ? key.slice('amenity:'.length).replaceAll(' ', '_') : key;
                            const icon = SPACE_ICONS.get(type) ?? 'bi-grid';
                            return (
                              <li className='col-12 col-sm-6 mb-2' key={key}>
                                <span className='d-flex align-items-baseline gap-2 py-2 px-3 bg-light rounded-2'>
                                  <i className={`bi ${icon} flex-shrink-0 color-dark`} aria-hidden='true' />
                                  <span>{quantity !== undefined && <strong className='color-dark me-2'>{quantity}</strong>}{label}</span>
                                </span>
                              </li>
                            );
                          })}
                        </ul>
                      ) : (
                        <span className='text-muted'>Sin ambientes y espacios registrados</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* <VideoTour /> */}
                {property?.publishForRent && <RentalRequirementsArea />}
                {property?.floorPlans && property.floorPlans.length > 0 && <FloorPlan floorPlans={property.floorPlans} />}
                {/* <NearbyList /> */}
                <SimilarProperty 
                  propertyType={property?.type} 
                  locality={property?.locality?._id} 
                  excludeId={property?._id} 
                />
                {/* <ProPertyScore /> */}
                {/* <MortgageCalculator /> */}
                <Location property={property} />
                {/* <ReviewArea /> */}
                {/* <ReviewFormArea /> */}
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
