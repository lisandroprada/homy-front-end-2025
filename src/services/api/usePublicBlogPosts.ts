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

  return {
    posts: data?.items || [],
    meta,
    isLoading,
    isError: !!error,
    error,
  };
}

export function usePublicBlogPost(id?: string) {
  const apiBase = getApiBaseUrl();
  const shouldFetch = Boolean(id);
  const url = shouldFetch ? `${apiBase}/blog/${id}` : null;
  const {data, error, isLoading} = useSWR<PublicBlogPost>(url, fetcher);
  return {
    post: data,
    isLoading,
    isError: !!error,
    error,
  };
}
