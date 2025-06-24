import BlogOne from '@/components/blogs/blog-one';
import Wrapper from '@/layouts/Wrapper';

export const metadata = {
  title: 'Noticias - Propietas Inmobiliaria',
};
const index = () => {
  return (
    <Wrapper>
      <BlogOne />
    </Wrapper>
  );
};

export default index;
