import { Document } from 'mongoose';

export default interface IAttraction extends Document {
    name: string;
    description?: string;
    address?: {
        zipCode?: string;
        city?: string;
        street?: string;
        number?: string;
    };
    additionalInfo?: any[];
    coverPhotoRef: string;
}
