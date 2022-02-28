import { map } from "rxjs";
import { BaseId } from "./base-id.model";
import { BaseUser } from "./base-user.model";
import { BaseJourney } from "./journey.model";
import { IGroup } from "./responses/group-response.model";

export interface Group extends BaseId {
  name: string;
  coverPhotoRef: string;
  invitationCode: string;
  founder: BaseUser;
  members: BaseUser[];
  journeys: BaseJourney[];
}
