import { map } from "rxjs";
import { BaseUser } from "./base-user.model";
import { BaseJourney } from "./journey.model";
import { IGroup } from "./responses/group-response.model";

export class Group {
  id: string;
  name: string;
  coverPhotoRef: string;
  invitationCode: string;
  founder: BaseUser;
  members: BaseUser[];
  journeys: BaseJourney[];

  constructor(group: IGroup) {
    this.id = group._id;
    this.name = group.name;
    this.coverPhotoRef = group.coverPhotoRef;
    this.invitationCode = group.invitationCode;
    this.founder = new BaseUser(group.founder);
    this.members = group.members.map(m => new BaseUser(m));
    this.journeys = group.journeys.map(j => new BaseJourney(j));
  }

  get coverPhoto() {
    return `http://localhost:9000/api/file/download/${this.coverPhotoRef}`;
  }
}
