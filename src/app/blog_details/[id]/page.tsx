import BlogDetails from '@/components/blogs/blog-details-two';
import BlogBody from '@/components/blogs/blog-details-two/BlogBody';
import Wrapper from '@/layouts/Wrapper';
import {notFound} from 'next/navigation';
import {getBlogPostById, buildBlogMetadata, buildBlogJsonLd} from '@/lib/blogMetadata';
import {serializeJsonLd} from '@/lib/propertyMetadata';

export async function generateMetadata({params}: {params: Promise<{id: string}>}) {
  const {id} = await params;
  const post = await getBlogPostById(id);
  if (!post) return {};
  return buildBlogMetadata(post, id);
}

export default async function BlogDetailsPage({params}: {params: Promise<{id: string}>}) {
  const {id} = await params;
  const post = await getBlogPostById(id);
  if (!post) return notFound();
  // The client component only needs the fields around the text. Passing `content` along would
  // make Next serialize the whole article a second time into the page payload.
  const {content, ...postWithoutBody} = post;

  return (
    <Wrapper>
      <script type='application/ld+json' dangerouslySetInnerHTML={{__html: serializeJsonLd(buildBlogJsonLd(post, id))}} />
      {/* The post and its body are rendered on the server so the text is in the HTML crawlers receive. */}
      <BlogDetails post={postWithoutBody}>
        <BlogBody markdown={content ?? ''} />
      </BlogDetails>
    </Wrapper>
  );
}
