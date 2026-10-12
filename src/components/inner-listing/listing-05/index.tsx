'use client';
import FooterFour from '@/layouts/footers/FooterFour';
import ListingTwoArea from './ListingFiveArea';
import FancyBanner from '@/components/common/FancyBanner';
import HeaderTwo from '@/layouts/headers/HeaderTwo';
import type {ReactNode} from 'react';

interface ListingFiveProps {
  publishForSale?: boolean;
  publishForRent?: boolean;
  type?: string;
  locality?: string;
  price?: string;
  /** Server-rendered content shown before the call-to-action and footer (crawlable link index). */
  children?: ReactNode;
}

const ListingFive = ({publishForSale = false, publishForRent = false, type = '', locality = '', price = '', children}: ListingFiveProps) => {
  return (
    <>
      <HeaderTwo style_1={false} style_2={true} />
      <h1 className='visually-hidden'>Alquiler y venta de propiedades en Rawson y Playa Unión</h1>
      <ListingTwoArea publishForSale={publishForSale} publishForRent={publishForRent} type={type} locality={locality} price={price} />
      {children}
      <FancyBanner />
      <FooterFour />
    </>
  );
};

export default ListingFive;
