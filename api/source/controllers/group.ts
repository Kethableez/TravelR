import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';

import pipeline from '../functions/pipeline';

import User from '../models/schemas/user';
import Group from '../models/schemas/group';
import { flatten, includes } from 'lodash';

const ObjectId = mongoose.Types.ObjectId;

const NAMESPACE = 'Group Controller';

const basePipeline = pipeline.groupPipeline;

const createGroup = async (req: Request, res: Response, next: NextFunction) => {
    const prefix = 'group';
    const group = req.body;
    const founderId = res.locals.jwt.id;
    const id = new ObjectId();

    User.findById(founderId)
        .exec()
        .then((user) => {
            if (user) {
                const newGroup = new Group({
                    _id: id,
                    name: group.name,
                    coverPhotoRef: [prefix, id].join('/'),
                    founder: new ObjectId(user._id),
                    members: [],
                    invitationCode: '123ABC',
                    journeys: []
                });
                newGroup
                    .save()
                    .then((group) => {
                        return res.status(200).json({
                            message: 'Success',
                            objectId: group._id
                        });
                    })
                    .catch((error) => {
                        return res.status(500).json({
                            message: error.message,
                            error
                        });
                    });
            } else {
                return res.status(400).json({
                    message: 'User not found'
                });
            }
        });
};

const editGroup = async (req: Request, res: Response, next: NextFunction) => {
    const groupId = req.params.groupId;
    const data = req.body;

    Group.findByIdAndUpdate(groupId, data)
        .exec()
        .then(() => {
            return res.status(200).json({ message: 'Data changed' });
        })
        .catch((error) => {
            return res.status(500).json({ message: error.message, error });
        });
};

const deleteGroup = (req: Request, res: Response, next: NextFunction) => {
    const groupId = req.params.groupId;

    Group.findByIdAndDelete(groupId)
        .exec()
        .then(() => {
            return res.status(200).json({
                message: 'Group removed'
            });
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });
};

const getGroup = (req: Request, res: Response, next: NextFunction) => {
    const groupId = req.params.groupId;
    const byId: any = {
        $match: { _id: new ObjectId(groupId) }
    };

    const pipeline: any[] = flatten([byId, basePipeline]);

    Group.aggregate(pipeline)
        .exec()
        .then((group) => {
            return res.status(200).json(group);
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });
};

const getGroups = (req: Request, res: Response, next: NextFunction) => {
    Group.aggregate(basePipeline)
        .exec()
        .then((group) => {
            return res.status(200).json(group);
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });
};

const getGroupsByUserId = (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId;

    const byUserId: any = {
        $match: {
            $or: [
                {
                    founder: new ObjectId(userId)
                },
                {
                    members: new ObjectId(userId)
                }
            ]
        }
    };

    const pipeline = flatten([byUserId, basePipeline]);

    Group.aggregate(pipeline)
        .exec()
        .then((group) => {
            return res.status(200).json(group);
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });
};

const joinToGroup = async (req: Request, res: Response, next: NextFunction) => {
    const { groupId, memberId, invitationCode } = req.body;

    const group = await Group.findById(groupId);
    const newMember = await User.findById(memberId);

    if (group && newMember) {
        const members = group.members.map((mem) => mem.toString());

        if (
            group.invitationCode === invitationCode &&
            memberId !== group.founder.toString() &&
            !includes(members, memberId)
        ) {
            group.members.push(new ObjectId(newMember._id));

            group
                .save()
                .then((group) => {
                    return res.status(200).json({
                        message: 'Joined',
                        object: group
                    });
                })
                .catch((error) => {
                    return res.status(500).json({
                        message: error.message,
                        error
                    });
                });
        } else {
            return res.status(400).json({
                message: 'Incorrect invitation code'
            });
        }
    } else {
        return res.status(404).json({ message: 'Not found' });
    }
};

const addToGroup = async (req: Request, res: Response, next: NextFunction) => {
    const { memberEmail, groupId } = req.body;

    const newMember = await User.findOne({ email: memberEmail });
    const group = await Group.findById(groupId);

    if (newMember && group) {
        const memberId = newMember._id.toString();

        const members = group.members.map((m) => m.toString());

        if (memberId !== group.founder.toString() && !includes(members, memberId)) {
            group.members.push(new ObjectId(memberId));

            group
                .save()
                .then((group) => {
                    return res.status(200).json({
                        message: 'Joined',
                        object: group
                    });
                })
                .catch((error) => {
                    return res.status(500).json({
                        message: error.message,
                        error
                    });
                });
        } else {
            return res.status(400).json({
                message: 'Already a member!'
            });
        }
    } else {
        return res.status(404).json({ message: 'Not found' });
    }
};

const removeFromGroup = async (req: Request, res: Response, next: NextFunction) => {
    const { memberId, groupId } = req.body;
    const group = await Group.findById(groupId);

    if (group) {
        group.members = group.members.filter((m) => m.toString() !== memberId);

        group
            .save()
            .then((group) => {
                return res.status(200).json({
                    message: 'Removed',
                    object: group
                });
            })
            .catch((error) => {
                return res.status(500).json({
                    message: error.message,
                    error
                });
            });
    } else {
        return res.status(404).json({ message: 'Not found' });
    }
};

export default {
    createGroup,
    editGroup,
    deleteGroup,
    getGroup,
    getGroups,
    getGroupsByUserId,
    joinToGroup,
    addToGroup,
    removeFromGroup
};
