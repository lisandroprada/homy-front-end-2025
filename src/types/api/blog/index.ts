export interface PublicBlogPost {
  _id: string;
  date: string;
  title: string;
  description: string;
  image_url: string;
  second_image_url?: string;
  quote: string;
  author?: string;
  createdAt: string;
}

export interface PublicBlogListResponse {
  items: PublicBlogPost[];
  meta: {
    totalItems: number;
    itemCount: number;
    pageSize: number;
    totalPages: number;
    currentPage: number;
  };
}
