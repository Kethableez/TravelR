import { BaseId } from "../base-id.model";

export interface IUser extends BaseId {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  birthdate: string;
  avatarRef: string;
}
