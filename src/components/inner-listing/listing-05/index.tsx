'use client';
import FooterFour from '@/layouts/footers/FooterFour';
import ListingTwoArea from './ListingFiveArea';
import FancyBanner from '@/components/common/FancyBanner';
import HeaderTwo from '@/layouts/headers/HeaderTwo';

interface ListingFiveProps {
  publishForSale?: boolean;
  publishForRent?: boolean;
  type?: string;
  locality?: string;
  price?: string;
}

const ListingFive = ({publishForSale = false, publishForRent = false, type = '', locality = '', price = ''}: ListingFiveProps) => {
  return (
    <>
      <HeaderTwo style_1={false} style_2={true} />
      <ListingTwoArea publishForSale={publishForSale} publishForRent={publishForRent} type={type} locality={locality} price={price} />
      <FancyBanner />
      <FooterFour />
    </>
  );
};

export default ListingFive;
