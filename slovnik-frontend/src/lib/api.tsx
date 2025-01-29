import { Translation, Joke, ApiResponse } from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337';

async function fetchAPI<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_URL}/api${endpoint}`;
  console.log('Fetching:', url); // Debug log

  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const mergedOptions = {
    ...defaultOptions,
    ...options,
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
  return fetchAPI<ApiResponse<Translation[]>>(`/translations?populate=*&pagination[limit]=${limit}`);
}

export async function searchTranslations(
  query: string,
  page: number = 1,
  pageSize: number = 10
) {
  // Create the search parameters
  const searchParams = new URLSearchParams();
  searchParams.append('populate', '*');
  searchParams.append('pagination[page]', page.toString());
  searchParams.append('pagination[pageSize]', pageSize.toString());

  // Add the OR filters for English and Czech searches
  searchParams.append('filters[$or][0][english][$containsi]', query);
  searchParams.append('filters[$or][1][czech][noun][$containsi]', query);
  searchParams.append('filters[$or][2][czech][verb][$containsi]', query);

  const url = `/translations?${searchParams.toString()}`;
  console.log('Search URL:', url); // Debug log
  
  return fetchAPI<ApiResponse<Translation[]>>(url);
}

export async function getTranslation(id: string) {
  const url = `/translations/${id}?populate=*`;
  console.log('Fetching translation with URL:', url); // Debug log
  return fetchAPI<ApiResponse<Translation>>(`/translations/${id}?populate=*`);
}

export async function getRandomJoke() {
  const allJokesCount = await fetchAPI<ApiResponse<Joke[]>>('/jokes?pagination[limit]=1')
    .then(res => res.meta.pagination.total);
    
  if (allJokesCount > 0) {
    const randomStart = Math.floor(Math.random() * allJokesCount);
    return fetchAPI<ApiResponse<Joke[]>>(`/jokes?pagination[start]=${randomStart}&pagination[limit]=1&populate=*`);
  }
  
  return { data: [], meta: { pagination: { page: 1, pageSize: 1, pageCount: 0, total: 0 } } };
}