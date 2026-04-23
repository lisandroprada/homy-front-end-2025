'use client';
import Image from 'next/image';
import SafeImage from '@/components/common/SafeImage';
import Link from 'next/link';
import ReactPaginate from 'react-paginate';
import NiceSelect from '@/ui/NiceSelect';
import {useState, useEffect, useCallback} from 'react';

// Importa las imágenes estáticas locales (estas SÍ se optimizan en Vercel, lo cual es lo ideal)
import icon from '@/assets/images/icon/icon_46.svg';
import featureIcon_1 from '@/assets/images/icon/icon_32.svg';
import featureIcon_2 from '@/assets/images/icon/icon_33.svg';
import featureIcon_3 from '@/assets/images/icon/icon_34.svg';
import DropdownOne from '@/components/search-dropdown/inner-dropdown/DropdownOne';
import {API_BASE_URL} from '@/utils/apiConfig';
import { formatPropertyPrice } from '@/utils/property-price';

const itemsPerPage = 6;

interface ListingFiveAreaProps {
  publishForSale?: boolean;
  publishForRent?: boolean;
  type?: string;
  locality?: string;
  price?: string;
}

const ListingFiveArea = ({publishForSale = false, publishForRent = false, type = '', locality = '', price = ''}: ListingFiveAreaProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState(type);
  const [selectedLocation, setSelectedLocation] = useState(locality);
  const [selectedBedrooms, setSelectedBedrooms] = useState('');
  const [selectedBathrooms, setSelectedBathrooms] = useState('');
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [filterForSale, setFilterForSale] = useState(publishForSale);
  const [filterForRent, setFilterForRent] = useState(publishForRent);

  const getInitialOperation = () => {
    if (publishForSale && !publishForRent) return 'sale';
    if (publishForRent && !publishForSale) return 'rent';
    return 'all';
  };

  // Sincronizar operación inicial con los parámetros de la URL
  useEffect(() => {
    if (publishForSale && !publishForRent) {
      setPendingOperation('sale');
      setSelectedOperation('sale');
    } else if (publishForRent && !publishForSale) {
      setPendingOperation('rent');
      setSelectedOperation('rent');
    } else {
      setPendingOperation('all');
      setSelectedOperation('all');
    }
  }, [publishForSale, publishForRent]);

  const [pendingSearch, setPendingSearch] = useState('');
  const [pendingType, setPendingType] = useState(type || '');
  const [pendingLocation, setPendingLocation] = useState(locality);
  const [pendingBedrooms, setPendingBedrooms] = useState('');
  const [pendingBathrooms, setPendingBathrooms] = useState('');
  const [pendingAmenities, setPendingAmenities] = useState<string[]>([]);
  const [pendingOperation, setPendingOperation] = useState(getInitialOperation());

  const [selectedOperation, setSelectedOperation] = useState(getInitialOperation());

  const buildSearchCriteria = useCallback(() => {
    const searchCriteria = [];
    const getValue = (value: any) => (typeof value === 'object' && value?.value !== undefined ? value.value : value);
    const typeValue = getValue(selectedType);
    if (typeValue && typeValue !== '') {
      searchCriteria.push({field: 'type', term: typeValue, operation: 'eq'});
    }
    const locationValue = getValue(selectedLocation);
    if (locationValue && locationValue !== '') {
      searchCriteria.push({field: 'locality', term: locationValue, operation: 'eq'});
    }
    if (search && search.trim() !== '') {
      searchCriteria.push({field: 'address', term: search, operation: 'contains'});
    }
    const bedroomValue = getValue(selectedBedrooms);
    if (bedroomValue && bedroomValue !== '') {
      searchCriteria.push({field: 'detailedDescription.bedrooms', term: bedroomValue, operation: 'eq'});
    }
    const bathroomValue = getValue(selectedBathrooms);
    if (bathroomValue && bathroomValue !== '') {
      searchCriteria.push({field: 'detailedDescription.bathrooms', term: bathroomValue, operation: 'eq'});
    }
    if (selectedAmenities && Array.isArray(selectedAmenities) && selectedAmenities.length > 0) {
      selectedAmenities.forEach((amenity) => {
        if (amenity && amenity.trim() !== '') {
          searchCriteria.push({field: 'specs', term: amenity, operation: 'contains'});
        }
      });
    }
    return searchCriteria;
  }, [selectedType, selectedLocation, search, selectedBedrooms, selectedBathrooms, selectedAmenities]);

  const [properties, setProperties] = useState<any[]>([]);
  const [meta, setMeta] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchProperties = useCallback(async () => {
    setIsLoading(true);
    setIsError(false);

    try {
      const params = new URLSearchParams();
      params.append('page', currentPage.toString());
      params.append('pageSize', itemsPerPage.toString());
      params.append('sort', '-createdAt');

      if (selectedOperation === 'sale') {
        params.append('publishForSale', 'true');
      } else if (selectedOperation === 'rent') {
        params.append('publishForRent', 'true');
      }

      const searchCriteria = buildSearchCriteria();
      searchCriteria.forEach((criterion, index) => {
        params.append(`search[criteria][${index}][field]`, criterion.field);
        params.append(`search[criteria][${index}][term]`, criterion.term);
        params.append(`search[criteria][${index}][operation]`, criterion.operation);
      });

      const url = `${API_BASE_URL}/property/public?${params.toString()}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setProperties(Array.isArray(data.items) ? data.items : []);
      setMeta(data.meta || null);
    } catch (error) {
      console.error('Error al obtener propiedades:', error);
      setIsError(true);
      setProperties([]);
      setMeta(null);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, buildSearchCriteria, selectedOperation]);

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  const handlePageClick = (event: any) => setCurrentPage(event.selected);
  const handleApplyFilters = () => {
    setSearch(pendingSearch);
    setSelectedType(pendingType);
    setSelectedLocation(pendingLocation);
    setSelectedBedrooms(pendingBedrooms);
    setSelectedBathrooms(pendingBathrooms);
    setSelectedAmenities(pendingAmenities);
    setSelectedOperation(pendingOperation);
    setCurrentPage(0);
  };
  const handlePendingSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => setPendingSearch(e.target.value);
  const handlePendingTypeChange = (option: any) => setPendingType(option?.value || option || '');
  const handlePendingOperationChange = (option: any) => setPendingOperation(option?.value || option || 'all');
  const handlePendingLocationChange = (option: any) => setPendingLocation(option?.value || option || '');
  const handlePendingBedroomChange = (option: any) => setPendingBedrooms(option?.value || option || '');
  const handlePendingBathroomChange = (option: any) => setPendingBathrooms(option?.value || option || '');
  const handlePendingAmenityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const amenity = e.target.value;
    setPendingAmenities((prev) => (prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]));
  };
  const handleResetFilter = () => {
    setPendingSearch('');
    setPendingType('');
    setPendingLocation('');
    setPendingBedrooms('');
    setPendingBathrooms('');
    setPendingAmenities([]);
    setPendingOperation('all');
    setSearch('');
    setSelectedType('');
    setSelectedLocation('');
    setSelectedBedrooms('');
    setSelectedBathrooms('');
    setSelectedAmenities([]);
    setSelectedOperation('all');
    setCurrentPage(0);
  };

  const getDetail = (item: any, field: string) => {
    // Si el campo existe directamente en el item (nivel superior), usarlo
    if (item[field] !== undefined && item[field] !== null) return item[field];
    
    if (!item.detailedDescription) return '-';
    if (typeof item.detailedDescription === 'string') {
      try {
        const obj = JSON.parse(item.detailedDescription);
        return obj[field] || '-';
      } catch {
        return '-';
      }
    }
    return item.detailedDescription[field] || '-';
  };

  useEffect(() => {
    if (meta && meta.totalItems === 0 && Array.isArray(selectedAmenities) && selectedAmenities.length === 2 && selectedAmenities[0] === '0' && selectedAmenities[1] === '0') {
      // Logic for price range slider (if any)
    }
  }, [meta, selectedAmenities]);

  // Scroll al top cuando cambian los filtros principales o los resultados
  useEffect(() => {
    window.scrollTo({top: 0, behavior: 'smooth'});
  }, [publishForSale, publishForRent, type, locality, price, properties.length]);

  return (
    <div className='property-listing-six pt-200 xl-pt-150 pb-200 xl-pb-120'>
      <div className='container container-large'>
        <div className='row'>
          <div className='col-lg-8'>
            <div className='ps-xxl-5'>
              <div className='listing-header-filter d-sm-flex justify-content-between align-items-center mb-40 lg-mb-30'>
                <div>
                  Mostrando{' '}
                  <span className='color-dark fw-500'>
                    {meta ? meta.currentPage * itemsPerPage + 1 : 0}–{meta ? meta.currentPage * itemsPerPage + properties.length : 0}
                  </span>{' '}
                  de <span className='color-dark fw-500'>{meta?.totalItems || 0}</span> resultados
                </div>
                <div className='d-flex align-items-center xs-mt-20'>
                  <div className='short-filter d-flex align-items-center'>
                    <div className='fs-16 me-2'>Ordenar by:</div>
                    <NiceSelect
                      className='nice-select rounded-0'
                      options={[
                        {value: 'locality', text: 'Ciudad'},
                        {value: 'type', text: 'Tipo'},
                        {value: 'best_match', text: 'Mejor Coincidencia'},
                        {value: 'price_low', text: 'Precio Bajo'},
                        {value: 'price_high', text: 'Precio Alto'},
                      ]}
                      defaultCurrent={0}
                      onChange={() => {}}
                      name=''
                      placeholder=''
                    />
                  </div>
                  <Link href='/listing_06' className='tran3s layout-change rounded-circle ms-auto ms-sm-3' data-bs-toggle='tooltip' title='Switch To List View'>
                    <i className='fa-regular fa-bars'></i>
                  </Link>
                </div>
              </div>

              <div className='row gx-xxl-5'>
                {isLoading && <div className='text-center w-100'>Cargando propiedades...</div>}
                {isError && <div className='text-center w-100 text-danger'>Error al cargar propiedades.</div>}
                {!isLoading &&
                  !isError &&
                  properties.map((item, index) => {
                    const isLote = item.type === 'lote' && Array.isArray(item.lots) && item.lots.length > 0;
                    const tag = item.publishForSale && item.publishForRent ? 'Venta | Alquiler' : (item.publishForSale ? 'Venta' : (item.publishForRent ? 'Alquiler' : (item.status || '')));

                    // Precio robusto usando la utilidad centralizada
                    const salePrice = formatPropertyPrice(item.valueForSale, 'USD');
                    const rentPrice = formatPropertyPrice(item.valueForRent, 'ARS');

                    let property_info: any[] = [];
                    
                    if (isLote) {
                      const lotCount = item.lots.length;
                      const surfaces = item.lots.map((l: any) => l.surface).filter((s: any) => s != null);
                      let surfaceText = '-';
                      if (surfaces.length > 1) {
                        const minS = Math.min(...surfaces);
                        const maxS = Math.max(...surfaces);
                        surfaceText = minS === maxS ? `${minS} m²` : `Desde ${minS} a ${maxS} m²`;
                      } else if (surfaces.length === 1) {
                        surfaceText = `${surfaces[0]} m²`;
                      }

                      const prices = item.lots.map((l: any) => l.price).filter((p: any) => p != null && p > 0);
                      let priceDisplay = 'Consultar';
                      if (prices.length > 0) {
                        const minP = Math.min(...prices);
                        const maxP = Math.max(...prices);
                        let currency = item.lots.find((l: any) => l.price > 0)?.currency || item.valueForSale?.currency || 'USD';
                        if (currency === 'Pesos') currency = 'ARS';
                        if (currency === 'Dólares') currency = 'USD';
                        
                        priceDisplay = minP === maxP ? `${currency} ${minP.toLocaleString('es-AR')}` : `Desde ${currency} ${minP.toLocaleString('es-AR')}`;
                      }

                      property_info = [
                        {icon: featureIcon_1, feature: 'lotes', total_feature: lotCount},
                        {icon: featureIcon_2, feature: '', total_feature: surfaceText},
                        {icon: featureIcon_3, feature: '', total_feature: priceDisplay},
                      ];
                    } else {
                      property_info = [
                        {icon: featureIcon_1, feature: 'm2', total_feature: item.specs?.coveredSquareMeters || item.specs?.totalSquareMeters || item.detailedDescription?.sqFt || '-'},
                        {icon: featureIcon_2, feature: 'hab.', total_feature: item.specs?.bedrooms ?? item.detailedDescription?.rooms ?? '-'},
                        {icon: featureIcon_3, feature: 'baños', total_feature: item.specs?.bathrooms ?? item.detailedDescription?.bathrooms ?? '-'},
                      ];
                    }

                    const coverImg = (typeof item.imgCover?.thumbWeb === 'string' && item.imgCover.thumbWeb) 
                      ? item.imgCover.thumbWeb 
                      : (Array.isArray(item.img) && item.img.length > 0 
                          ? (item.img.find((i: any) => i.thumbWeb)?.thumbWeb || item.img[0].thumb || '') 
                          : '');

                    const isPriority = currentPage === 0 && index < 2;

                    return (
                      <div key={item._id} className='col-md-6 d-flex mb-50 wow fadeInUp'>
                        <div className='listing-card-one style-two shadow-none h-100 w-100'>
                          <div className='img-gallery'>
                            <div className='position-relative overflow-hidden'>
                              <div
                                className='tag bg-white rounded-0 text-dark fw-500'
                                style={{
                                  position: 'absolute',
                                  top: 12,
                                  left: 12,
                                  zIndex: 2,
                                  minWidth: tag === 'Venta | Alquiler' ? 120 : undefined,
                                  textAlign: tag === 'Venta | Alquiler' ? 'center' : undefined,
                                  padding: '2px 10px',
                                  fontSize: 12,
                                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                                }}
                              >
                                {tag}
                              </div>
                              <SafeImage
                                src={coverImg}
                                width={400}
                                height={250}
                                className='w-100'
                                alt={item.address}
                                priority={isPriority}
                                style={{objectFit: 'cover', width: '100%', maxWidth: 400, minWidth: 400, height: 'auto', maxHeight: 250, minHeight: 250}}
                                fallbackHeight={250}
                              />
                            </div>
                          </div>
                          <div className='property-info pt-20'>
                            <Link
                              href={`/listing_details_05/${item._id}`}
                              className='title tran3s'
                              style={{display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'normal', lineHeight: '1.2em', minHeight: '2.4em'}}
                            >
                              {item.title || item.address}
                            </Link>
                            <div className='address'>{item.address}</div>
                            <ul className='style-none feature d-flex align-items-center pb-15 pt-5 justify-content-between flex-wrap'>
                              {property_info.map((info, idx) => (
                                <li key={idx} className='d-flex align-items-center'>
                                  <SafeImage src={info.icon} alt='' className='lazy-img icon me-2' width={20} height={20} />
                                  <span className='fs-16'>
                                    {info.total_feature} {info.feature}
                                  </span>
                                </li>
                              ))}
                            </ul>
                            <div className='pl-footer top-border bottom-border d-flex align-items-center justify-content-between'>
                              <div style={{display: 'flex', flexDirection: 'column', flex: 1}}>
                                {item.publishForSale && (
                                  <span className='fw-500 color-dark' style={{fontSize: '1rem'}}>
                                    Venta: {salePrice}
                                  </span>
                                )}
                                {item.publishForRent && (
                                  <span className='color-dark' style={{fontSize: '0.95rem', opacity: 0.85}}>
                                    Alquiler: {rentPrice}
                                  </span>
                                )}
                              </div>
                              <Link href={`/listing_details_05/${item._id}`} className='btn-four' style={{marginLeft: 12}}>
                                <i className='bi bi-arrow-up-right'></i>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
              {meta && typeof meta.totalPages === 'number' && meta.totalPages > 1 && (
                <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                  <ReactPaginate
                    breakLabel='...'
                    nextLabel={<SafeImage src={icon} alt='' className='ms-2' width={15} height={15} />}
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    pageCount={meta.totalPages}
                    forcePage={currentPage}
                    previousLabel={<SafeImage src={icon} alt='' className='ms-2' width={15} height={15} />}
                    renderOnZeroPageCount={null}
                    className='pagination-one square d-flex align-items-center justify-content-center justify-content-sm-start style-none pt-60 lg-pt-30'
                  />
                </div>
              )}
            </div>
          </div>

          <div className='col-lg-4 order-lg-first'>
            <div className='advance-search-panel dot-bg md-mt-80'>
              <div className='main-bg rounded-0'>
                <DropdownOne
                  handleSearchChange={handlePendingSearchChange}
                  handleBedroomChange={handlePendingBedroomChange}
                  handleBathroomChange={handlePendingBathroomChange}
                  handleResetFilter={handleResetFilter}
                  selectedAmenities={pendingAmenities}
                  handleAmenityChange={handlePendingAmenityChange}
                  handleLocationChange={handlePendingLocationChange}
                  handleTypeChange={handlePendingTypeChange}
                  handleOperationChange={handlePendingOperationChange}
                  searchValue={pendingSearch}
                  selectedType={pendingType}
                  selectedLocation={pendingLocation}
                  selectedBedrooms={pendingBedrooms}
                  selectedBathrooms={pendingBathrooms}
                  selectedOperation={pendingOperation}
                  onApplyFilters={handleApplyFilters}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingFiveArea;
