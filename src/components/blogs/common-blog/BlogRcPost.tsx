import Image from 'next/image';
import Link from 'next/link';
import useSWR from 'swr';

const BlogRcPost = () => {
  const {data, error, isLoading} = useSWR('/api/v1/blog/public/recent', (url) => fetch(url).then((res) => res.json()));
  if (isLoading) return <div className='recent-news bg-white bg-wrapper mb-30'>Cargando...</div>;
  if (error) return <div className='recent-news bg-white bg-wrapper mb-30 text-danger'>Error al cargar noticias recientes.</div>;
  const posts = data || [];
  return (
    <div className='recent-news bg-white bg-wrapper mb-30'>
      <h5 className='mb-20'>Noticias recientes</h5>
      {posts.map((item: any) => (
        <div key={item._id} className='news-block d-flex align-items-center pb-25'>
          <div>
            <Image src={item.image_url} alt={item.title} className='lazy-img' width={80} height={45} unoptimized />
          </div>
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
