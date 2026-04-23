import BlogDetails from '@/components/blogs/blog-details-two';
import Wrapper from '@/layouts/Wrapper';
import {getBlogPostById, buildBlogMetadata, buildBlogJsonLd} from '@/lib/blogMetadata';

export async function generateMetadata({params}: {params: Promise<{id: string}>}) {
  const {id} = await params;
  const post = await getBlogPostById(id);
  if (!post) return {};
  return buildBlogMetadata(post, id);
}

export default async function BlogDetailsPage({params}: {params: Promise<{id: string}>}) {
  const {id} = await params;
  const post = await getBlogPostById(id);
  const jsonLd = post ? buildBlogJsonLd(post, id) : null;

  return (
    <Wrapper>
      {jsonLd && <script type='application/ld+json' dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}} />}
      <BlogDetails />
    </Wrapper>
  );
}
