import BreadcrumbOne from '@/components/common/breadcrumb/BreadcrumbOne';
import FooterFour from '@/layouts/footers/FooterFour';
import FaqArea from './FaqArea';
import FancyBanner from '@/components/common/FancyBanner';
import HeaderTwo from '@/layouts/headers/HeaderTwo';

const Faq = () => {
  return (
    <>
      <HeaderTwo style_1={false} style_2={true} />
      <BreadcrumbOne title='Preguntas y Respuestas' link='#' link_title='Páginas' sub_title='Preguntas Frecuentes' style={true} />
      <FaqArea />
      <FancyBanner style={false} />
      <FooterFour />
    </>
  );
};

export default Faq;
