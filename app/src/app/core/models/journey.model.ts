import { BaseId } from "./base-id.model";
import { IJourney } from "./responses/journey-response.model";

export interface BaseJourney extends BaseId{
  name: string;
  description?: string;
  coverPhotoRef: string;
  startDate: Date;
  endDate: Date;
}
