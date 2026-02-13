export interface CreateFormDto {
  name: string;
  lastName?: string;
  email: string;
  phone: string;
  message: string;
  origin?: string;
  propertyId?: string;
}
