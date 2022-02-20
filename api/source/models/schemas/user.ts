import mongoose, { Schema } from 'mongoose';
import IUser from '../interfaces/user';

const ObjectId = mongoose.Types.ObjectId;

const UserSchema: Schema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    birthdate: { type: Date, required: true },
    avatarRef: { type: String, required: true },
    groups: { type: [String] }
});

UserSchema.pre('save', function (next) {
    var self = this;
    mongoose
        .model<IUser>('User')
        .find({ $or: [{ username: self.username }, { email: self.email }] })
        .exec()
        .then((docs) => {
            if (!docs.length) next();
            else next(new Error('User exists'));
        });
});

export default mongoose.model<IUser>('User', UserSchema);
