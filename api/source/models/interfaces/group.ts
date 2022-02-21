import { Document } from 'mongoose';
import { IUserData } from './user-data';

// TODO: Przebudowac UserData na ID!!!
export default interface IGroup extends Document {
    name: string;
    coverPhotoRef: string;
    founder: string;
    members: any[];
    invitationCode: string;
    journeys: string[];
}
