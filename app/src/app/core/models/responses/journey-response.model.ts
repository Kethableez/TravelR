import { BaseId } from "../base-id.model";

export interface IJourney extends BaseId {
  name: string;
  description?: string;
  coverPhotoRef: string;
  startDate: Date;
  endDate: Date;
  attractions: any[];
}
