import { BaseId } from "./base-id.model";
import { IUser } from "./responses/user-response.model";

export interface BaseUser extends BaseId {
  firstName: string;
  lastName: string;
  avatarRef: string;
  birthdate: string;
}
