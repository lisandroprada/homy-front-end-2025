import React from 'react';

interface LocationProps {
  property: any;
}

const Location = ({property}: LocationProps) => {
  const lat = property?.lat;
  const lng = property?.lng;
  const address = property?.address || '';
  // Google Maps embed con lat/lng
  const gmapsSrc = lat && lng ? `https://www.google.com/maps?q=${lat},${lng}&z=16&output=embed` : '';

  return (
    <div className='accordion-item'>
      <h2 className='accordion-header'>
        <button className='accordion-button collapsed' type='button' data-bs-toggle='collapse' data-bs-target='#collapseTenA' aria-expanded='true' aria-controls='collapseTenA'>
          Ubicación
        </button>
      </h2>
      <div id='collapseTenA' className='accordion-collapse collapse'>
        <div className='accordion-body'>
          <div className='property-location'>
            <div className='wrapper'>
              <div className='map-banner'>
                <div className='gmap_canvas h-100 w-100'>
                  {lat && lng ? (
                    <iframe
                      src={gmapsSrc}
                      width='600'
                      height='450'
                      style={{border: 0}}
                      allowFullScreen={true}
                      loading='lazy'
                      referrerPolicy='no-referrer-when-downgrade'
                      className='w-100 h-100'
                      title='Ubicación en mapa'
                    ></iframe>
                  ) : (
                    <div>No hay coordenadas para mostrar el mapa.</div>
                  )}
                </div>
                {/* <div className='mt-3'>
                  <strong>Dirección:</strong> {address}
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Location;
