'use client';
import BlogSidebar from '../common-blog/BlogSidebar';
import Image from 'next/image';
import Link from 'next/link';
import {useState, useEffect} from 'react';
import ReactPaginate from 'react-paginate';
import {usePublicBlogPosts} from '@/services/api/usePublicBlogPosts';
import {useBlogCategories} from '@/services/api/useBlogCategories';
import paginateIcon from '@/assets/images/icon/icon_46.svg';
import {useSearchParams} from 'next/navigation';

const itemsPerPage = 6;

const BlogOneArea = () => {
  const searchParams = useSearchParams();
  const initialCategory = searchParams?.get('category') || '';
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const {posts, meta, isLoading, isError} = usePublicBlogPosts({page: currentPage, pageSize: itemsPerPage, search, category: selectedCategory, sort: '-date'});
  const {categories, loading: loadingCategories} = useBlogCategories();

  useEffect(() => {
    // Si cambia el parámetro en la URL, actualiza el filtro
    setSelectedCategory(searchParams?.get('category') || '');
  }, [searchParams]);

  const handlePageClick = (event: any) => {
    setCurrentPage(event.selected);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setCurrentPage(0);
  };

  return (
    <div className='blog-section-three mt-130 xl-mt-100 mb-150 xl-mb-100'>
      <div className='container container-large'>
        <div className='row'>
          <div className='col-lg-8'>
            <div className='row gx-xxl-5 justify-content-center'>
              {isLoading && <div className='text-center w-100'>Cargando...</div>}
              {isError && <div className='text-center w-100 text-danger'>Error al cargar los posts.</div>}
              {!isLoading &&
                !isError &&
                posts.map((item) => (
                  <div key={item._id} className='col-md-6 d-flex justify-content-center'>
                    <article className='blog-meta-two tran3s position-relative z-1 mb-70 lg-mb-40 wow fadeInUp'>
                      <figure className={`post-img position-relative m0`}>
                        {item.image_url && (
                          <Link href={`/blog_details/${item._id}`} className='d-block'>
                            <Image src={item.image_url} alt={item.title} width={400} height={225} style={{width: '100%', height: 'auto'}} unoptimized />
                          </Link>
                        )}
                        <Link
                          href={`/blog_details/${item._id}`}
                          className='date'
                          style={{
                            minWidth: 140,
                            maxWidth: 200,
                            display: 'inline-block',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            position: 'absolute',
                            top: 16,
                            left: 16,
                            zIndex: 2,
                            background: '#fff',
                            color: '#222',
                            borderRadius: 6,
                            padding: '4px 20px',
                            fontWeight: 500,
                            fontSize: 15,
                            boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
                          }}
                        >
                          {item.date}
                        </Link>
                      </figure>
                      <div className='post-data'>
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
                        <Link
                          href={`/blog_details/${item._id}`}
                          className='date'
                          style={{
                            minWidth: 140,
                            maxWidth: 200,
                            display: 'inline-block',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            position: 'absolute',
                            top: 16,
                            left: 16,
                            zIndex: 4,
                            background: '#fff',
                            color: '#222',
                            borderRadius: 6,
                            padding: '4px 20px',
                            fontWeight: 600,
                            fontSize: 15,
                            boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
                          }}
                        >
                          {item.date}
                        </Link>
                        <div className='post-data'>
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

            {meta && Number(meta.totalPages) > 1 && (
              <ReactPaginate
                breakLabel='...'
                nextLabel={<Image src={paginateIcon} alt='' className='ms-2' />}
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                pageCount={Number(meta.totalPages)}
                forcePage={currentPage}
                previousLabel={<Image src={paginateIcon} alt='' className='ms-2' />}
                renderOnZeroPageCount={null}
                className='pagination-one square d-flex align-items-center style-none pt-30'
              />
            )}
          </div>
          <BlogSidebar
            categories={categories}
            search={search}
            onSearchChange={handleSearchChange}
            selectedCategory={selectedCategory}
            onCategoryChange={(cat) => {
              setSelectedCategory(cat);
              setCurrentPage(0);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default BlogOneArea;
