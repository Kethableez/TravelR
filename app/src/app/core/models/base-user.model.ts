import { IUser } from "./responses/user-response.model";

export class BaseUser {
  id: string;
  firstName: string;
  lastName: string;
  avatarRef: string;

  constructor(user: IUser) {
    this.id = user._id;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.avatarRef = user.avatarRef;
  }

  getParsedAvatar(): string {
    return `http://localhost:9000/api/file/download/${this.avatarRef}`;
  }
}
