import BlogDetails from '@/components/blogs/blog-details';
import Wrapper from '@/layouts/Wrapper';

export const metadata = {
  title: 'Noticias - Propietas Inmobiliaria',
};
const index = () => {
  return (
    <Wrapper>
      <BlogDetails />
    </Wrapper>
  );
};

export default index;
