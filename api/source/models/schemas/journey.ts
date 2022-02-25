import mongoose, { Schema } from 'mongoose';
import IJourney from '../interfaces/journey';

const JourneySchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    coverPhotoRef: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    attractions: { type: [Object] }
});

export default mongoose.model<IJourney>('Journey', JourneySchema);
