import { BaseUser } from './base-user.model';
import { IUser } from './responses/user-response.model';

export interface User extends BaseUser {
  username: string;
  email: string;
  password: string;
}
