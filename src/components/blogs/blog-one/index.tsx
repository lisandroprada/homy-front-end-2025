import BreadcrumbThree from '@/components/common/breadcrumb/BreadcrumbThree';
import FooterFour from '@/layouts/footers/FooterFour';
import BlogOneArea from './BlogOneArea';
import FancyBanner from '@/components/common/FancyBanner';
import HeaderTwo from '@/layouts/headers/HeaderTwo';

const BlogOne = () => {
  return (
    <>
      <HeaderTwo style_1={false} style_2={true} />
      <BreadcrumbThree title='Noticias' link='#' link_title='Pagina' sub_title='Noticias' style={false} />
      <BlogOneArea />
      <FancyBanner />
      <FooterFour />
    </>
  );
};

export default BlogOne;
