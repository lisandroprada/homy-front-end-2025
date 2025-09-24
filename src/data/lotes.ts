import {Lot} from '@/types/lote';
import {LotStatus} from '@/types/lote';

export const SATELLITE_IMAGE_URL = 'src/assets/images/lot-map/satellit.jpg';

export const LOT_DATA: Lot[] = [
  {
    id: 'L001',
    name: 'Vista Verde Estate',
    size: 2500,
    price: 150000,
    status: LotStatus.Available,
    path: 'M255,214L237,258L316,285L327,242Z',
    description: 'A prime corner lot with lush greenery and easy road access. Perfect for a family home with a spacious garden.',
  },
  {
    id: 'L002',
    name: 'Serenity Ranch',
    size: 5200,
    price: 320000,
    status: LotStatus.Sold,
    path: 'M461,422L465,491L567,480L559,409Z',
    description: 'A sprawling property that has already been sold. Features a modern house with a large swimming pool and patio area.',
  },
  {
    id: 'L003',
    name: "The Pioneer's Plot",
    size: 12000,
    price: 450000,
    status: LotStatus.Available,
    path: 'M620,296L626,389L813,363L803,269Z',
    description: 'A vast expanse of undeveloped land, ideal for a large-scale project or a private, secluded ranch.',
  },
  {
    id: 'L004',
    name: 'Oasis Corner',
    size: 3100,
    price: 210000,
    status: LotStatus.Reserved,
    path: 'M870,394L877,472L968,460L958,382Z',
    description: 'A beautiful lot with existing mature trees and a pool. Currently reserved, pending final sale.',
  },
  {
    id: 'L005',
    name: 'The Northern Ridge',
    size: 8500,
    price: 280000,
    status: LotStatus.Available,
    path: 'M271,28L262,118L448,103L435,16Z',
    description: 'Elevated plot offering stunning panoramic views of the surrounding landscape. A unique opportunity for a distinctive home.',
  },
  {
    id: 'L006',
    name: 'Suburban Gem',
    size: 1800,
    price: 95000,
    status: LotStatus.Sold,
    path: 'M997,557L1000,604L1082,593L1076,547Z',
    description: 'A cozy, rectangular lot in a densely populated neighborhood. Perfect for a starter home, this lot has been sold.',
  },
  {
    id: 'L007',
    name: 'Riverside Meadow',
    size: 4200,
    price: 185000,
    status: LotStatus.Available,
    path: 'M36,375L21,496L143,522L159,394Z',
    description: 'A beautiful plot with what appears to be a natural water boundary, offering a serene and picturesque setting.',
  },
  {
    id: 'L008',
    name: 'The Grand Central',
    size: 6300,
    price: 410000,
    status: LotStatus.Reserved,
    path: 'M480,183L487,270L614,250L602,162Z',
    description: 'A large, centrally located property with a pre-existing structure. Perfect for redevelopment. Currently reserved.',
  },
];
