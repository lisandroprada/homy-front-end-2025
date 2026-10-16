import FeatureListing from '../listing-details-sidebar.tsx/FeatureListing';
import MortgageCalculator from '../listing-details-sidebar.tsx/MortgageCalculator';
import ScheduleForm from '../listing-details-sidebar.tsx/ScheduleForm';
import SidebarInfo from '../listing-details-sidebar.tsx/SidebarInfo';

interface SidebarProps {
  property: any;
}

import { formatPropertyPrice } from '@/utils/property-price';

const Sidebar = ({property}: SidebarProps) => {
  const salePrice = formatPropertyPrice(property?.valueForSale, 'USD');
  const rentPrice = formatPropertyPrice(property?.valueForRent, 'ARS');
  return (
    <div className='col-xl-4 col-lg-8 me-auto ms-auto'>
      <div className='theme-sidebar-one dot-bg p-30 ms-xxl-3 lg-mt-80'>
        {/* <div className='agent-info bg-white border-20 p-30 mb-40'>
          <SidebarInfo />
        </div> */}
        <div className='tour-schedule bg-white border-20 p-30 mb-40'>
          <h5 className='mb-20'>{property?.status === 'VENDIDO' ? 'Busco una propiedad similar' : 'Coordiná una visita'}</h5>
          {property?.status === 'VENDIDO' && <p className="fs-16 mb-25">Esta propiedad ya se vendió. Contanos qué estás buscando y te ayudamos a encontrar una alternativa.</p>}
          <ScheduleForm propertyId={property?._id} propertyAddress={property?.address} sold={property?.status === 'VENDIDO'} />
        </div>
        {/* <div className='mortgage-calculator bg-white border-20 p-30 mb-40'>
          <h5 className='mb-40'>Calculadora de préstamo</h5>
          <MortgageCalculator />
        </div> */}
        {/* <h4>Precio</h4> */}
        {/* {property?.publishForSale && (
          <div>
            <span>Venta: {salePrice}</span>
          </div>
        )}
        {property?.publishForRent && (
          <div>
            <span>Alquiler: {rentPrice}</span>
          </div>
        )} */}
        <FeatureListing />
      </div>
    </div>
  );
};

export default Sidebar;
