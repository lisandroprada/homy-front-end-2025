import BreadcrumbThree from '@/components/common/breadcrumb/BreadcrumbThree';
import FooterFour from '@/layouts/footers/FooterFour';
import HeaderFour from '@/layouts/headers/HeaderFour';
import BlogOneArea from './BlogOneArea';
import FancyBanner from '@/components/common/FancyBanner';

const BlogOne = () => {
  return (
    <>
      <HeaderFour />
      <BreadcrumbThree title='Noticias' link='#' link_title='Pagina' sub_title='Noticias' style={false} />
      <BlogOneArea />
      <FancyBanner />
      <FooterFour />
    </>
  );
};

export default BlogOne;
