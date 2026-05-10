'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useRecentBlogPosts } from '../../../services/api/usePublicBlogPosts';

const Blog = () => {
  const { posts, isLoading, isError } = useRecentBlogPosts(3);

  return (
    <div className='blog-section-two mt-170 xl-mt-120'>
      <div className='container container-large'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='title-one mb-50 xl-mb-30 lg-mb-10 wow fadeInUp'>
              <h3>Noticias</h3>
            </div>
          </div>
        </div>

        <div className='row gx-xxl-5 justify-content-center' style={{minHeight: '380px'}}>
          {isLoading && <div className='text-center w-100'>Cargando...</div>}
          {isError && <div className='text-center w-100 text-danger'>Error al cargar las noticias.</div>}
          {!isLoading &&
            !isError &&
            posts.map((item: any) => (
              <div key={item._id} className='col-lg-4 col-md-6 d-flex justify-content-center'>
                <article className='blog-meta-two tran3s position-relative z-1 mt-35 wow fadeInUp' style={{ width: '100%' }}>
                  <figure className={`post-img position-relative m0`}>
                    {item.image_url && (
                      <Link href={`/blog_details/${item._id}`} className='d-block'>
                        <Image 
                          src={item.image_url} 
                          alt={item.title} 
                          width={400} 
                          height={225} 
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          style={{ width: '100%', height: 'auto', objectFit: 'cover' }} 
                          unoptimized 
                        />
                        <span className='date-overlay position-absolute top-0 start-0 m-2 px-3 py-1 bg-white rounded shadow' style={{fontWeight: 600, fontSize: '1rem', zIndex: 2}}>
                          {item.date}
                        </span>
                      </Link>
                    )}
                    <Link href={`/blog_details/${item._id}`} className='date'>
                      {item.date}
                    </Link>
                  </figure>
                  <div className='post-data'>
                    <div className='post-info'>
                      <span>{item.author}</span>
                    </div>
                    <div className='d-flex justify-content-between align-items-sm-center flex-wrap'>
                      <Link href={`/blog_details/${item._id}`} className='blog-title'>
                        <h4>{item.title}</h4>
                      </Link>
                      <Link href={`/blog_details/${item._id}`} className='btn-four'>
                        <i className='bi bi-arrow-up-right'></i>
                      </Link>
                    </div>
                  </div>
                  <div className='hover-content tran3s'>
                    <Link href={`/blog_details/${item._id}`} className='date'>
                      {item.date}
                    </Link>
                    <div className='post-data'>
                      <div className='post-info'>
                        <span>{item.author}</span>
                      </div>
                      <div className='d-flex justify-content-between align-items-sm-center flex-wrap'>
                        <Link href={`/blog_details/${item._id}`} className='blog-title'>
                          <h4>{item.title}</h4>
                        </Link>
                      </div>
                    </div>
                    <Link href={`/blog_details/${item._id}`} className='btn-four inverse rounded-circle'>
                      <i className='fa-thin fa-arrow-up-right'></i>
                    </Link>
                  </div>
                </article>
              </div>
            ))}
        </div>

        <div className='section-btn text-center md-mt-60'>
          <Link href='/blog_01' className='btn-eight'>
            <span>Explorar todos</span> <i className='bi bi-arrow-up-right'></i>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Blog;
