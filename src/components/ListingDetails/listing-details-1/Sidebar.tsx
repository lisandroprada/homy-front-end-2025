import FeatureListing from '../listing-details-sidebar.tsx/FeatureListing';
import MortgageCalculator from '../listing-details-sidebar.tsx/MortgageCalculator';
import ScheduleForm from '../listing-details-sidebar.tsx/ScheduleForm';
import SidebarInfo from '../listing-details-sidebar.tsx/SidebarInfo';

interface SidebarProps {
  property: any;
}

const Sidebar = ({property}: SidebarProps) => {
  return (
    <div className='col-xl-4 col-lg-8 me-auto ms-auto'>
      <div className='theme-sidebar-one dot-bg p-30 ms-xxl-3 lg-mt-80'>
        <div className='agent-info bg-white border-20 p-30 mb-40'>
          <SidebarInfo />
        </div>
        <div className='tour-schedule bg-white border-20 p-30 mb-40'>
          <h5 className='mb-40'>Coordiná una visita</h5>
          <ScheduleForm propertyId={property?._id} propertyAddress={property?.address} />
        </div>
        <div className='mortgage-calculator bg-white border-20 p-30 mb-40'>
          <h5 className='mb-40'>Calculadora de préstamo</h5>
          <MortgageCalculator />
        </div>
        {/* <h4>Precio</h4> */}
        {/* {property?.valueForSale?.pricePublic && (
          <div>
            <span>
              {property.valueForSale.amount} {property.valueForSale.currency}
            </span>
          </div>
        )}
        {property?.valueForRent?.pricePublic && (
          <div>
            <span>
              {property.valueForRent.amount} {property.valueForRent.currency}
            </span>
          </div>
        )
        } */}
        <FeatureListing />
      </div>
    </div>
  );
};

export default Sidebar;
