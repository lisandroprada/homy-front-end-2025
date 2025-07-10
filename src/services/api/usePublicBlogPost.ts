import useSWR from 'swr';
import {fetcher} from './fetcher';
import type {PublicBlogPost} from '@/types/api/blog';

export function usePublicBlogPost(id?: string) {
  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || '';
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
