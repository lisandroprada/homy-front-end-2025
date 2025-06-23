import HeaderOne from '@/layouts/headers/HeaderOne';
import FancyBanner from '../about-us-two/FancyBanner';
import FooterFour from '@/layouts/footers/FooterFour';
import HeaderTwo from '@/layouts/headers/HeaderTwo';
import BlockFeatureOne from './BlockFeatureOne';
import BreadcrumbFour from '@/components/common/breadcrumb/BreadcrumbFour';

const AboutUsThree = () => {
  return (
    <>
      <HeaderTwo style_1={false} style_2={true} />
      {/* <ListingTwoArea style={false} /> */}
      <BreadcrumbFour title='Nuestra Empresa' link='#' link_title='Páginas' sub_title='Propietas' style={true} />

      <BlockFeatureOne />
      <FooterFour />
    </>
  );
};

export default AboutUsThree;
