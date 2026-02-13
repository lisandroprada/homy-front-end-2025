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

function getApiBaseUrl() {
  return process.env.NEXT_PUBLIC_API_BASE_URL || '';
}

function buildQuery(params: PublicBlogParams = {}) {
  const query = new URLSearchParams();
  let searchIndex = 0;
  if (params.search) {
    query.append(`search[criteria][${searchIndex}][field]`, 'title');
    query.append(`search[criteria][${searchIndex}][term]`, String(params.search));
    query.append(`search[criteria][${searchIndex}][operation]`, 'contains');
    searchIndex++;
  }
  if (params.category) {
    query.append(`search[criteria][${searchIndex}][field]`, 'category');
    query.append(`search[criteria][${searchIndex}][term]`, String(params.category));
    query.append(`search[criteria][${searchIndex}][operation]`, 'eq');
    searchIndex++;
  }
  Object.entries(params).forEach(([key, value]) => {
    if (['search', 'category'].includes(key)) return;
    if (value !== undefined && value !== null && value !== '') {
      query.append(key, String(value));
    }
  });
  return query.toString();
}

export function usePublicBlogPosts(params: PublicBlogParams = {}) {
  const query = buildQuery({page: 0, pageSize: 6, ...params});
  const apiBase = getApiBaseUrl();
  const url = `${apiBase}/blog/public?${query}`;
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
  const mappedPosts = (data?.items || []).map((item: any) => ({
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
  }));

  return {
    posts: mappedPosts,
    meta,
    isLoading,
    isError: !!error,
    error,
  };
}

export function usePublicBlogPost(id?: string) {
  const apiBase = getApiBaseUrl();
  const shouldFetch = Boolean(id);
  const url = shouldFetch ? `${apiBase}/blog/public/${id}` : null;
  const {data, error, isLoading} = useSWR<PublicBlogPost>(url, fetcher);
  
  // Mapear al formato legacy si hay datos
  const mappedPost = data ? {
    ...data,
    _id: (data as any).id,
    image_url: (data as any).imageUrl,
    second_image_url: (data as any).secondImageUrl,
    date: (data as any).publishedAt ? new Date((data as any).publishedAt).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }) : '',
    published_at: (data as any).publishedAt,
    created_at: (data as any).createdAt,
  } : undefined;
  
  return {
    post: mappedPost,
    isLoading,
    isError: !!error,
    error,
  };
}
