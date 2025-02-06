interface CzechTranslation {
  id: number;
  noun: string | null;
  verb: string | null;
}

export interface Translation {
  id: number;
  documentId: string;
  english: string;
  czech: CzechTranslation[];
  etymology?: string | null;
  reason?: string | null;
  example?: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface PaginationMeta {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface ApiResponse<T> {
  data: T;
  meta: {
    pagination: PaginationMeta;
  };
}

export interface ApiSingleResponse<T> {
  data: T;
  meta: Record<string, unknown>;
}

export interface Joke {
  id: number;
  content: string;
  attributes: {
    createdAt: string;
    updatedAt: string;
  };
}

export interface PageParams {
  id: string;
}

export interface SearchParams {
  [key: string]: string | string[] | undefined;
}

export type PageProps = {
  params: Promise<PageParams>;
  searchParams?: Promise<SearchParams>;
}