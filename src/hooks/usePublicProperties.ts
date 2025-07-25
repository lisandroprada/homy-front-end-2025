import {useState, useEffect} from 'react';

const API_URL = '/api/v1/property/public';

export function usePublicProperties({page = 0, pageSize = 4, filters = {}, sort = ''}) {
  const [data, setData] = useState({items: [], meta: {totalItems: 0, itemCount: 0, itemsPerPage: pageSize, totalPages: 0, currentPage: page}});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    const params = new URLSearchParams();
    params.append('page', String(page));
    params.append('pageSize', String(pageSize));
    if (sort) params.append('sort', sort);
    // Add filters as query params
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.append(key, String(value));
      }
    });
    fetch(`${API_URL}?${params.toString()}`)
      .then((res) => {
        if (!res.ok) throw new Error('Error fetching properties');
        return res.json();
      })
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [page, pageSize, filters, sort]);

  return {...data, loading, error};
}
