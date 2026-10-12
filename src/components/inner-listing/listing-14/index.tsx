import FooterFour from '@/layouts/footers/FooterFour';
import FancyBanner from '@/components/common/FancyBanner';
import ListingFourteenArea from './ListingFourteenArea';
import HeaderTwo from '@/layouts/headers/HeaderTwo';

const ListingEleven = () => {
  return (
    <>
      <HeaderTwo style_1={false} style_2={true} />
      <h1 className='visually-hidden'>Mapa de propiedades en Rawson y Playa Unión</h1>
      <ListingFourteenArea />
      <FancyBanner />
      <FooterFour />
    </>
  );
};

export default ListingEleven;
