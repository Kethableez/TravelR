const groupPipeline: any[] = [
    {
        $lookup: {
            from: 'users',
            localField: 'founder',
            foreignField: '_id',
            as: 'founderMap'
        }
    },
    {
        $set: {
            map: {
                $first: '$founderMap'
            }
        }
    },
    {
        $set: {
            'founder._id': '$map._id',
            'founder.username': '$map.username',
            'founder.firstName': '$map.firstName',
            'founder.lastName': '$map.lastName',
            'founder.avatarRef': '$map.avatarRef'
        }
    },
    {
        $unset: ['map', 'founderMap']
    },
    {
        $lookup: {
            from: 'users',
            localField: 'members',
            foreignField: '_id',
            as: 'members'
        }
    },
    {
        $lookup: {
            from: 'journeys',
            localField: 'journeys',
            foreignField: '_id',
            as: 'journeys'
        }
    },
    {
        $project: {
            _id: 1,
            name: 1,
            coverPhotoRef: 1,
            founder: 1,
            invitationCode: 1,
            'members._id': 1,
            'members.username': 1,
            'members.firstName': 1,
            'members.lastName': 1,
            'members.avatarRef': 1,
            'journeys.name': 1,
            'journeys.description': 1,
            'journeys.coverPhotoRef': 1,
            'journeys.startDate': 1,
            'journeys.endDate': 1
        }
    }
];

export default {
    groupPipeline
};
