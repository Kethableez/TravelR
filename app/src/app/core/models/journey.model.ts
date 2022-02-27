import { IJourney } from "./responses/journey-response.model";

export class BaseJourney {
  id: string;
  name: string;
  description?: string;
  coverPhotoRef: string;
  startDate: Date;
  endDate: Date;

  constructor(journey: IJourney) {
    this.id = journey._id;
    this.name = journey.name;
    this.description = journey.description;
    this.coverPhotoRef = journey.coverPhotoRef;
    this.startDate = journey.startDate;
    this.endDate = journey.endDate;
  }
}
