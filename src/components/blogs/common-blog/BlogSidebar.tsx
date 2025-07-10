import BlogRcPost from './BlogRcPost';
import Category from './Category';
import Tag from './Tag';
import {BlogCategory} from '@/services/api/useBlogCategories';

interface BlogSidebarProps {
  categories?: BlogCategory[];
  tags?: string[];
  search?: string;
  onSearchChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const BlogSidebar = ({style, categories = [], tags = [], search = '', onSearchChange}: BlogSidebarProps & {style?: any}) => {
  return (
    <div className='col-lg-4'>
      <div className={`blog-sidebar dot-bg md-mt-60 ${style ? 'ms-xxl-4' : 'ms-xxl-5'}`}>
        <div className='search-form bg-white mb-30'>
          <form onSubmit={(e) => e.preventDefault()} className='position-relative'>
            <input type='text' placeholder='Buscar...' value={search} onChange={onSearchChange} />
            <button>
              <i className='fa-sharp fa-regular fa-magnifying-glass'></i>
            </button>
          </form>
        </div>
        <Category categories={categories} />
        <BlogRcPost />
        <Tag tags={tags} />
      </div>
    </div>
  );
};

export default BlogSidebar;
