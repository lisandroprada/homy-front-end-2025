import useSWR from 'swr';
import {fetcher} from './fetcher';
import type {PublicBlogListResponse, PublicBlogPost} from '@/types/api/blog';

export interface PublicBlogParams {
  page?: number;
  pageSize?: number;
  search?: string;
  category?: string;
  sort?: string;
}

function buildQuery(params: PublicBlogParams = {}) {
  const query = new URLSearchParams();
  
  if (params.search) {
    query.append('search', String(params.search));
  }
  
  if (params.category) {
    query.append('category', String(params.category));
  }

  Object.entries(params).forEach(([key, value]) => {
    if (['search', 'category'].includes(key)) return;
    if (value !== undefined && value !== null && value !== '') {
      query.append(key, String(value));
    }
  });
  return query.toString();
}

// Función de mapeo común para posts de blog
function mapBlogPost(item: any) {
  return {
    ...item,
    _id: item.id,
    image_url: item.imageUrl,
    second_image_url: item.secondImageUrl,
    date: item.publishedAt ? new Date(item.publishedAt).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }) : '',
    published_at: item.publishedAt,
    created_at: item.createdAt,
  };
}

export function usePublicBlogPosts(params: PublicBlogParams = {}) {
  const query = buildQuery({page: 0, pageSize: 6, ...params});

  const url = `/blog/public?${query}`;
  const {data, error, isLoading} = useSWR<PublicBlogListResponse>(url, fetcher);

  // Adaptar meta si no existe
  let meta = data?.meta;
  const raw = data as any;
  if (!meta && raw && typeof raw.totalPages !== 'undefined') {
    meta = {
      totalItems: raw.totalItems,
      totalPages: raw.totalPages,
      itemCount: raw.items?.length || 0,
      pageSize: params.pageSize || 6,
      currentPage: params.page || 0,
    };
  }

  // Mapear campos de la API al formato esperado por los componentes legacy
  const mappedPosts = Array.isArray(data?.items) ? data.items.map(mapBlogPost) : [];

  return {
    posts: mappedPosts,
    meta,
    isLoading,
    isError: !!error,
    error,
  };
}

export function useRecentBlogPosts(limit: number = 3) {
  const url = `/blog/public/recent?limit=${limit}`;
  const {data, error, isLoading} = useSWR<any[]>(url, fetcher);

  const mappedPosts = Array.isArray(data) ? data.map(mapBlogPost) : [];

  return {
    posts: mappedPosts,
    isLoading,
    isError: !!error,
    error,
  };
}

export function usePublicBlogPost(id?: string) {
  const shouldFetch = Boolean(id);
  const url = shouldFetch ? `/blog/public/${id}` : null;
  const {data, error, isLoading} = useSWR<PublicBlogPost>(url, fetcher);
  
  // Mapear al formato legacy si hay datos
  const mappedPost = data ? mapBlogPost(data) : undefined;
  
  return {
    post: mappedPost,
    isLoading,
    isError: !!error,
    error,
  };
}
