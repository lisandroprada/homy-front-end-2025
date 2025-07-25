import ListingDetailsFiveArea from './ListingDetailsFiveArea';
import FancyBanner from '@/components/common/FancyBanner';
import FooterFour from '@/layouts/footers/FooterFour';
import HeaderFour from '@/layouts/headers/HeaderFour';

interface ListingDetailsFiveProps {
  property: any;
}

const ListingDetailsFive = ({property}: ListingDetailsFiveProps) => {
  return (
    <>
      <HeaderFour />
      <ListingDetailsFiveArea property={property} />
      <FancyBanner />
      <FooterFour />
    </>
  );
};

export default ListingDetailsFive;
