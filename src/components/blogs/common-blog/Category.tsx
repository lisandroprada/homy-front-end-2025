import Link from 'next/link';
import {BlogCategory} from '@/services/api/useBlogCategories';

interface CategoryProps {
  categories: BlogCategory[];
  selectedCategory?: string;
  onCategoryChange?: (category: string) => void;
}

const Category = ({categories, selectedCategory, onCategoryChange}: CategoryProps) => {
  if (!categories || categories.length === 0) return null;
  return (
    <div className='categories bg-white bg-wrapper mb-30'>
      <h5 className='mb-20'>Categorías</h5>
      <ul className='style-none' style={{margin: 0, padding: 0}}>
        <li className={`d-flex justify-content-between align-items-center${!selectedCategory ? ' active' : ''}`} style={{marginBottom: 8}}>
          <button
            type='button'
            className='btn btn-link p-0 text-start'
            style={{
              textDecoration: 'none',
              color: !selectedCategory ? '#dc3545' : '#222',
              fontWeight: !selectedCategory ? 600 : 400,
              fontSize: 16,
              background: !selectedCategory ? 'rgba(220,53,69,0.08)' : 'transparent',
              borderRadius: 4,
              width: '100%',
              padding: '6px 8px',
              margin: 0,
              transition: 'background 0.2s',
            }}
            onClick={() => onCategoryChange && onCategoryChange('')}
          >
            Todas
          </button>
        </li>
        {categories.map((cat, i) => (
          <li key={i} className={`d-flex justify-content-between align-items-center${selectedCategory === cat.category ? ' active' : ''}`} style={{marginBottom: 8}}>
            <button
              type='button'
              className='btn btn-link p-0 text-start'
              style={{
                textDecoration: 'none',
                color: selectedCategory === cat.category ? '#dc3545' : '#222',
                fontWeight: selectedCategory === cat.category ? 600 : 400,
                fontSize: 16,
                background: selectedCategory === cat.category ? 'rgba(220,53,69,0.08)' : 'transparent',
                borderRadius: 4,
                width: '100%',
                padding: '6px 8px',
                margin: 0,
                transition: 'background 0.2s',
              }}
              onClick={() => onCategoryChange && onCategoryChange(selectedCategory === cat.category ? '' : cat.category)}
            >
              {cat.category}
            </button>
            <span className='badge bg-light text-dark ms-2' style={{fontSize: 13, fontWeight: 400}}>
              {cat.count}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Category;
