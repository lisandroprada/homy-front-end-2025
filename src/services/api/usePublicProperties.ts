import useSWR from 'swr';
import {fetcher} from './fetcher';
import type {PropertyListResponse} from '@/types/api/property';

export interface PublicPropertyParams {
  page?: number;
  pageSize?: number;
  sort?: string;
  order?: 'asc' | 'desc';
  type?: string;
  status?: string;
  province?: string;
  locality?: string;
  address?: string;
  [key: string]: any;
}

function buildQuery(params: PublicPropertyParams = {}) {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      query.append(key, String(value));
    }
  });
  return query.toString();
}

export function usePublicProperties(params: PublicPropertyParams = {}) {
  const query = buildQuery({page: 0, pageSize: 3, ...params});
  // Usa la misma base URL que el resto del proyecto (API_BASE_URL del apiConfig)
  const url = `/property/public?${query}`;
  const {data, error, isLoading} = useSWR<PropertyListResponse>(url, fetcher);
  return {
    properties: data?.items || [],
    meta: data?.meta,
    isLoading,
    isError: !!error,
    error,
  };
}
