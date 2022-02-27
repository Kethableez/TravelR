import { BaseUser } from "./base-user.model";
import { IUser } from "./responses/user-response.model";

export class User extends BaseUser {
  username: string;
  email: string;
  password: string;
  birthdate: string;

  constructor(user: IUser) {
    super(user);
    this.username = user.username;
    this.email = user.email;
    this.password = user.password;
    this.birthdate = user.birthdate;
  }
}
