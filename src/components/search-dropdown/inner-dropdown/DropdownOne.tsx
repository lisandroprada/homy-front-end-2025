import NiceSelect from '@/ui/NiceSelect';
import Link from 'next/link';
import {useEffect, useState} from 'react';

const ammenities_data = [
  {iconClass: 'bi-thermometer-sun', label: 'calefacción'},
  {iconClass: 'bi-door-closed', label: 'portero'},
  {iconClass: 'bi-building', label: 'ascensor'},
  {iconClass: 'bi-car-front', label: 'cochera'},
  {iconClass: 'bi-water', label: 'piscina'},
  {iconClass: 'bi-flower1', label: 'jardín'},
  {iconClass: 'fa-solid fa-fire', label: 'parrilla'},
  {iconClass: 'bi-building', label: 'balcón'},
  {iconClass: 'bi-sunset', label: 'terraza'},
  {iconClass: 'bi-basket', label: 'lavadero'},
  {iconClass: 'bi-box', label: 'baulera'},
  {iconClass: 'bi-people', label: 'SUM'},
  {iconClass: 'fa-solid fa-dumbbell', label: 'gimnasio'},
  {iconClass: 'bi-shield-lock', label: 'seguridad 24h'},
];

const DropdownOne = ({
  handleBathroomChange,
  handleBedroomChange,
  handleSearchChange,
  handleResetFilter,
  selectedAmenities,
  handleAmenityChange,
  handleLocationChange,
  handleTypeChange,
  handleOperationChange,
  searchValue,
  selectedType,
  selectedLocation,
  selectedBedrooms,
  selectedBathrooms,
  selectedOperation,
  onApplyFilters,
}: any) => {
  const [locations, setLocations] = useState<{value: string; text: string}[]>([]);

  useEffect(() => {
    const apiBaseUrl = process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.netra.com.ar' : 'http://localhost:3050';

    fetch(`${apiBaseUrl}/api/v1/locality/with-available-properties?type=${selectedOperation || 'all'}`)
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
  }, [selectedOperation]);
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className='row gx-lg-5'>
        <div className='col-12'>
          <div className='input-box-one mb-35'>
            <div className='label'>Tipo de propiedad</div>
            <NiceSelect
              className='nice-select fw-normal'
              options={[
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
              ]}
              defaultCurrent={0}
              onChange={handleTypeChange}
              name=''
              placeholder=''
            />
          </div>
        </div>

        <div className='col-12'>
          <div className='input-box-one mb-35'>
            <div className='label'>Operación</div>
            <NiceSelect
              className='nice-select fw-normal'
              options={[
                {value: 'all', text: 'Compra | Alquiler'},
                {value: 'sale', text: 'Compra'},
                {value: 'rent', text: 'Alquiler'},
              ]}
              defaultCurrent={0}
              onChange={handleOperationChange}
              name='operation'
              placeholder='Selecciona operación'
            />
          </div>
        </div>

        <div className='col-12'>
          <div className='input-box-one mb-50'>
            <div className='label'>Ubicación</div>
            <NiceSelect className='nice-select location fw-normal' options={locations} defaultCurrent={0} onChange={handleLocationChange} name='' placeholder='Selecciona una ubicación' />
          </div>
        </div>

        <div className='col-12'>
          <div className='input-box-one mb-40'>
            <div className='label'>Búsqueda</div>
            <input type='text' className='form-control' placeholder='Buscar por dirección...' value={searchValue || ''} onChange={handleSearchChange} />
          </div>
        </div>

        <div className='col-sm-6'>
          <div className='input-box-one mb-40'>
            <div className='label'>Dormitorios</div>
            <NiceSelect
              className='nice-select fw-normal'
              options={[
                {value: '', text: 'Todas'},
                {value: '1', text: '1'},
                {value: '2', text: '2'},
                {value: '3', text: '3'},
                {value: '4', text: '4'},
              ]}
              defaultCurrent={0}
              onChange={handleBedroomChange}
              name=''
              placeholder=''
            />
          </div>
        </div>

        <div className='col-sm-6'>
          <div className='input-box-one mb-40'>
            <div className='label'>Baños</div>
            <NiceSelect
              className='nice-select fw-normal'
              options={[
                {value: '', text: 'Todos'},
                {value: '1', text: '1'},
                {value: '2', text: '2'},
                {value: '3', text: '3'},
                {value: '4', text: '4'},
              ]}
              defaultCurrent={0}
              onChange={handleBathroomChange}
              name=''
              placeholder=''
            />
          </div>
        </div>

        <div className='col-12'>
          <h6 className='block-title fw-bold mb-30'>Carácteristicas</h6>
          <ul className='style-none d-flex flex-wrap justify-content-between filter-input'>
            {ammenities_data.map((item, i) => (
              <li key={i}>
                <input type='checkbox' name='Amenities' value={item.label} checked={selectedAmenities.includes(item.label)} onChange={handleAmenityChange} />
                <label>
                  <i className={item.iconClass} style={{marginRight: 8}}></i>
                  {item.label}
                </label>
              </li>
            ))}
          </ul>
        </div>

        <div className='col-12'>
          <h6 className='block-title fw-bold mt-45 mb-20'>M2</h6>
          <div className='d-flex align-items-center sqf-ranger'>
            <input type='text' placeholder='Min' />
            <div className='divider'></div>
            <input type='text' placeholder='Max' />
          </div>
        </div>
        <div className='col-12'>
          <button onClick={onApplyFilters} type='button' className='fw-500 text-uppercase tran3s apply-search w-100 mt-40 mb-25'>
            <i className='fa-light fa-magnifying-glass'></i>
            <span>Buscar</span>
          </button>
        </div>

        <div className='col-12'>
          <div className='d-flex justify-content-between form-widget'>
            <a onClick={handleResetFilter} style={{cursor: 'pointer'}} className='tran3s'>
              <i className='fa-regular fa-arrows-rotate'></i>
              <span>Limpiar filtro</span>
            </a>
            <Link href='#' className='tran3s'>
              <i className='fa-regular fa-star'></i>
              <span>Guardar búsqueda</span>
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
};

export default DropdownOne;
