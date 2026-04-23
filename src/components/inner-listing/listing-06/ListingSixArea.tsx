'use client';
import Image from 'next/image';
import Link from 'next/link';
import ReactPaginate from 'react-paginate';
import NiceSelect from '@/ui/NiceSelect';
import {useState} from 'react';
import {usePublicProperties} from '@/services/api/usePublicProperties';
import DropdownOne from '@/components/search-dropdown/inner-dropdown/DropdownOne';
import { formatPropertyPrice } from '@/utils/property-price';

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
                  const isLote = item.type === 'lote' && Array.isArray(item.lots) && item.lots.length > 0;
                  const tag = item.publishForSale && item.publishForRent ? 'Venta | Alquiler' : (item.publishForSale ? 'Venta' : (item.publishForRent ? 'Alquiler' : (item.status || '')));

                  // Precio robusto usando la utilidad centralizada
                  const salePrice = formatPropertyPrice(item.valueForSale, 'USD');
                  const rentPrice = formatPropertyPrice(item.valueForRent, 'ARS');

                  let property_info: any;
                  if (isLote) {
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

                    const surfaces = item.lots.map((l: any) => l.surface).filter((s: any) => s != null);
                    let surfaceText = '-';
                    if (surfaces.length > 1) {
                      const minS = Math.min(...surfaces);
                      const maxS = Math.max(...surfaces);
                      surfaceText = minS === maxS ? `${minS} m²` : `Desde ${minS} a ${maxS} m²`;
                    } else if (surfaces.length === 1) {
                      surfaceText = `${surfaces[0]} m²`;
                    }

                    property_info = {
                      lotCount: item.lots.length,
                      surfaceText,
                      valueText: priceDisplay,
                    };
                  } else {
                    property_info = {
                      buildSqFt: item.specs?.coveredSquareMeters || item.specs?.totalSquareMeters || item.detailedDescription?.sqFt || '-',
                      rooms: item.specs?.rooms || item.detailedDescription?.rooms || '-',
                      bed: item.specs?.bedrooms || item.detailedDescription?.bedrooms || '-',
                      bath: item.specs?.bathrooms || item.detailedDescription?.bathrooms || '-',
                    };
                  }

                  const coverImg = (typeof item.imgCover?.thumbWeb === 'string' && item.imgCover.thumbWeb) 
                    ? item.imgCover.thumbWeb 
                    : (Array.isArray(item.img) && item.img.length > 0 
                        ? (item.img.find((i: any) => i.thumbWeb)?.thumbWeb || item.img[0].thumb || '/assets/images/listing/img_01.jpg') 
                        : '/assets/images/listing/img_01.jpg');

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
                          <div style={{position: 'relative', width: '100%', height: '100%'}}>
                            <Image src={coverImg} alt={item.address} fill style={{objectFit: 'cover'}} />
                          </div>
                        </div>
                        <div className='property-info pe-4 ps-4'>
                          <Link href={`/listing_details_05/${item._id}`} className='title tran3s mb-15'>
                            {item.title || item.address}
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
                                  <strong>{property_info.rooms}</strong> Ambientes
                                </li>
                                <li>
                                  <strong>{property_info.bed}</strong> Dormitorios
                                </li>
                                <li>
                                  <strong>{property_info.bath}</strong> Baños
                                </li>
                              </ul>
                            )}
                          </div>
                          <div className='pl-footer pb-15 d-flex flex-wrap align-items-center justify-content-between'>
                            <div style={{display: 'flex', flexDirection: 'column', flex: 1}}>
                              {item.publishForSale && (
                                <strong className='price fw-500 color-dark'>
                                  Venta: {salePrice}
                                </strong>
                              )}
                              {item.publishForRent && (
                                <strong className='price fw-400 color-dark' style={{opacity: 0.8}}>
                                  Alquiler: {rentPrice}
                                </strong>
                              )}
                            </div>
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
