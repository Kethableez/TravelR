import { Document } from 'mongoose';

export default interface IJourney extends Document {
    name: string;
    description?: string;
    coverPhotoRef: string;
    startDate: Date;
    endDate: Date;
    attractions: any[];
}
