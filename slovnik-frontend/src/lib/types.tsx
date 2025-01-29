interface CzechTranslation {
  id: number;
  noun: string;
  verb: string;
}

export interface Translation {
  id: number;
  documentId: string;
  english: string;
  czech: CzechTranslation[];
  etymology?: string;
  reason?: string;
  example?: string;
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

export interface Joke {
  id: number;
  content: string;
  attributes: {
    createdAt: string;
    updatedAt: string;
  }
}

export interface PageParams {
  id: string;
}

export interface PageProps {
  params: PageParams;
}