import {useEffect, useState} from 'react';
import {API_BASE_URL} from '../../utils/apiConfig';

export interface BlogCategory {
  category: string;
  count: number;
}

export function useBlogCategories() {
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/blog/public/stats/categories`)
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
        setLoading(false);
      });
  }, []);

  return {categories, loading};
}
