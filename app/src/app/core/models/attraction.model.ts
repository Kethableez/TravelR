export interface IAttraction {
  name: string;
  description?: string;
  address?: {
      zipCode?: string;
      city?: string;
      street?: string;
      number?: string;
  };
  additionalInfo?: any[];
  coverPhotoRef: string;
}
