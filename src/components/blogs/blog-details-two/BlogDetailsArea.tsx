'use client';
import Image from 'next/image';
import Link from 'next/link';
import BlogComment from '../common-blog/BlogComment';
import BlogForm from '@/components/forms/BlogForm';
import BlogSidebar from '../common-blog/BlogSidebar';
import {useEffect, useState} from 'react';
import {useParams} from 'next/navigation';
import {format} from 'date-fns';
import {useBlogCategories} from '@/services/api/useBlogCategories';

import blogDetailsIcon from '@/assets/images/icon/icon_67.svg';

interface BlogPost {
  _id: string;
  date: string;
  title: string;
  description: string;
  image_url: string;
  second_image_url?: string;
  quote?: string;
  author?: string;
  createdAt?: string;
  category?: string;
  keywords?: string[]; // Added to fix the error
}

const BlogDetailsArea = () => {
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const {categories: allCategories, loading: loadingCategories} = useBlogCategories();

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetch(`/api/v1/blog/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Error fetching post');
        return res.json();
      })
      .then((data) => {
        console.log('BlogDetailsArea id:', id, 'data:', data); // <-- LOG para depuración
        setPost(data);
        setLoading(false);
      })
      .catch((e) => {
        setError(true);
        setLoading(false);
        console.error('BlogDetailsArea error:', e);
      });
  }, [id]);

  console.log('allCategories:', allCategories, 'loadingCategories:', loadingCategories);

  if (loading) return <div className='text-center'>Cargando...</div>;
  if (error || !post) return <div className='text-center text-danger'>No se pudo cargar el post.</div>;

  // Formateo de fecha si existe createdAt
  let fecha = post.date;
  if (post.createdAt) {
    try {
      fecha = format(new Date(post.createdAt), 'dd MMM yyyy');
    } catch {}
  }

  // Ejemplo: categorías y tags mockeados, reemplaza por los reales si tu backend los provee
  const categories = post?.category ? [post.category] : [];
  const tags = post?.keywords || [];

  return (
    <div className='blog-details border-top mt-130 xl-mt-100 pt-100 xl-pt-80 mb-150 xl-mb-100'>
      <div className='container'>
        <div className='row gx-xl-5'>
          <div className='col-lg-8'>
            <div className='blog-post-meta mb-60 lg-mb-40'>
              <div className='post-info'>
                <Link href='#'>{post.author || 'Propietas Inmobiliaria'}</Link> {fecha}
              </div>
              <h3 className='blog-title'>{post.title}</h3>
            </div>
          </div>
        </div>
        <div className='row gx-xl-5'>
          <div className='col-lg-8'>
            <article className='blog-post-meta'>
              {post.image_url && (
                <figure className='post-img position-relative m0' style={{backgroundImage: `url(${post.image_url})`}}>
                  <div className='fw-500 date d-inline-block'>{fecha}</div>
                </figure>
              )}
              <div className='post-data pt-50 md-pt-30'>
                <p>{post.description}</p>
                {post.quote && (
                  <div className='quote-wrapper'>
                    <div className='icon rounded-circle d-flex align-items-center justify-content-center m-auto'>
                      <Image src={blogDetailsIcon} alt='' className='lazy-img' />
                    </div>
                    <div className='row'>
                      <div className='col-xxl-10 col-xl-11 col-lg-12 col-md-9 m-auto'>
                        <h4>{post.quote}</h4>
                      </div>
                    </div>
                    <h6>{post.author || 'Propietas Inmobiliaria'}</h6>
                  </div>
                )}
                {post.second_image_url && (
                  <div className='img-meta'>
                    <Image src={post.second_image_url} alt='' className='lazy-img w-100' width={800} height={450} unoptimized />
                  </div>
                )}
              </div>
              <div className='bottom-widget d-sm-flex align-items-center justify-content-between'>
                <ul className='d-flex align-items-center tags style-none pt-20'>
                  <li>Tag:</li>
                  {/* Aquí puedes mapear tags reales si el backend los provee */}
                </ul>
                <ul className='d-flex share-icon align-items-center style-none pt-20'>
                  <li>Share:</li>
                  {/* Aquí puedes mapear los íconos de compartir si es necesario */}
                </ul>
              </div>
            </article>
            <BlogComment />
            <BlogForm />
          </div>
          <BlogSidebar style={true} categories={!loadingCategories ? allCategories : []} tags={tags} />
        </div>
      </div>
    </div>
  );
};

export default BlogDetailsArea;
