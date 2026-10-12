import ListingDetailsFiveArea from './ListingDetailsFiveArea';
import FancyBanner from '@/components/common/FancyBanner';
import FooterFour from '@/layouts/footers/FooterFour';
import HeaderFour from '@/layouts/headers/HeaderFour';
import type {ReactNode} from 'react';

interface ListingDetailsFiveProps {
  property: any;
  /** Server-rendered content shown before the call-to-action and footer (similar properties). */
  children?: ReactNode;
}

const ListingDetailsFive = ({property, children}: ListingDetailsFiveProps) => {
  return (
    <>
      <HeaderFour />
      <ListingDetailsFiveArea property={property} />
      {children}
      <FancyBanner />
      <FooterFour />
    </>
  );
};

export default ListingDetailsFive;
