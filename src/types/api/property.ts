// Tipos para la respuesta del endpoint público de propiedades

export interface PropertyImage {
  name: string;
  thumb: string;
}

export interface PropertyImgCover {
  name: string;
  thumbWeb: string;
}

export interface ProvinceOrLocality {
  _id: string;
  name: string;
}

export interface PropertyItem {
  _id: string;
  address: string;
  province: ProvinceOrLocality;
  locality: ProvinceOrLocality;
  lat?: number;
  lng?: number;
  gmaps?: string;
  type: string;
  purpose?: string;
  status: string;
  available: boolean;
  availableAt?: string;
  specs?: any;
  img: PropertyImage[];
  imgCover: PropertyImgCover;
  detailedDescription?: string;
  createdAt: string;
  active: boolean;
  publishForSale: boolean;
  publishForRent: boolean;
  valueForSale?: number;
  valueForRent?: number;
}

export interface PropertyMeta {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}

export interface PropertyListResponse {
  items: PropertyItem[];
  meta: PropertyMeta;
}
