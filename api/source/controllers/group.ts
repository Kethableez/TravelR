import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';

import User from '../models/schemas/user';
import Group from '../models/schemas/group';
import { includes } from 'lodash';

const ObjectId = mongoose.Types.ObjectId;

const NAMESPACE = 'Group Controller';

const createGroup = async (req: Request, res: Response, next: NextFunction) => {
    const group = req.body;

    User.findById(group.founder)
        .exec()
        .then((user) => {
            if (user) {
                const newGroup = new Group({
                    name: group.name,
                    coverPhotoRef: group.coverPhotoRef,
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
                    message: 'User not found'
                });
            }
        });
};

const editGroup = (req: Request, res: Response, next: NextFunction) => {
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

    Group.findById(groupId)
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
    Group.find()
        .exec()
        .then((groups) => {
            return res.status(200).json(groups);
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

    Group.find({
        $or: [
            {
                founder: new ObjectId(userId)
            },
            {
                members: new ObjectId(userId)
            }
        ]
    })
        .exec()
        .then((groups) => {
            return res.status(200).json(groups);
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
        if (
            group.invitationCode === invitationCode &&
            memberId !== group.founder.toString() &&
            !includes(group.members, new ObjectId(memberId))
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

    // TODO: Check if user already in!!!
    if (newMember && group) {
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
    getGroup,
    getGroups,
    getGroupsByUserId,
    joinToGroup,
    addToGroup,
    removeFromGroup
};
