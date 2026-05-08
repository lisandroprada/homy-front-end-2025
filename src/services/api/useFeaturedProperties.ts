'use client';
import useSWR from 'swr';
import { fetcher } from './fetcher';
import type { PropertyListResponse } from '@/types/api/property';

export function useFeaturedProperties(limit = 6) {
  const url = `/property/public?featured=true&pageSize=${limit}`;
  const { data, error, isLoading } = useSWR<PropertyListResponse>(url, fetcher);
  return {
    properties: data?.items || [],
    isLoading,
    isError: !!error,
  };
}
