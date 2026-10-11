import Image from 'next/image';
import Link from 'next/link';
import {useRecentBlogPosts} from '@/services/api/usePublicBlogPosts';

/**
 * "Noticias recientes" sidebar widget.
 * It must go through useRecentBlogPosts: the API returns { id, imageUrl, publishedAt } and the hook maps
 * them to the { _id, image_url, date } this template markup expects. Reading the raw response gave
 * `src={undefined}` (broken image), links to /blog_details/undefined and an empty date.
 */
const BlogRcPost = () => {
  const {posts, isLoading, isError} = useRecentBlogPosts(5);

  if (isLoading) return <div className='recent-news bg-white bg-wrapper mb-30'>Cargando...</div>;
  if (isError) return <div className='recent-news bg-white bg-wrapper mb-30 text-danger'>Error al cargar noticias recientes.</div>;
  if (posts.length === 0) return null;

  return (
    <div className='recent-news bg-white bg-wrapper mb-30'>
      <h5 className='mb-20'>Noticias recientes</h5>
      {posts.map((item: any) => (
        <div key={item._id} className='news-block d-flex align-items-center pb-25'>
          {item.image_url && (
            <div>
              <Image src={item.image_url} alt={item.title} className='lazy-img' width={80} height={45} style={{objectFit: 'cover'}} />
            </div>
          )}
          <div className='post ps-4'>
            <h4 className='mb-5'>
              <Link href={`/blog_details/${item._id}`} className='title tran3s'>
                {item.title}
              </Link>
            </h4>
            <div className='date'>{item.date}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogRcPost;
