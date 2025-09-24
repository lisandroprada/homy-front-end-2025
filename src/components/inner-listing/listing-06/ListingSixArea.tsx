'use client';
import Image from 'next/image';
import Link from 'next/link';
import ReactPaginate from 'react-paginate';
import NiceSelect from '@/ui/NiceSelect';
import {useState} from 'react';
import {usePublicProperties} from '@/services/api/usePublicProperties';
import DropdownOne from '@/components/search-dropdown/inner-dropdown/DropdownOne';

import icon from '@/assets/images/icon/icon_46.svg';
import Fancybox from '@/components/common/Fancybox';

const ListingSixArea = () => {
  const itemsPerPage = 5;
  // Estados para filtros y paginación
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedBedrooms, setSelectedBedrooms] = useState('');
  const [selectedBathrooms, setSelectedBathrooms] = useState('');
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  // Filtros para el backend
  const filters: any = {};
  if (search) filters.address = search;
  if (selectedType) filters.type = selectedType;
  if (selectedStatus && typeof selectedStatus === 'string' && selectedStatus.trim() !== '') filters.status = selectedStatus;
  if (selectedLocation) filters.locality = selectedLocation;
  if (selectedBedrooms) filters['detailedDescription.rooms'] = selectedBedrooms;
  if (selectedBathrooms) filters['detailedDescription.bathrooms'] = selectedBathrooms;
  // Amenities: si el backend soporta, agregar aquí

  const {properties, meta, isLoading, isError} = usePublicProperties({
    page: currentPage,
    pageSize: itemsPerPage,
    sort: '-createdAt',
    ...filters,
  });

  // Handlers para filtros
  const handlePageClick = (event: any) => {
    setCurrentPage(event.selected);
  };
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value);
  const handleTypeChange = (value: string) => setSelectedType(value);
  const handleStatusChange = (value: string) => setSelectedStatus(value);
  const handleLocationChange = (value: string) => setSelectedLocation(value);
  const handleBedroomChange = (value: string) => setSelectedBedrooms(value);
  const handleBathroomChange = (value: string) => setSelectedBathrooms(value);
  const handleAmenityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const amenity = e.target.value;
    setSelectedAmenities((prev) => (prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]));
  };
  const handleResetFilter = () => {
    setSearch('');
    setSelectedType('');
    setSelectedStatus('');
    setSelectedLocation('');
    setSelectedBedrooms('');
    setSelectedBathrooms('');
    setSelectedAmenities([]);
    setCurrentPage(0);
  };

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
                    <div className='fs-16 me-2'>Short by:</div>
                    <NiceSelect
                      className='nice-select rounded-0'
                      options={[
                        {value: 'newest', text: 'Newest'},
                        {value: 'best_seller', text: 'Best Seller'},
                        {value: 'best_match', text: 'Best Match'},
                        {value: 'price_low', text: 'Price Low'},
                        {value: 'price_high', text: 'Price High'},
                      ]}
                      defaultCurrent={0}
                      onChange={(e: any) => handleTypeChange(e.target ? e.target.value : e)}
                      name=''
                      placeholder=''
                    />
                  </div>
                  <Link href='/listing_05' className='tran3s layout-change rounded-circle ms-auto ms-sm-3' data-bs-toggle='tooltip' title='Switch To Grid View'>
                    <i className='fa-regular fa-grid-2'></i>
                  </Link>
                </div>
              </div>

              {isLoading && <div className='text-center w-100'>Cargando propiedades...</div>}
              {isError && <div className='text-center w-100 text-danger'>Error al cargar propiedades.</div>}
              {!isLoading &&
                !isError &&
                properties.map((item: any) => {
                  // detailedDescription puede ser string o objeto
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
                  // valueForSale puede ser undefined o un objeto
                  const valueForSale: any = item.valueForSale && typeof item.valueForSale === 'object' ? item.valueForSale : {};
                  // Lógica robusta para imagen de portada y galería
                  let coverImg = '';
                  if (item.imgCover && typeof item.imgCover.thumbWeb === 'string' && item.imgCover.thumbWeb) {
                    coverImg = item.imgCover.thumbWeb;
                  } else if (Array.isArray(item.img) && item.img.length > 0) {
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
                  // Carrusel de imágenes: usar item.img[]
                  const carousel_thumb = Array.isArray(item.img)
                    ? item.img
                        .map((img: any, idx: number) => ({
                          id: idx + 1,
                          url: img.thumbWeb || img.thumb || '',
                        }))
                        .filter((img: any) => img.url)
                    : [];
                  // Badge: Venta, Alquiler, Venta | Alquiler
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
                  const isLote = item.type === 'lote' && item.lots && Array.isArray(item.lots) && item.lots.length > 0;

                  let sale_price: number | string | undefined = valueForSale && valueForSale.pricePublic ? valueForSale.amount : undefined;
                  let sale_currency: string = valueForSale && valueForSale.pricePublic && valueForSale.currency ? valueForSale.currency : '';
                  let property_info: any;

                  if (isLote) {
                    const lots = item.lots;
                    const lotCount = lots.length;

                    // Surface
                    const surfaces = lots.map((l: any) => l.surface).filter((s: any) => s != null);
                    let surfaceText = '-';
                    if (surfaces.length > 1) {
                      const minSurface = Math.min(...surfaces);
                      const maxSurface = Math.max(...surfaces);
                      surfaceText = `Desde ${minSurface} a ${maxSurface} m²`;
                    } else if (surfaces.length === 1) {
                      surfaceText = `${surfaces[0]} m²`;
                    }

                    // Price
                    const lotsWithPrice = lots.filter((l: any) => l.price != null);
                    if (lotsWithPrice.length > 1) {
                      const prices = lotsWithPrice.map((l: any) => l.price);
                      const minPrice = Math.min(...prices);
                      const maxPrice = Math.max(...prices);
                      sale_currency = lotsWithPrice[0].currency || item.valueForSale?.currency || 'USD';
                      sale_price = `Desde ${minPrice.toLocaleString()} a ${maxPrice.toLocaleString()}`;
                    } else if (lotsWithPrice.length === 1) {
                      sale_currency = lotsWithPrice[0].currency || item.valueForSale?.currency || 'USD';
                      sale_price = lotsWithPrice[0].price;
                    } else {
                      sale_price = undefined; // Consultar
                    }

                    let valueText = 'Consultar';
                    if (lotsWithPrice.length > 0) {
                      if (typeof sale_price === 'string') {
                        valueText = `${sale_currency} ${sale_price}`;
                      } else if (typeof sale_price === 'number') {
                        valueText = `${sale_currency} ${sale_price.toLocaleString()}`;
                      }
                    }

                    property_info = {
                      lotCount: lotCount,
                      surfaceText: surfaceText,
                      valueText: valueText,
                    };
                  } else {
                    property_info = {
                      buildSqFt: detailed?.buildSqFt ?? '-',
                      bed: detailed?.bedrooms ?? '-',
                      bath: detailed?.bathrooms ?? '-',
                      kitchen: detailed?.kitchen ?? '-',
                    };
                  }
                  // Precio
                  const price = sale_price;
                  const price_text = sale_currency;
                  return (
                    <div key={item._id} className='listing-card-seven grey-bg mb-50 wow fadeInUp'>
                      <div className='d-flex flex-wrap layout-one'>
                        <div className={`img-gallery z-1 overflow-hidden`} style={{height: 400, background: '#fff', position: 'relative'}}>
                          <div
                            className='tag bg-white rounded-0 text-dark fw-500'
                            style={{
                              ...(tag === 'Venta | Alquiler' ? {minWidth: 120, textAlign: 'center', whiteSpace: 'nowrap'} : {}),
                              fontFamily: 'Gordita, sans-serif',
                              fontSize: 12,
                            }}
                          >
                            {tag}
                          </div>
                          {/* Imagen principal grande y Fancybox trigger */}
                          {Array.isArray(item.img) && item.img.length > 0 && item.img[0] && item.img[0].name ? (
                            <Fancybox
                              options={{
                                Carousel: {
                                  infinite: true,
                                },
                              }}
                            >
                              <a data-fancybox='gallery3' href={`/uploads/properties/original/${item.img[0].name}`} style={{display: 'block', width: '100%', height: '100%'}}>
                                <Image src={`/uploads/properties/original/${item.img[0].name}`} alt={item.address} fill style={{objectFit: 'cover'}} priority />
                              </a>
                              {/* El resto de imágenes ocultas para Fancybox */}
                              {item.img.map((img: any, index: number) => {
                                if (index === 0) return null;
                                let originalUrl = '';
                                if (img && typeof img === 'object' && img.name) {
                                  if (img.original && (img.original.startsWith('http') || img.original.startsWith('/'))) {
                                    originalUrl = img.original;
                                  } else if (img.name) {
                                    originalUrl = `/uploads/properties/original/${img.name}`;
                                  }
                                }
                                return <a key={index} className='d-none' data-fancybox='gallery3' href={originalUrl}></a>;
                              })}
                              {/* Botón de carousel visible y funcional */}
                              <div
                                className='img-slider-btn'
                                style={{marginTop: 8, position: 'absolute', right: 16, bottom: 16, zIndex: 2, cursor: 'pointer'}}
                                onClick={(e) => {
                                  e.preventDefault();
                                  // Trigger Fancybox en la imagen principal
                                  const mainLink = (e.currentTarget.parentElement as HTMLElement).querySelector('a[data-fancybox="gallery3"]') as HTMLElement;
                                  if (mainLink) mainLink.click();
                                }}
                              >
                                {item.img.length.toString().padStart(2, '0')} <i className='fa-regular fa-image'></i>
                              </div>
                            </Fancybox>
                          ) : (
                            <div style={{width: '100%', height: 400, background: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                              <span>Sin imagen</span>
                            </div>
                          )}
                        </div>
                        <div className='property-info pe-4 ps-4'>
                                                    <Link href={`/listing_details_05/${item._id}`} className='title tran3s mb-15'>
                            {detailed && detailed.title ? detailed.title : item.address}
                          </Link>
                          <div className='address'>{item.address}</div>
                          <div className='feature border-0 mt-45 mb-30'>
                            {isLote ? (
                              <ul className='style-none d-flex flex-wrap align-items-center justify-content-between'>
                                <li>
                                  <strong>{property_info.lotCount}</strong> Lotes
                                </li>
                                <li>
                                  <strong>{property_info.surfaceText}</strong>
                                </li>
                                <li>
                                  <strong>{property_info.valueText}</strong>
                                </li>
                              </ul>
                            ) : (
                              <ul className='style-none d-flex flex-wrap align-items-center justify-content-between'>
                                <li>
                                  <strong>{property_info.buildSqFt}</strong> M2
                                </li>
                                <li>
                                  <strong>{property_info.bed}</strong> Dormitorios
                                </li>
                                <li>
                                  <strong>{property_info.bath}</strong> Baños
                                </li>
                                <li>
                                  <strong>{property_info.kitchen}</strong> Cocina
                                </li>
                              </ul>
                            )}
                          </div>
                          <div className='pl-footer pb-15 d-flex flex-wrap align-items-center justify-content-between'>
                            <strong className='price fw-500 color-dark me-auto'>
                              {price
                                ? typeof price === 'string'
                                  ? `${price_text} ${price}`
                                  : `${price_text} ${price.toLocaleString(undefined, {
                                      minimumFractionDigits: 0,
                                      maximumFractionDigits: 0,
                                    })}`
                                : 'Consultar'}
                            </strong>
                            <ul className='style-none d-flex action-icons me-4'>
                              <li>
                                <Link href='#'>
                                  <i className='fa-light fa-heart'></i>
                                </Link>
                              </li>
                              <li>
                                <Link href='#'>
                                  <i className='fa-light fa-bookmark'></i>
                                </Link>
                              </li>
                              <li>
                                <Link href='#'>
                                  <i className='fa-light fa-circle-plus'></i>
                                </Link>
                              </li>
                            </ul>
                            <Link href={`/listing_details_05/${item._id}`} className='btn-four'>
                              <i className='bi bi-arrow-up-right'></i>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}

              {meta && typeof meta.totalPages === 'number' && meta.totalPages > 1 && (
                <ReactPaginate
                  breakLabel='...'
                  nextLabel={<Image src={icon} alt='' className='ms-2' />}
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={3}
                  pageCount={meta.totalPages}
                  forcePage={currentPage}
                  previousLabel={<Image src={icon} alt='' className='ms-2' />}
                  renderOnZeroPageCount={null}
                  className='pagination-one d-flex align-items-center justify-content-center justify-content-sm-start style-none pt-30'
                />
              )}
            </div>
          </div>

          <div className='col-lg-4 order-lg-first'>
            <div className='advance-search-panel dot-bg md-mt-80'>
              <div className='main-bg rounded-0'>
                <DropdownOne
                  handleSearchChange={handleSearchChange}
                  handleBedroomChange={handleBedroomChange}
                  handleBathroomChange={handleBathroomChange}
                  handleResetFilter={handleResetFilter}
                  selectedAmenities={selectedAmenities}
                  handleAmenityChange={handleAmenityChange}
                  handleLocationChange={handleLocationChange}
                  handleStatusChange={handleStatusChange}
                  handleTypeChange={handleTypeChange}
                  searchValue={search}
                  selectedType={selectedType}
                  selectedStatus={selectedStatus}
                  selectedLocation={selectedLocation}
                  selectedBedrooms={selectedBedrooms}
                  selectedBathrooms={selectedBathrooms}
                  onApplyFilters={() => setCurrentPage(0)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingSixArea;
