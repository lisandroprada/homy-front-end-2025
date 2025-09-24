export enum LotStatus {
  Available = 'Available',
  Sold = 'Sold',
  Reserved = 'Reserved',
}

export interface Lot {
  id: string;
  name: string;
  size: number; // in square meters
  price: number; // in USD
  status: LotStatus;
  path: string; // The SVG 'd' attribute
  description: string;
}
