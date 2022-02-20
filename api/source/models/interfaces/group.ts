import { Document } from 'mongoose';
import { IUserData } from './user-data';

export default interface IGroup extends Document {
    name: string;
    coverPhotoRef: string;
    founder: IUserData;
    members: IUserData[];
    invitationCode: string;
    journeys: string[];
}
