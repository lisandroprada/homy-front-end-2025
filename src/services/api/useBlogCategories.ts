import {useEffect, useState} from 'react';

export interface BlogCategory {
  category: string;
  count: number;
}

export function useBlogCategories() {
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/v1/blog/stats/categories')
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
        setLoading(false);
      });
  }, []);

  return {categories, loading};
}
