import FooterFour from '@/layouts/footers/FooterFour';
import FancyBanner from '@/components/common/FancyBanner';
import ListingSixArea from './ListingSixArea';
import HeaderTwo from '@/layouts/headers/HeaderTwo';

const ListingSix = () => {
  return (
    <>
      <HeaderTwo style_1={false} style_2={true} />
      <ListingSixArea />
      <FancyBanner />
      <FooterFour />
    </>
  );
};

export default ListingSix;
