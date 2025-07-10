import BlogDetails from '@/components/blogs/blog-details-two';
import Wrapper from '@/layouts/Wrapper';
import {Metadata} from 'next';

export const metadata: Metadata = {
  title: 'Noticias - Propietas Inmobiliaria',
};

export default function BlogDetailsPage() {
  return (
    <Wrapper>
      <BlogDetails />
    </Wrapper>
  );
}
