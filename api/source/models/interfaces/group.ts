import mongoose from 'mongoose';
import { Document } from 'mongoose';

// TODO: Przebudowac UserData na ID!!!
export default interface IGroup extends Document {
    name: string;
    coverPhotoRef: string;
    founder: any;
    members: any[];
    invitationCode: string;
    journeys: any[];
}
