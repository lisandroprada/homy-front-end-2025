'use client';
import Fancybox from '@/components/common/Fancybox';
import DropdownSeven from '@/components/search-dropdown/inner-dropdown/DropdownSeven';
import {usePublicProperties} from '@/services/api/usePublicProperties';
import NiceSelect from '@/ui/NiceSelect';
import Image from 'next/image';
import Link from 'next/link';
import {useState, useEffect, useMemo} from 'react';
import {GoogleMap, Marker, useJsApiLoader} from '@react-google-maps/api';
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
  const itemsPerPage = 4;
  const [page, setPage] = useState(0);
  const [selectedType, setSelectedType] = useState('');
  const [operation, setOperation] = useState<'all' | 'sale' | 'rent'>('all');
  const [locations, setLocations] = useState<{value: string; text: string}[]>([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [sort, setSort] = useState('');

  // Cambia el tipo de propiedad
  const handleTypeChange = (value: string) => {
    setSelectedType(value);
    setPage(0);
  };

  // Cambia la operación (all/sale/rent)
  const handleOperationChange = (value: string) => {
    setOperation(value as 'all' | 'sale' | 'rent');
    setPage(0);
  };

  // Cambia la ciudad
  const handleLocationChange = (value: string) => {
    setSelectedLocation(value);
    setPage(0);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(e.target.value);
    setPage(0);
  };

  // Carga ciudades dinámicamente según operación
  useEffect(() => {
    fetch(`/api/locality/with-available-properties?type=${operation}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setLocations(
            data.map((loc: any) => ({
              value: loc._id,
              text: `${loc.nombre}, ${loc.provincia}`,
            }))
          );
        }
      });
  }, [operation]);

  // Memoize filters to avoid infinite update loop
  const filters = useMemo(
    () => ({
      ...(selectedType ? {type: selectedType} : {}),
      ...(selectedLocation ? {locality: selectedLocation} : {}),
    }),
    [selectedType, selectedLocation]
  );

  // Hook de datos reales
  const {properties, meta, isLoading, isError, error} = usePublicProperties({
    page,
    pageSize: itemsPerPage,
    ...filters,
    sort,
  });

  // Google Maps config
  const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';
  const defaultCenter = properties.length > 0 && properties[0].lat && properties[0].lng ? {lat: properties[0].lat, lng: properties[0].lng} : {lat: -34.6037, lng: -58.3816};
  const {isLoaded} = useJsApiLoader({googleMapsApiKey: GOOGLE_MAPS_API_KEY});

  return (
    <div className='property-listing-eight pt-150 xl-pt-120'>
      <div className='search-wrapper-three layout-two position-relative'>
        <div className='bg-wrapper rounded-0 border-0'>
          <form onSubmit={(e) => e.preventDefault()} className='row gx-0 align-items-center'>
            <div className='col-xxl-2 col-xl-3 col-sm-6'>
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
            <div className='col-xl-3 col-sm-6'>
              <div className='input-box-one border-left'>
                <div className='label'>Tipo de propiedad</div>
                <NiceSelect
                  className='nice-select fw-normal'
                  options={typeOptions}
                  defaultCurrent={0}
                  onChange={(e) => handleTypeChange('value' in e ? (e as any).value : e.target?.value)}
                  name='type'
                  placeholder='Selecciona tipo'
                />
              </div>
            </div>
            <div className='col-xl-3 col-sm-6'>
              <div className='input-box-one border-left'>
                <div className='label'>Ciudad</div>
                <NiceSelect
                  className='nice-select fw-normal'
                  options={locations}
                  defaultCurrent={0}
                  onChange={(e) => handleLocationChange('value' in e ? (e as any).value : e.target?.value)}
                  name='locality'
                  placeholder='Selecciona ciudad'
                />
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Filtro visual de tipo removido, ahora todo es por selects arriba */}

      <div className='row gx-0'>
        <div className='col-xxl-6 col-lg-5'>
          <div id='google-map-area' className='h-100'>
            <div className='google-map-home' id='contact-google-map'>
              {isLoaded ? (
                <GoogleMap mapContainerClassName='w-100 h-100' center={defaultCenter} zoom={13} options={{mapTypeControl: false, streetViewControl: false, fullscreenControl: false}}>
                  {properties
                    .filter((item: any) => typeof item.lat === 'number' && typeof item.lng === 'number' && item.lat !== undefined && item.lng !== undefined)
                    .map((item: any, idx) => (
                      <Marker key={item._id || idx} position={{lat: item.lat as number, lng: item.lng as number}} title={item.detailedDescription?.title || item.address} />
                    ))}
                </GoogleMap>
              ) : (
                <div style={{height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>Cargando mapa...</div>
              )}
            </div>
          </div>
        </div>
        <div className='col-xxl-6 col-lg-7'>
          <div className='bg-light pl-40 pr-40 pt-35 pb-60'>
            <div className='listing-header-filter d-sm-flex justify-content-between align-items-center mb-40 lg-mb-30'>
              <div>
                Mostrando{' '}
                <span className='color-dark fw-500'>
                  {meta?.itemCount && meta.itemCount > 0 ? meta.currentPage * meta.itemsPerPage + 1 : 0}–
                  {meta?.itemCount && meta.itemCount > 0 ? meta.currentPage * meta.itemsPerPage + properties.length : 0}
                </span>{' '}
                de <span className='color-dark fw-500'>{meta?.totalItems || 0}</span> resultados
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
                    onChange={handleSortChange}
                    name=''
                    placeholder=''
                  />
                </div>
                <Link href='/listing_15' className='tran3s layout-change rounded-circle ms-auto ms-sm-3' data-bs-toggle='tooltip' title='Switch To List View'>
                  <i className='fa-regular fa-bars'></i>
                </Link>
              </div>
            </div>

            {isLoading && <div className='text-center py-5'>Cargando propiedades...</div>}
            {error && <div className='text-danger py-5'>Error cargando propiedades</div>}

            <div className='row'>
              {properties.map((item: any) => (
                <div key={item._id} className='col-md-6 d-flex mb-40 wow fadeInUp'>
                  <div className='listing-card-one style-three border-30 w-100 h-100'>
                    <div className='img-gallery p-15'>
                      <div className='position-relative border-20 overflow-hidden'>
                        <div className='tag bg-white text-dark fw-500 border-20'>{item.type}</div>
                        <Image src={item.imgCover?.thumbWeb || ''} className='w-100 border-20' alt={item.title || '...'} width={400} height={250} />
                        <Link href={`/listing_details_06?id=${item._id}`} className='btn-four inverse rounded-circle position-absolute'>
                          <i className='bi bi-arrow-up-right'></i>
                        </Link>
                      </div>
                    </div>
                    <div className='property-info pe-4 ps-4'>
                      <Link href={`/listing_details_06?id=${item._id}`} className='title tran3s'>
                        {item.address}
                      </Link>
                      <div className='address'>
                        {item.province?.name} - {item.locality?.name}
                      </div>
                      <div className='pl-footer m0 d-flex align-items-center justify-content-between'>
                        <strong className='price fw-500 color-dark'>{item.valueForSale?.amount ? `$${item.valueForSale.amount.toLocaleString('es-AR', {minimumFractionDigits: 2})}` : ''}</strong>
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
                pageRangeDisplayed={meta?.totalPages && meta.totalPages > 0 ? meta.totalPages : 1}
                pageCount={meta?.totalPages && meta.totalPages > 0 ? meta.totalPages : 1}
                previousLabel={<i className='fa-regular fa-chevron-left'></i>}
                renderOnZeroPageCount={null}
                forcePage={meta?.currentPage || 0}
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
