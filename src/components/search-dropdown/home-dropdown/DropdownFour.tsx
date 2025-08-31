'use client';
import dropdoun_data from '@/data/home-data/DropdownData';
import NiceSelect from '@/ui/NiceSelect';
import {useState, useEffect} from 'react';
import SellForm from '@/components/forms/SellForm';
import AppraiseForm from '@/components/forms/AppraiseForm';

const tab_title: string[] = ['Comprar', 'Alquilar', 'Vender', 'Tasar'];

const DropdownFour = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [locations, setLocations] = useState<{value: string; text: string}[]>([]);
  const [enablePrice, setEnablePrice] = useState(false);
  const [selectedType, setSelectedType] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedPrice, setSelectedPrice] = useState('');

  // Handler para los selects
  const selectHandler = (option: any) => {
    if (option && option.name === 'type') setSelectedType(option.value);
    if (option && option.name === 'location') setSelectedLocation(option.value);
    if (option && option.name === 'price') setSelectedPrice(option.value);
  };
  useEffect(() => {
    let typeParam = 'all';
    if (activeTab === 0) typeParam = 'sale'; // Comprar
    else if (activeTab === 1) typeParam = 'rent'; // Alquilar
    const apiBase = process.env.NEXT_PUBLIC_API_URL || '';
    fetch(`${apiBase}/locality/with-available-properties?type=${typeParam}`)
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
  }, [activeTab]);

  const handleTabClick = (index: any) => {
    setActiveTab(index);
  };

  // Handler para buscar/redirigir con filtros
  const searchHandler = () => {
    let params = [];
    if (activeTab === 0) {
      params.push('publishForSale=true');
    } else if (activeTab === 1) {
      params.push('publishForRent=true');
    }
    let propertyType = selectedType;
    if (propertyType && (propertyType.startsWith('buy_') || propertyType.startsWith('rent_'))) {
      propertyType = propertyType.replace(/^buy_|^rent_/, '');
    }
    if (propertyType) {
      params.push(`type=${encodeURIComponent(propertyType)}`);
    }
    if (selectedLocation) {
      params.push(`locality=${encodeURIComponent(selectedLocation)}`);
    }
    if (enablePrice && selectedPrice) {
      params.push(`price=${encodeURIComponent(selectedPrice)}`);
    }
    const url = `/listing_05?${params.join('&')}`;
    window.location.assign(url);
  };

  return (
    <div className='search-wrapper-two position-relative ms-xl-5 ms-lg-4 ps-xxl-4 md-mt-60'>
      <nav className='search-filter-nav-two d-inline-flex' style={{minWidth: 420}}>
        <div className='nav nav-tabs border-0' role='tablist'>
          {tab_title.map((tab, index) => (
            <button key={index} onClick={() => handleTabClick(index)} className={`nav-link ${activeTab === index ? 'active' : ''}`} id='buy-tab' type='button' style={{minWidth: 100}}>
              {tab}
            </button>
          ))}
        </div>
      </nav>

      <div className='bg-wrapper position-relative z-1'>
        <h4 className='mb-35 xl-mb-30'>Encontrá lo que estás buscando!</h4>
        <div className='tab-content'>
          <div className={`tab-pane show ${activeTab === 0 ? 'active' : ''}`} id='buy'>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                searchHandler();
              }}
            >
              <div className='row gx-0 align-items-center'>
                <div className='col-12'>
                  <div className='input-box-one bottom-border mb-25'>
                    <div className='label'>Estoy buscando ...</div>
                    <NiceSelect
                      className='nice-select fw-normal'
                      options={[
                        {value: '', text: 'Todos'},
                        {value: 'buy_casa', text: 'Casa'},
                        {value: 'buy_duplex', text: 'Duplex'},
                        {value: 'buy_triplex', text: 'Triplex'},
                        {value: 'buy_lote', text: 'Lote'},
                        {value: 'buy_local_comercial', text: 'Local Comercial'},
                        {value: 'buy_oficina', text: 'Oficina'},
                        {value: 'buy_loft', text: 'Loft'},
                        {value: 'buy_departamento', text: 'Departamento'},
                        {value: 'buy_ph', text: 'PH'},
                        {value: 'buy_galpon', text: 'Galpón'},
                        {value: 'buy_quinta', text: 'Quinta'},
                        {value: 'buy_chacra', text: 'Chacra'},
                        {value: 'buy_estudio', text: 'Estudio'},
                      ]}
                      defaultCurrent={0}
                      onChange={(option: {value: string}) => selectHandler({name: 'type', value: option.value})}
                      name='type'
                      placeholder=''
                    />
                  </div>
                </div>
                <div className='col-12'>
                  <div className='input-box-one bottom-border mb-25'>
                    <div className='label'>Ubicación</div>
                    <NiceSelect
                      className='nice-select location fw-normal'
                      options={locations}
                      defaultCurrent={0}
                      onChange={(option: {value: string}) => selectHandler({name: 'location', value: option.value})}
                      name='location'
                      placeholder='Selecciona una ubicación'
                    />
                  </div>
                </div>
                <div className='col-12'>
                  <div className='input-box-one bottom-border mb-50 lg-mb-30'>
                    <div className='label d-flex align-items-center'>
                      <input type='checkbox' id='enablePrice' checked={enablePrice} onChange={() => setEnablePrice((v) => !v)} style={{marginRight: 8}} />
                      <label htmlFor='enablePrice' style={{marginBottom: 0, cursor: 'pointer'}}>
                        Rango de precios
                      </label>
                    </div>
                    <div style={!enablePrice ? {pointerEvents: 'none', opacity: 0.5} : {}}>
                      <NiceSelect
                        className='nice-select fw-normal'
                        options={[
                          {value: '1', text: '$10,000 - $200,000'},
                          {value: '2', text: '$20,000 - $300,000'},
                          {value: '3', text: '$30,000 - $400,000'},
                        ]}
                        defaultCurrent={0}
                        onChange={(option: {value: string}) => selectHandler({name: 'price', value: option.value})}
                        name='price'
                        placeholder=''
                      />
                    </div>
                  </div>
                </div>
                <div className='col-12'>
                  <div className='input-box-one'>
                    <button className='btn-five text-uppercase rounded-0 w-100'>Buscar</button>
                  </div>
                </div>
              </div>
            </form>
          </div>

          <div className={`tab-pane show ${activeTab === 1 ? 'active' : ''}`} id='rent'>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                searchHandler();
              }}
            >
              <div className='row gx-0 align-items-center'>
                <div className='col-12'>
                  <div className='input-box-one bottom-border mb-25'>
                    <div className='label'>Estoy buscando ...</div>
                    <NiceSelect
                      className='nice-select fw-normal'
                      options={[
                        {value: '', text: 'Todos'},
                        {value: 'rent_casa', text: 'Casa'},
                        {value: 'rent_duplex', text: 'Duplex'},
                        {value: 'rent_triplex', text: 'Triplex'},
                        {value: 'rent_lote', text: 'Lote'},
                        {value: 'rent_oficina', text: 'Oficina'},
                        {value: 'rent_local_comercial', text: 'Local Comercial'},
                        {value: 'rent_loft', text: 'Loft'},
                        {value: 'rent_departamento', text: 'Departamento'},
                        {value: 'rent_ph', text: 'PH'},
                        {value: 'rent_galpon', text: 'Galpón'},
                        {value: 'rent_quinta', text: 'Quinta'},
                        {value: 'rent_chacra', text: 'Chacra'},
                        {value: 'rent_estudio', text: 'Estudio'},
                      ]}
                      defaultCurrent={0}
                      onChange={(option: {value: string}) => selectHandler({name: 'type', value: option.value})}
                      name='type'
                      placeholder=''
                    />
                  </div>
                </div>
                <div className='col-12'>
                  <div className='input-box-one bottom-border mb-25'>
                    <div className='label'>Ubicación</div>
                    <NiceSelect
                      className='nice-select location fw-normal'
                      options={locations}
                      defaultCurrent={0}
                      onChange={(option: {value: string}) => selectHandler({name: 'location', value: option.value})}
                      name='location'
                      placeholder='Selecciona una ubicación'
                    />
                  </div>
                </div>
                <div className='col-12'>
                  <div className='input-box-one bottom-border mb-50 lg-mb-30'>
                    <div className='label d-flex align-items-center'>
                      <input type='checkbox' id='enablePriceRent' checked={enablePrice} onChange={() => setEnablePrice((v) => !v)} style={{marginRight: 8}} />
                      <label htmlFor='enablePriceRent' style={{marginBottom: 0, cursor: 'pointer'}}>
                        Rango de precios
                      </label>
                    </div>
                    <div style={!enablePrice ? {pointerEvents: 'none', opacity: 0.5} : {}}>
                      <NiceSelect
                        className='nice-select fw-normal'
                        options={[
                          {value: '1', text: '$10,000 - $200,000'},
                          {value: '2', text: '$20,000 - $300,000'},
                          {value: '3', text: '$30,000 - $400,000'},
                        ]}
                        defaultCurrent={0}
                        onChange={(option: {value: string}) => selectHandler({name: 'price', value: option.value})}
                        name='price'
                        placeholder=''
                      />
                    </div>
                  </div>
                </div>
                <div className='col-12'>
                  <div className='input-box-one'>
                    <button className='btn-five text-uppercase rounded-0 w-100'>Buscar</button>
                  </div>
                </div>
              </div>
            </form>
          </div>

          <div className={`tab-pane show ${activeTab === 2 ? 'active' : ''}`} id='vender'>
            <div className='row gx-0 align-items-center'>
              <div className='col-12'>
                <SellForm />
              </div>
            </div>
          </div>
          <div className={`tab-pane show ${activeTab === 3 ? 'active' : ''}`} id='tasar'>
            <div className='row gx-0 align-items-center'>
              <div className='col-12'>
                <AppraiseForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DropdownFour;
