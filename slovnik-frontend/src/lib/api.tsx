import { Translation, Joke, ApiResponse, ApiSingleResponse } from './types';
import { API } from '../config'

const API_URL = API || 'http://localhost:1337';

async function fetchAPI<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_URL}/api${endpoint}`;

  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    mode: 'cors',
  };

  const mergedOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, mergedOptions);
    
    if (!response.ok) {
      console.error('Response status:', response.status);
      console.error('Response text:', await response.text());
      throw new Error(`API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}

export async function getRandomTranslations(limit: number = 6) {
  try {
    const countResponse = await fetchAPI<ApiResponse<Translation[]>>('/translations?pagination[pageSize]=1');
    const total = countResponse.meta.pagination.total;
    
    if (total <= limit) {
      return fetchAPI<ApiResponse<Translation[]>>(`/translations?populate=*&pagination[limit]=${total}`);
    }
    
    const maxStart = Math.max(0, total - limit);
    const randomStart = Math.floor(Math.random() * maxStart);
    const randomSort = Math.random() < 0.5 ? 'asc' : 'desc';

    return fetchAPI<ApiResponse<Translation[]>>(
      `/translations?populate=*&pagination[start]=${randomStart}&pagination[limit]=${limit}&sort=updatedAt:${randomSort}`
    );
  } catch (error) {
    console.error('Error fetching random translations:', error);
    throw error;
  }
}

export async function searchTranslations(
  query: string,
  page: number = 1,
  pageSize: number = 10
) {
  const searchParams = new URLSearchParams();
  searchParams.append('populate', '*');
  searchParams.append('pagination[page]', page.toString());
  searchParams.append('pagination[pageSize]', pageSize.toString());

  searchParams.append('filters[$or][0][english][$containsi]', query);
  searchParams.append('filters[$or][1][czech][noun][$containsi]', query);
  searchParams.append('filters[$or][2][czech][verb][$containsi]', query);

  const url = `/translations?${searchParams.toString()}`;
  console.log('Search URL:', url);
  
  return fetchAPI<ApiResponse<Translation[]>>(url);
}

export async function getTranslation(id: string) {
  const url = `/translations/${id}?populate=*`;
  console.log('Fetching translation with URL:', url);
  return fetchAPI<ApiSingleResponse<Translation>>(url);
}

export async function getRandomJoke() {
  const allJokesCount = await fetchAPI<ApiResponse<Joke[]>>('/jokes?pagination[limit]=1')
    .then(res => res.meta.pagination.total);
    
  if (allJokesCount > 0) {
    const randomStart = Math.floor(Math.random() * allJokesCount);
    return fetchAPI<ApiResponse<Joke[]>>(`/jokes?pagination[start]=${randomStart}&pagination[limit]=1&populate=*`);
  }
  
  return { 
    data: [], 
    meta: { 
      pagination: { 
        page: 1, 
        pageSize: 1, 
        pageCount: 0, 
        total: 0 
      } 
    } 
  } as ApiResponse<Joke[]>;
}

export async function getLatestTranslations(limit: number = 3) {
  return fetchAPI<ApiResponse<Translation[]>>(
    `/translations?populate=*&pagination[limit]=${limit}&sort=createdAt:desc`
  );
}