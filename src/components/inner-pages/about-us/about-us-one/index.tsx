import BLockFeatureOne from './BLockFeatureOne';
import VideoBanner from '@/components/homes/home-seven/VideoBanner';
import BLockFeatureFive from '@/components/homes/home-one/BLockFeatureFive';
import Feedback from '@/components/homes/home-five/Feedback';
import AgentArea from '@/components/homes/home-one/AgentArea';
import Brand from './Brand';
import FooterFour from '@/layouts/footers/FooterFour';
import FancyBanner from '@/components/common/FancyBanner';
import HeaderTwo from '@/layouts/headers/HeaderTwo';
import BreadcrumbFour from '@/components/common/breadcrumb/BreadcrumbFour';

const AboutUsOne = () => {
  return (
    <>
      <HeaderTwo style_1={false} style_2={true} />
      <BreadcrumbFour title='Nuestra Empresa' link='#' link_title='Páginas' sub_title='Propietas' style={true} />

      <BLockFeatureOne />
      <VideoBanner />
      <BLockFeatureFive style={true} />
      <Feedback style={true} />
      <AgentArea style={false} />
      <Brand />
      <FancyBanner style={false} />
      <FooterFour />
    </>
  );
};

export default AboutUsOne;
