'use client';
import {useEffect, useState} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {API_BASE_URL} from '../../../utils/apiConfig';

type BlogPost = {
  _id: string;
  date: string;
  title: string;
  description: string;
  image_url: string;
  second_image_url?: string;
  quote?: string;
  author: string;
  category: string;
  keywords: string[];
  createdAt: string;
};

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchRecentPosts = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        const res = await fetch(`${API_BASE_URL}/blog/public/recent`);
        if (!res.ok) throw new Error('Error fetching');
        const data = await res.json();
        setPosts(data);
      } catch (e) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRecentPosts();
  }, []);

  return (
    <div className='blog-section-two mt-170 xl-mt-120'>
      <div className='container container-large'>
        <div className='position-relative'>
          <div className='title-one mb-50 xl-mb-30 lg-mb-10 wow fadeInUp'>
            <h3>Noticias</h3>
          </div>

          <div className='row gx-xxl-5 justify-content-center'>
            {isLoading && <div className='text-center w-100'>Cargando...</div>}
            {isError && <div className='text-center w-100 text-danger'>Error al cargar las noticias.</div>}
            {!isLoading &&
              !isError &&
              posts.map((item) => (
                <div key={item._id} className='col-lg-4 col-md-6 d-flex justify-content-center'>
                  <article className='blog-meta-two tran3s position-relative z-1 mt-35 wow fadeInUp'>
                    <figure className={`post-img position-relative m0`}>
                      {item.image_url && (
                        <Link href={`/blog_details/${item._id}`} className='d-block'>
                          <Image src={item.image_url} alt={item.title} width={400} height={225} style={{width: '100%', height: 'auto'}} unoptimized />
                          <span className='date-overlay position-absolute top-0 start-0 m-2 px-3 py-1 bg-white rounded shadow' style={{fontWeight: 600, fontSize: '1rem'}}>
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
                        <span>{item.author}</span> {/* Puedes mostrar el autor si lo deseas */}
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
    </div>
  );
};

export default Blog;
