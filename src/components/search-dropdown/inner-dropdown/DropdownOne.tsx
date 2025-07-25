import NiceSelect from '@/ui/NiceSelect';
import Link from 'next/link';
import {useEffect, useState} from 'react';

const ammenities_data = [
  {iconClass: 'bi-thermometer-sun', label: 'Calefacción'},
  {iconClass: 'bi-door-closed', label: 'Portero'},
  {iconClass: 'bi-building', label: 'Ascensor'},
  {iconClass: 'bi-car-front', label: 'Cochera'},
  {iconClass: 'bi-water', label: 'Piscina'},
  {iconClass: 'bi-flower1', label: 'Jardín'},
  {iconClass: 'fa-solid fa-fire', label: 'Parrilla'},
  {iconClass: 'bi-building', label: 'Balcón'},
  {iconClass: 'bi-sunset', label: 'Terraza'},
  {iconClass: 'bi-basket', label: 'Lavadero'},
  {iconClass: 'bi-box', label: 'Baulera'},
  {iconClass: 'bi-people', label: 'SUM'},
  {iconClass: 'fa-solid fa-dumbbell', label: 'Gimnasio'},
  {iconClass: 'bi-shield-lock', label: 'Seguridad 24h'},
];

const DropdownOne = ({
  handleBathroomChange,
  handleBedroomChange,
  handleSearchChange,
  handlePriceChange,
  maxPrice,
  priceValue,
  handleResetFilter,
  selectedAmenities,
  handleAmenityChange,
  handleLocationChange,
  handleStatusChange,
}: any) => {
  const [locations, setLocations] = useState<{value: string; text: string}[]>([]);
  const [operation, setOperation] = useState<'all' | 'sale' | 'rent'>('all');
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
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className='row gx-lg-5'>
        <div className='col-12'>
          <div className='input-box-one mb-35'>
            <div className='label'>Tipo de propiedad</div>
            <NiceSelect
              className='nice-select fw-normal'
              options={[
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
              onChange={handleStatusChange}
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
              onChange={(e: any) => setOperation(e.target?.value || e.value)}
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

        <div className='col-sm-6'>
          <div className='input-box-one mb-40'>
            <div className='label'>Dormitorios</div>
            <NiceSelect
              className='nice-select fw-normal'
              options={[
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
          <button className='fw-500 text-uppercase tran3s apply-search w-100 mt-40 mb-25'>
            <i className='fa-light fa-magnifying-glass'></i>
            <span>Burcar</span>
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
