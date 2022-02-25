import mongoose, { Schema } from 'mongoose';
import IAttraction from '../interfaces/attraction';

const AttractionSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    address: {
        zipCode: { type: String },
        city: { type: String },
        street: { type: String },
        number: { type: String }
    },
    additionalInfo: { type: [Object] },
    coverPhotoRef: { type: String, required: true }
});

export default mongoose.model<IAttraction>('Attraction', AttractionSchema);
