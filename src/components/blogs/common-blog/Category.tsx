import Link from 'next/link';
import {BlogCategory} from '@/services/api/useBlogCategories';

interface CategoryProps {
  categories: BlogCategory[];
}

const Category = ({categories}: CategoryProps) => {
  if (!categories || categories.length === 0) return null;
  return (
    <div className='categories bg-white bg-wrapper mb-30'>
      <h5 className='mb-20'>Categorías</h5>
      <ul className='style-none'>
        {categories.map((cat, i) => (
          <li key={i} className='d-flex justify-content-between align-items-center'>
            <Link href='#'>{cat.category}</Link>
            <span className='badge bg-light text-dark ms-2'>{cat.count}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Category;
