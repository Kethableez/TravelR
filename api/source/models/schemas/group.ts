import mongoose, { Schema } from 'mongoose';
import IGroup from '../interfaces/group';

const ObjectId = mongoose.Types.ObjectId;

const GroupSchema: Schema = new Schema({
    name: { type: String, required: true },
    coverPhotoRef: { type: String, required: true },
    founder: {
        _id: { type: String, required: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        avatarRef: { type: String, required: true }
    },
    members: [
        {
            _id: { type: String, required: true },
            firstName: { type: String, required: true },
            lastName: { type: String, required: true },
            avatarRef: { type: String, required: true }
        }
    ],
    invitationCode: { type: String, required: true },
    journeys: { type: [String] }
});

export default mongoose.model<IGroup>('Group', GroupSchema);
