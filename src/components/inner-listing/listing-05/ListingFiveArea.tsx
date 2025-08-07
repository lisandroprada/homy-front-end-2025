'use client';
import Image from 'next/image';
import Link from 'next/link';
import ReactPaginate from 'react-paginate';
import NiceSelect from '@/ui/NiceSelect';
import {usePublicProperties} from '@/services/api/usePublicProperties';
import {useState, useEffect} from 'react';

import icon from '@/assets/images/icon/icon_46.svg';
import featureIcon_1 from '@/assets/images/icon/icon_32.svg';
import featureIcon_2 from '@/assets/images/icon/icon_33.svg';
import featureIcon_3 from '@/assets/images/icon/icon_34.svg';
import DropdownOne from '@/components/search-dropdown/inner-dropdown/DropdownOne';

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
  // Nuevo: flags de venta/alquiler
  const [filterForSale, setFilterForSale] = useState(publishForSale);
  const [filterForRent, setFilterForRent] = useState(publishForRent);

  // Estado para filtros temporales (sidebar)
  const [pendingSearch, setPendingSearch] = useState('');
  const [pendingType, setPendingType] = useState('');
  const [pendingLocation, setPendingLocation] = useState('');
  const [pendingBedrooms, setPendingBedrooms] = useState('');
  const [pendingBathrooms, setPendingBathrooms] = useState('');
  const [pendingAmenities, setPendingAmenities] = useState<string[]>([]);

  // Construye los filtros para el backend
  const filters: any = {};
  if (search) filters.address = search;
  if (selectedType) filters.type = selectedType;
  if (selectedLocation) filters.locality = selectedLocation;
  if (selectedBedrooms) filters['detailedDescription.rooms'] = selectedBedrooms;
  if (selectedBathrooms) filters['detailedDescription.bathrooms'] = selectedBathrooms;
  // Nuevo: filtra por venta/alquiler según flags
  if (filterForSale) filters.publishForSale = true;
  if (filterForRent) filters.publishForRent = true;
  // Amenities: si el backend soporta, agregar aquí

  const {properties, meta, isLoading, isError} = usePublicProperties({
    page: currentPage,
    pageSize: itemsPerPage,
    sort: '-createdAt',
    ...filters,
  });

  const handlePageClick = (event: any) => {
    setCurrentPage(event.selected);
  };

  // Aplica los filtros al hacer submit
  const handleApplyFilters = () => {
    setSearch(pendingSearch);
    setSelectedType(pendingType);
    setSelectedLocation(pendingLocation);
    setSelectedBedrooms(pendingBedrooms);
    setSelectedBathrooms(pendingBathrooms);
    setSelectedAmenities(pendingAmenities);
    setCurrentPage(0);
  };

  // Handlers para los inputs del sidebar (solo actualizan el estado temporal)
  const handlePendingSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => setPendingSearch(e.target.value);
  const handlePendingTypeChange = (value: string) => setPendingType(value);
  // Elimina handlePendingStatusChange, ya no se usa
  const handlePendingLocationChange = (value: string) => setPendingLocation(value);
  const handlePendingBedroomChange = (value: string) => setPendingBedrooms(value);
  const handlePendingBathroomChange = (value: string) => setPendingBathrooms(value);
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
  };

  // Corrige: detailedDescription puede ser string o objeto
  const getDetail = (item: any, field: string) => {
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

  // Evita errores de rango en el slider si no hay propiedades
  useEffect(() => {
    if (meta && meta.totalItems === 0 && Array.isArray(selectedAmenities) && selectedAmenities.length === 2 && selectedAmenities[0] === '0' && selectedAmenities[1] === '0') {
      // Si no hay propiedades, setea un rango por defecto para evitar RangeError
      // Si tienes un setPriceValue del hook, descomenta la siguiente línea:
      // setPriceValue([0, 100000]);
    }
  }, [meta, selectedAmenities]);

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
                  of <span className='color-dark fw-500'>{meta?.totalItems || 0}</span> results
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
                  properties.map((item) => {
                    // Corrige: detailedDescription puede ser string o objeto (igual que PropertyOne)
                    let detailed: any = {};
                    if (typeof item.detailedDescription === 'string') {
                      try {
                        detailed = JSON.parse(item.detailedDescription);
                      } catch {
                        detailed = {};
                      }
                    } else if (item.detailedDescription && typeof item.detailedDescription === 'object') {
                      detailed = item.detailedDescription;
                    }
                    // valueForSale y valueForRent pueden ser undefined o un objeto
                    const valueForSale: any = item.valueForSale && typeof item.valueForSale === 'object' ? item.valueForSale : {};
                    const valueForRent: any = item.valueForRent && typeof item.valueForRent === 'object' ? item.valueForRent : {};
                    // Badge: Venta, Alquiler, Venta | Alquiler, etc.
                    let tag = '';
                    if (item.publishForSale && item.publishForRent) {
                      tag = 'Venta | Alquiler';
                    } else if (item.publishForSale) {
                      tag = 'Venta';
                    } else if (item.publishForRent) {
                      tag = 'Alquiler';
                    } else {
                      tag = item.status || '';
                    }
                    const mapped = {
                      id: item._id,
                      tag,
                      title: detailed && typeof detailed === 'object' && 'title' in detailed ? detailed.title : '',
                      address: item.address,
                      property_info: [
                        {
                          icon: featureIcon_1,
                          feature: 'm2',
                          total_feature: detailed && typeof detailed === 'object' && 'sqFt' in detailed ? detailed.sqFt : '',
                        },
                        {
                          icon: featureIcon_2,
                          feature: 'habitaciones',
                          total_feature: detailed && typeof detailed === 'object' && 'rooms' in detailed ? detailed.bedrooms : '',
                        },
                        {
                          icon: featureIcon_3,
                          feature: 'baños',
                          total_feature: detailed && typeof detailed === 'object' && 'bathrooms' in detailed ? detailed.bathrooms : '',
                        },
                      ],
                      sale: {
                        show: item.publishForSale,
                        price: valueForSale && valueForSale.pricePublic ? valueForSale.amount : undefined,
                        currency: valueForSale && valueForSale.pricePublic && valueForSale.currency ? valueForSale.currency : '',
                      },
                      rent: {
                        show: item.publishForRent,
                        price: valueForRent && valueForRent.pricePublic ? valueForRent.amount : undefined,
                        currency: valueForRent && valueForRent.pricePublic && valueForRent.currency ? valueForRent.currency : '',
                      },
                      imgCover: item.imgCover?.thumbWeb,
                    };
                    // Lógica robusta para imagen de portada:
                    // Si imgCover?.thumbWeb existe y es string, úsala.
                    // Si no, busca la primera imagen válida en item.img[].thumbWeb o thumb.
                    let coverImg = '';
                    if (item.imgCover && typeof item.imgCover.thumbWeb === 'string' && item.imgCover.thumbWeb) {
                      coverImg = item.imgCover.thumbWeb;
                    } else if (Array.isArray(item.img) && item.img.length > 0) {
                      // Busca thumbWeb usando acceso por índice para evitar error de tipado estricto
                      let found = false;
                      for (let i = 0; i < item.img.length; i++) {
                        const img = item.img[i];
                        if (img && typeof img === 'object' && 'thumbWeb' in img && typeof img.thumbWeb === 'string' && img.thumbWeb) {
                          coverImg = img.thumbWeb;
                          found = true;
                          break;
                        }
                      }
                      if (!found) {
                        for (let i = 0; i < item.img.length; i++) {
                          const img = item.img[i];
                          if (img && typeof img === 'object' && 'thumb' in img && typeof img.thumb === 'string' && img.thumb) {
                            coverImg = img.thumb;
                            break;
                          }
                        }
                      }
                    }
                    mapped.imgCover = coverImg;
                    return (
                      <div key={mapped.id} className='col-md-6 d-flex mb-50 wow fadeInUp'>
                        <div className='listing-card-one style-two shadow-none h-100 w-100'>
                          <div className='img-gallery'>
                            <div className='position-relative overflow-hidden'>
                              {/* Badge tipo publicación */}
                              <div
                                className='tag bg-white rounded-0 text-dark fw-500'
                                style={{
                                  position: 'absolute',
                                  top: 12,
                                  left: 12,
                                  zIndex: 2,
                                  minWidth: mapped.tag === 'Venta | Alquiler' ? 120 : undefined,
                                  textAlign: mapped.tag === 'Venta | Alquiler' ? 'center' : undefined,
                                  whiteSpace: 'nowrap',
                                  fontFamily: 'Gordita, sans-serif',
                                  fontSize: 12,
                                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                                  padding: '2px 10px',
                                }}
                              >
                                {mapped.tag}
                              </div>
                              {mapped.imgCover && typeof mapped.imgCover === 'string' && (mapped.imgCover.startsWith('http') || mapped.imgCover.startsWith('/')) ? (
                                <Image
                                  src={mapped.imgCover.startsWith('http') ? mapped.imgCover : `/${mapped.imgCover.replace(/^\/+/, '')}`}
                                  width={400}
                                  height={250}
                                  className='w-100'
                                  alt={mapped.address}
                                  priority
                                  style={{objectFit: 'cover', width: '100%', maxWidth: 400, minWidth: 400, height: 'auto', maxHeight: 250, minHeight: 250}}
                                />
                              ) : (
                                <div style={{width: '100%', height: 250, minHeight: 250, maxHeight: 250, background: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                  <span>Sin imagen</span>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className='property-info pt-20'>
                            <Link
                              href={`/listing_details_05/${mapped.id}`}
                              className='title tran3s'
                              style={{display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'normal', lineHeight: '1.2em', minHeight: '2.4em'}}
                            >
                              {mapped.title || mapped.address}
                            </Link>
                            <div className='address'>{mapped.address}</div>
                            <ul className='style-none feature d-flex flex-wrap align-items-center justify-content-between pb-15 pt-5'>
                              {mapped.property_info.map((info, index) => (
                                <li key={index} className='d-flex align-items-center'>
                                  <Image src={info.icon} alt='' className='lazy-img icon me-2' width={20} height={20} />
                                  <span className='fs-16'>
                                    {info.total_feature} {info.feature}
                                  </span>
                                </li>
                              ))}
                            </ul>
                            <div className='pl-footer top-border bottom-border d-flex align-items-center justify-content-between'>
                              <div style={{display: 'flex', flexDirection: 'column', flex: 1}}>
                                {mapped.sale.show && (
                                  <span className='fw-500 color-dark' style={{fontSize: '1rem'}}>
                                    Venta:{' '}
                                    {mapped.sale.price
                                      ? `${mapped.sale.currency ? mapped.sale.currency + ' ' : ''}${mapped.sale.price.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`
                                      : 'Consultar'}
                                  </span>
                                )}
                                {mapped.rent.show && (
                                  <span className='color-dark' style={{fontSize: '0.95rem', opacity: 0.85}}>
                                    Alquiler:{' '}
                                    {mapped.rent.price
                                      ? `${mapped.rent.currency ? mapped.rent.currency + ' ' : ''}${mapped.rent.price.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`
                                      : 'Consultar'}
                                  </span>
                                )}
                              </div>
                              <Link href={`/listing_details_05/${mapped.id}`} className='btn-four' style={{marginLeft: 12}}>
                                <i className='bi bi-arrow-up-right'></i>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
              {/* Muestra la paginación solo si meta existe y meta.totalPages > 1 y meta.totalPages es un número válido */}
              {meta && typeof meta.totalPages === 'number' && meta.totalPages > 1 && (
                <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                  <ReactPaginate
                    breakLabel='...'
                    nextLabel={<Image src={icon} alt='' className='ms-2' />}
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    pageCount={meta.totalPages}
                    forcePage={currentPage}
                    previousLabel={<Image src={icon} alt='' className='ms-2' />}
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
                  searchValue={pendingSearch}
                  selectedType={pendingType}
                  selectedLocation={pendingLocation}
                  selectedBedrooms={pendingBedrooms}
                  selectedBathrooms={pendingBathrooms}
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
