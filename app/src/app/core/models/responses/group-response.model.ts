import { BaseId } from "../base-id.model";

export interface IGroup extends BaseId {
  name: string;
  coverPhotoRef: string;
  founder: any;
  members: any[];
  invitationCode: string;
  journeys: any[];
}

export interface GroupResponse {
  object: IGroup;
  message: string;
}
