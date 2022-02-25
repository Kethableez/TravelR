import { NextFunction, Request, Response } from 'express';
import { isNil } from 'lodash';
import Group from '../models/schemas/group';

const checkGroupRights = async (req: Request, res: Response, next: NextFunction) => {
    const userId = res.locals.jwt.id;
    const path = req.params.groupId;
    const body = req.body.groupId;

    const groupId = !isNil(path) ? path : body;

    const group = await Group.findById(groupId);

    if (group) {
        if (group.founder.toString() === userId) {
            next();
        } else {
            return res.status(400).json({
                message: 'You have no rights to perform this action'
            });
        }
    } else {
        return res.status(400).json({
            message: 'Group not found'
        });
    }
};

export default checkGroupRights;
