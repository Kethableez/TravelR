import { BaseId } from "./base-id.model";

export interface Attraction extends BaseId {
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
