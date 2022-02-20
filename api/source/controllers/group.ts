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
                    founder: {
                        _id: user._id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        avatarRef: user.avatarRef
                    },
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

const editGroup = (req: Request, res: Response, next: NextFunction) => {};

const deleteGroup = (req: Request, res: Response, next: NextFunction) => {};

const getGroup = (req: Request, res: Response, next: NextFunction) => {};

const getGoups = (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId;

    Group.find({
        $or: [{ 'founder._id': userId }, { members: { $elemMatch: { _id: userId } } }]
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
            memberId !== group.founder._id &&
            !includes(group.members, memberId)
        ) {
            group.members.push({
                _id: newMember._id,
                firstName: newMember.firstName,
                lastName: newMember.lastName,
                avatarRef: newMember.avatarRef
            });

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

const addToGroup = (req: Request, res: Response, next: NextFunction) => {};

const removeFromGroup = (req: Request, res: Response, next: NextFunction) => {};

export default { createGroup, joinToGroup, getGoups };
