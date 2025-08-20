'use client';
import Fancybox from '@/components/common/Fancybox';
import DropdownSeven from '@/components/search-dropdown/inner-dropdown/DropdownSeven';
import NiceSelect from '@/ui/NiceSelect';
import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import {useState, useEffect, useMemo, useRef} from 'react';
import {GoogleMap, Marker, InfoWindow, useJsApiLoader} from '@react-google-maps/api';
import ReactPaginate from 'react-paginate';

const typeOptions = [
  {value: '', text: 'Todos'},
  {value: 'casa', text: 'Casa'},
  {value: 'departamento', text: 'Departamento'},
  {value: 'ph', text: 'PH'},
  {value: 'oficina', text: 'Oficina'},
  {value: 'local_comercial', text: 'Local Comercial'},
  {value: 'galpon', text: 'Galpón'},
  {value: 'lote', text: 'Lote'},
  {value: 'quinta', text: 'Quinta'},
  {value: 'chacra', text: 'Chacra'},
  {value: 'estudio', text: 'Estudio'},
  {value: 'loft', text: 'Loft'},
  {value: 'duplex', text: 'Duplex'},
  {value: 'triplex', text: 'Triplex'},
];
const operationOptions = [
  {value: 'all', text: 'Compra | Alquiler'},
  {value: 'sale', text: 'Compra'},
  {value: 'rent', text: 'Alquiler'},
];

const ListingFourteenArea = () => {
  const mapRef = useRef<google.maps.Map | null>(null);
  const itemsPerPage = 4;
  const [page, setPage] = useState(0);
  const [selectedType, setSelectedType] = useState('');
  const [operation, setOperation] = useState<'all' | 'sale' | 'rent'>('all');
  const [locations, setLocations] = useState<{value: string; text: string}[]>([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [sort, setSort] = useState('');
  const [searchText, setSearchText] = useState('');
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [hoveredMarker, setHoveredMarker] = useState<string | null>(null);
  const [mapProperties, setMapProperties] = useState<any[]>([]);
  const [listProperties, setListProperties] = useState<any[]>([]);
  const [listMeta, setListMeta] = useState<any>(null);
  const [mapBounds, setMapBounds] = useState<any>(null);
  const [isLoadingMap, setIsLoadingMap] = useState(false);
  const [isLoadingList, setIsLoadingList] = useState(false);
  const [showListOverlay, setShowListOverlay] = useState(false);
  const [errorMap, setErrorMap] = useState<string | null>(null);
  const [errorList, setErrorList] = useState<string | null>(null);

  const handleTypeChange = (value: string) => {
    setSelectedType(value);
    setPage(0);
  };

  const handleOperationChange = (value: string) => {
    setOperation(value as 'all' | 'sale' | 'rent');
    setPage(0);
  };

  const handleLocationChange = (value: string) => {
    setSelectedLocation(value);
    setPage(0);
  };

  const handleSearchTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    setPage(0);
  };

  const handlePriceMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPriceMin(e.target.value);
    setPage(0);
  };

  const handlePriceMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPriceMax(e.target.value);
    setPage(0);
  };

  const handleClearFilters = () => {
    setSelectedType('');
    setOperation('all');
    setSelectedLocation('');
    setSearchText('');
    setPriceMin('');
    setPriceMax('');
    setPage(0);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(e.target.value);
    setPage(0);
  };

  useEffect(() => {
    const apiBaseUrl = process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.netra.com.ar' : 'http://localhost:3050';
    fetch(`${apiBaseUrl}/api/v1/locality/with-available-properties?type=${operation}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setLocations([
            {value: '', text: 'Todas las ciudades'},
            ...data.map((loc: any) => ({
              value: loc._id,
              text: `${loc.nombre}, ${loc.provincia}`,
            })),
          ]);
        }
      });
  }, [operation]);

  const filters = useMemo(
    () => ({
      ...(selectedType ? {type: selectedType} : {}),
      ...(selectedLocation ? {locality: selectedLocation} : {}),
    }),
    [selectedType, selectedLocation]
  );

  useEffect(() => {
    const apiBaseUrl = process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.netra.com.ar' : 'http://localhost:3050';
    const params = new URLSearchParams();
    if (selectedType && selectedType !== '') params.append('type', selectedType);
    if (selectedLocation && selectedLocation !== '') params.append('locality', selectedLocation);
    if (operation && operation !== 'all') params.append('operation', operation);
    if (searchText && searchText.trim() !== '') params.append('address', searchText);
    setIsLoadingMap(true);
    setErrorMap(null);
    fetch(`${apiBaseUrl}/api/v1/property/public/markers?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => setMapProperties(Array.isArray(data) ? data : []))
      .catch(() => setErrorMap('Error cargando propiedades del mapa'))
      .finally(() => setIsLoadingMap(false));
  }, [selectedType, selectedLocation, operation, searchText]);

  useEffect(() => {
    if (!mapBounds) return;
    const apiBaseUrl = process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.netra.com.ar' : 'http://localhost:3050';
    const params = new URLSearchParams();
    params.append('page', page.toString());
    params.append('pageSize', itemsPerPage.toString());
    if (selectedType && selectedType !== '') params.append('type', selectedType);
    if (selectedLocation && selectedLocation !== '') params.append('locality', selectedLocation);
    if (sort && sort !== '') params.append('sort', sort);
    params.append('north', mapBounds.north);
    params.append('south', mapBounds.south);
    params.append('east', mapBounds.east);
    params.append('west', mapBounds.west);
    if (operation === 'sale') {
      params.append('publishForSale', 'true');
    } else if (operation === 'rent') {
      params.append('publishForRent', 'true');
    }
    const searchCriteria = [];
    if (priceMin && priceMin.trim() !== '') {
      const priceField = operation === 'rent' ? 'valueForRent.amount' : 'valueForSale.amount';
      searchCriteria.push({field: priceField, term: priceMin, operation: 'gte'});
    }
    if (priceMax && priceMax.trim() !== '') {
      const priceField = operation === 'rent' ? 'valueForRent.amount' : 'valueForSale.amount';
      searchCriteria.push({field: priceField, term: priceMax, operation: 'lte'});
    }
    if (searchText && searchText.trim() !== '') {
      searchCriteria.push({field: 'address', term: searchText, operation: 'contains'});
    }
    if (searchCriteria.length > 0) {
      const searchParam = JSON.stringify({criteria: searchCriteria});
      params.append('search', searchParam);
    }

    setIsLoadingList(true);
    setErrorList(null);
    fetch(`${apiBaseUrl}/api/v1/property/public?${params.toString()}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setListProperties(Array.isArray(data.items) ? data.items : []);
        setListMeta(data.meta || null);
      })
      .catch((error) => {
        console.error('Error cargando listado de propiedades:', error);
        setErrorList('Error cargando listado de propiedades');
      })
      .finally(() => setIsLoadingList(false));
  }, [mapBounds, selectedType, selectedLocation, operation, sort, page, itemsPerPage, priceMin, priceMax, searchText]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (isLoadingList) {
      timeout = setTimeout(() => setShowListOverlay(true), 250);
    } else {
      setShowListOverlay(false);
    }
    return () => clearTimeout(timeout);
  }, [isLoadingList]);

  const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';
  const defaultCenter = {lat: -43.3, lng: -65.1};
  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const hasCenteredRef = useRef(false);

  useEffect(() => {
    if (!hasCenteredRef.current && mapProperties.length > 0 && mapProperties[0].lat && mapProperties[0].lng) {
      setMapCenter({lat: mapProperties[0].lat, lng: mapProperties[0].lng});
      hasCenteredRef.current = true;
    }
  }, [mapProperties]);

  const {isLoaded} = useJsApiLoader({googleMapsApiKey: GOOGLE_MAPS_API_KEY});

  return (
    <div className='property-listing-eight pt-120 xl-pt-120'>
      <div className='search-wrapper-three layout-two position-relative' style={{paddingTop: 10}}>
        <div className='bg-wrapper rounded-0 border-0'>
          <form onSubmit={(e) => e.preventDefault()} className='row gx-0 align-items-center'>
            <div className='col-xxl-2 col-xl-2 col-sm-6'>
              <div className='input-box-one border-left'>
                <div className='label'>Operación</div>
                <NiceSelect
                  className='nice-select fw-normal'
                  options={operationOptions}
                  defaultCurrent={0}
                  onChange={(e: any) => handleOperationChange(e?.target?.value ?? e?.value)}
                  name='operation'
                  placeholder='Selecciona operación'
                />
              </div>
            </div>
            <div className='col-xl-2 col-sm-6'>
              <div className='input-box-one border-left'>
                <div className='label'>Tipo de propiedad</div>
                <NiceSelect
                  className='nice-select fw-normal'
                  options={typeOptions}
                  defaultCurrent={0}
                  onChange={(option) => handleTypeChange(option.value)}
                  name='type'
                  placeholder='Selecciona tipo'
                />
              </div>
            </div>
            <div className='col-xl-2 col-sm-6'>
              <div className='input-box-one border-left'>
                <div className='label'>Ciudad</div>
                <NiceSelect
                  className='nice-select fw-normal'
                  options={locations}
                  defaultCurrent={0}
                  onChange={(option) => handleLocationChange(option.value)}
                  name='locality'
                  placeholder='Selecciona ciudad'
                />
              </div>
            </div>
            <div className='col-xl-2 col-sm-6'>
              <div className='input-box-one border-left'>
                <div className='label'>Búsqueda</div>
                <input type='text' className='form-control' placeholder='Buscar por dirección...' value={searchText} onChange={handleSearchTextChange} />
              </div>
            </div>
            <div className='col-xl-1 col-sm-6'>
              <div className='input-box-one border-left'>
                <div className='label'>Precio Mín</div>
                <input type='number' className='form-control' placeholder='Desde...' value={priceMin} onChange={handlePriceMinChange} />
              </div>
            </div>
            <div className='col-xl-1 col-sm-6'>
              <div className='input-box-one border-left'>
                <div className='label'>Precio Máx</div>
                <input type='number' className='form-control' placeholder='Hasta...' value={priceMax} onChange={handlePriceMaxChange} />
              </div>
            </div>
            <div className='col-xl-2 col-sm-6 d-flex align-items-end'>
              <div className='input-box-one border-left w-100'>
                <button type='button' className='btn btn-outline-secondary w-100' onClick={handleClearFilters} style={{height: '50px', marginTop: '24px'}}>
                  Limpiar filtros
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className='row gx-0'>
        <div className='col-xxl-6 col-lg-5' style={{height: '80vh', minHeight: '80vh', maxHeight: '100vh', overflow: 'hidden'}}>
          <div id='google-map-area' style={{height: '100%', minHeight: '100%', maxHeight: '100%'}}>
            <div className='google-map-home' id='contact-google-map' style={{height: '100%', minHeight: '100%', maxHeight: '100%'}}>
              {isLoaded ? (
                <GoogleMap
                  mapContainerClassName='w-100'
                  mapContainerStyle={{height: '100vh', minHeight: '100vh', maxHeight: '100vh'}}
                  center={mapCenter}
                  zoom={13}
                  options={{mapTypeControl: false, streetViewControl: false, fullscreenControl: false}}
                  onLoad={(map) => {
                    mapRef.current = map;
                  }}
                  onIdle={() => {
                    const map = mapRef.current;
                    if (!map) return;
                    const bounds = map.getBounds();
                    if (!bounds) return;
                    const ne = bounds.getNorthEast();
                    const sw = bounds.getSouthWest();
                    const newBounds = {
                      north: ne.lat(),
                      south: sw.lat(),
                      east: ne.lng(),
                      west: sw.lng(),
                    };
                    setMapBounds((prev: typeof newBounds | null) => {
                      if (prev && prev.north === newBounds.north && prev.south === newBounds.south && prev.east === newBounds.east && prev.west === newBounds.west) {
                        return prev;
                      }
                      return newBounds;
                    });
                  }}
                >
                  {mapProperties
                    .filter((item: any) => typeof item.lat === 'number' && typeof item.lng === 'number' && item.lat !== undefined && item.lng !== undefined)
                    .map((item: any, idx) => (
                      <React.Fragment key={item._id || idx}>
                        <Marker position={{lat: item.lat as number, lng: item.lng as number}} title={item.title || item.address} onMouseOver={() => setHoveredMarker(item._id || idx.toString())} />
                        {hoveredMarker === (item._id || idx.toString()) && (
                          <InfoWindow position={{lat: item.lat as number, lng: item.lng as number}} onCloseClick={() => setHoveredMarker(null)}>
                            <div style={{width: 260, padding: 0}}>
                              <a
                                href={`/listing_details_05/${item._id}`}
                                style={{
                                  textDecoration: 'none',
                                  color: 'inherit',
                                  display: 'block',
                                }}
                              >
                                <div
                                  style={{
                                    width: '100%',
                                    height: 150,
                                    position: 'relative',
                                    borderRadius: '8px 8px 0 0',
                                    overflow: 'hidden',
                                  }}
                                >
                                  {/* Eliminamos el `priority` de aquí. Esta imagen no está en el viewport inicial. */}
                                  <Image src={item.imgCover?.thumbWeb || ''} alt={item.title || '...'} fill style={{objectFit: 'cover'}} sizes='260px' />
                                  <button
                                    style={{
                                      position: 'absolute',
                                      top: '50%',
                                      left: 5,
                                      transform: 'translateY(-50%)',
                                      background: 'rgba(255, 255, 255, 0.7)',
                                      border: 'none',
                                      borderRadius: '50%',
                                      width: 25,
                                      height: 25,
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      cursor: 'pointer',
                                    }}
                                    onClick={(e) => e.preventDefault()}
                                  >
                                    &lt;
                                  </button>
                                  <button
                                    style={{
                                      position: 'absolute',
                                      top: '50%',
                                      right: 5,
                                      transform: 'translateY(-50%)',
                                      background: 'rgba(255, 255, 255, 0.7)',
                                      border: 'none',
                                      borderRadius: '50%',
                                      width: 25,
                                      height: 25,
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      cursor: 'pointer',
                                    }}
                                    onClick={(e) => e.preventDefault()}
                                  >
                                    &gt;
                                  </button>
                                  <div
                                    style={{
                                      position: 'absolute',
                                      top: 8,
                                      right: 8,
                                      display: 'flex',
                                      gap: 8,
                                    }}
                                  >
                                    <button
                                      style={{
                                        background: 'rgba(255, 255, 255, 0.7)',
                                        border: 'none',
                                        borderRadius: '50%',
                                        width: 32,
                                        height: 32,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        cursor: 'pointer',
                                      }}
                                      onClick={(e) => e.preventDefault()}
                                    >
                                      ❤️
                                    </button>
                                    <button
                                      style={{
                                        background: 'rgba(255, 255, 255, 0.7)',
                                        border: 'none',
                                        borderRadius: '50%',
                                        width: 32,
                                        height: 32,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        cursor: 'pointer',
                                      }}
                                      onClick={(e) => {
                                        e.preventDefault();
                                        setHoveredMarker(null);
                                      }}
                                    >
                                      ✖️
                                    </button>
                                  </div>
                                </div>
                                <div
                                  style={{
                                    padding: '8px 12px 12px 12px',
                                    borderRadius: '0 0 8px 8px',
                                    backgroundColor: '#fff',
                                  }}
                                >
                                  <div
                                    style={{
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'space-between',
                                      marginBottom: 4,
                                    }}
                                  >
                                    <div style={{fontWeight: 700, fontSize: 16, color: '#222'}}>{item.title || item.address}</div>
                                    {item.isNew && (
                                      <div
                                        style={{
                                          backgroundColor: '#e6f7ff',
                                          color: '#1890ff',
                                          fontSize: 12,
                                          fontWeight: 600,
                                          padding: '2px 6px',
                                          borderRadius: 4,
                                          display: 'flex',
                                          alignItems: 'center',
                                          gap: 4,
                                        }}
                                      >
                                        ⭐ Nuevo
                                      </div>
                                    )}
                                  </div>
                                  <div style={{fontWeight: 600, fontSize: 14, color: '#555'}}>{item.address}</div>
                                  <div style={{fontWeight: 600, fontSize: 18, marginTop: 8}}>
                                    {item.valueForSale?.amount ? `$${item.valueForSale.amount.toLocaleString('es-AR', {minimumFractionDigits: 2})}` : ''}
                                  </div>
                                </div>
                              </a>
                            </div>
                          </InfoWindow>
                        )}
                      </React.Fragment>
                    ))}
                </GoogleMap>
              ) : (
                <div style={{height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>Cargando mapa...</div>
              )}
            </div>
          </div>
        </div>
        <div className='col-xxl-6 col-lg-7'>
          <div className='bg-light pl-40 pr-40 pt-35 pb-60' style={{position: 'relative'}}>
            <div className='listing-header-filter d-sm-flex justify-content-between align-items-center mb-40 lg-mb-30'>
              <div>
                Mostrando{' '}
                <span className='color-dark fw-500'>
                  {listMeta?.itemCount && listMeta.itemCount > 0 ? listMeta.currentPage * listMeta.itemsPerPage + 1 : 0}–
                  {listMeta?.itemCount && listMeta.itemCount > 0 ? listMeta.currentPage * listMeta.itemsPerPage + listProperties.length : 0}
                </span>{' '}
                de <span className='color-dark fw-500'>{listMeta?.totalItems || 0}</span> resultados
              </div>
              <div className='d-flex align-items-center xs-mt-20'>
                <div className='short-filter d-flex align-items-center'>
                  <div className='fs-16 me-2'>Ordenar por:</div>
                  <NiceSelect
                    className='nice-select'
                    options={[
                      {value: 'createdAt', text: 'Reciente'},
                      {value: 'price_low', text: 'Menor precio'},
                      {value: 'price_high', text: 'Mayor precio'},
                    ]}
                    defaultCurrent={0}
                    onChange={(option) => {
                      setSort(option.value);
                      setPage(0);
                    }}
                    name=''
                    placeholder=''
                  />
                </div>
                <Link href='/listing_15' className='tran3s layout-change rounded-circle ms-auto ms-sm-3' data-bs-toggle='tooltip' title='Switch To List View'>
                  <i className='fa-regular fa-bars'></i>
                </Link>
              </div>
            </div>
            {showListOverlay && (
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: 'rgba(255,255,255,0.95)',
                  zIndex: 10,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'opacity 0.2s',
                  borderRadius: 20,
                }}
              >
                <div className='spinner-border text-primary' role='status' style={{width: 48, height: 48}}>
                  <span className='visually-hidden'>Cargando...</span>
                </div>
              </div>
            )}
            {errorList && <div className='text-danger py-5'>Error cargando propiedades</div>}
            <div className='row'>
              {listProperties.map((item: any, index: number) => (
                <div key={item._id} className='col-md-6 d-flex mb-40 wow fadeInUp'>
                  <div className='listing-card-one style-three border-30 w-100 h-100'>
                    <div className='img-gallery p-15'>
                      <div className='position-relative border-20 overflow-hidden'>
                        <div className='tag bg-white text-dark fw-500 border-20'>{item.type}</div>
                        {/* Aquí aplicamos el src directo. Si la imagen es /uploads/...,
                          tu image-loader.js se encargará de cargarla desde el backend.
                        */}
                        <Image
                          src={item.imgCover?.thumbWeb || ''}
                          className='w-100 border-20'
                          alt={item.title || '...'}
                          width={400}
                          height={250}
                          // Optimización de rendimiento: usa `priority` solo para las primeras imágenes
                          // en la primera carga de la página para mejorar el LCP.
                          priority={page === 0 && index < itemsPerPage}
                        />
                        <Link href={`/listing_details_05/${item._id}`} className='btn-four inverse rounded-circle position-absolute'>
                          <i className='bi bi-arrow-up-right'></i>
                        </Link>
                      </div>
                    </div>
                    <div className='property-info pe-4 ps-4'>
                      <Link href={`/listing_details_05/${item._id}`} className='title tran3s'>
                        {item.address}
                      </Link>
                      <div className='address'>
                        {item.province?.name} - {item.locality?.name}
                      </div>
                      <div className='pl-footer m0 d-flex align-items-center justify-content-between'>
                        {<strong className='price fw-500 color-dark'>{item.valueForSale?.amount ? `$${item.valueForSale.amount.toLocaleString('es-AR', {minimumFractionDigits: 2})}` : ''}</strong>}
                        <ul className='style-none d-flex action-icons'>
                          <li>
                            <Link href='#'>
                              <i className='fa-light fa-heart'></i>
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className='pt-5'>
              <ReactPaginate
                breakLabel='...'
                nextLabel={<i className='fa-regular fa-chevron-right'></i>}
                onPageChange={(e) => setPage(e.selected)}
                pageRangeDisplayed={listMeta?.totalPages && listMeta.totalPages > 0 ? listMeta.totalPages : 1}
                pageCount={listMeta?.totalPages && listMeta.totalPages > 0 ? listMeta.totalPages : 1}
                previousLabel={<i className='fa-regular fa-chevron-left'></i>}
                renderOnZeroPageCount={null}
                forcePage={listMeta?.currentPage || 0}
                className='pagination-two d-inline-flex align-items-center justify-content-center style-none'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingFourteenArea;
