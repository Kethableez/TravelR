import mongoose from 'mongoose';

const ObjectId = mongoose.Types.ObjectId;

const journeyEditQuery = (journeyId: string, userId: string) => {
    return {
        $and: [
            {
                journeys: new ObjectId(journeyId)
            },
            {
                $or: [
                    {
                        founder: new ObjectId(userId)
                    },
                    {
                        members: new ObjectId(userId)
                    }
                ]
            }
        ]
    };
};

const groupEditQuery = (groupId: string, userId: string) => {
    return {
        $and: [
            {
                _id: new ObjectId(groupId)
            },
            {
                founder: new ObjectId(userId)
            }
        ]
    };
};

const groupDataQuery = (groupId: string, userId: string) => {
    return {
        $and: [
            {
                _id: new ObjectId(groupId)
            },
            {
                $or: [
                    {
                        founder: new ObjectId(userId)
                    },
                    {
                        members: new ObjectId(userId)
                    }
                ]
            }
        ]
    };
};
export default {
    groupDataQuery,
    groupEditQuery,
    journeyEditQuery
};
