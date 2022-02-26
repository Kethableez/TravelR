import { NextFunction, Request, Response } from 'express';
import { isEmpty, isNil } from 'lodash';
import baseQuery from '../functions/base-query';
import Group from '../models/schemas/group';

const groupEdit = async (req: Request, res: Response, next: NextFunction) => {
    const userId = res.locals.jwt.id;
    const path = req.params.groupId;
    const body = req.body.groupId;

    const groupId = !isNil(path) ? path : body;

    const query = baseQuery.groupEditQuery(groupId, userId);

    Group.findOne(query)
        .exec()
        .then((result) => {
            if (isEmpty(result)) {
                return res.status(400).json({
                    message: 'You have no rights to perform this action'
                });
            } else {
                next();
            }
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });
};

const journeyEdit = (req: Request, res: Response, next: NextFunction) => {
    const userId = res.locals.jwt.id;
    const path = req.params.journeyId;
    const body = req.body.journeyId;

    const journeyId = !isNil(path) ? path : body;

    const query = baseQuery.journeyEditQuery(journeyId, userId);

    Group.findOne(query)
        .exec()
        .then((result) => {
            if (isEmpty(result)) {
                return res.status(400).json({
                    message: 'You have no rights to perform this action'
                });
            } else {
                next();
            }
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });
};

const userData = (req: Request, res: Response, next: NextFunction) => {
    const userId = res.locals.jwt.id;
    const pathId = req.params.userId;

    if (userId === pathId) {
        next();
    } else {
        return res.status(400).json({
            message: 'You have no rights to perform this action'
        });
    }
};

const groupData = (req: Request, res: Response, next: NextFunction) => {
    const userId = res.locals.jwt.id;
    const groupId = req.params.groupId;

    const query = baseQuery.groupDataQuery(groupId, userId);

    Group.findOne(query)
        .exec()
        .then((result) => {
            if (isEmpty(result)) {
                return res.status(400).json({
                    message: 'You have no rights to perform this action'
                });
            } else {
                next();
            }
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });
};

const journeyData = (req: Request, res: Response, next: NextFunction) => {
    const userId = res.locals.jwt.id;
    const journeyId = req.params.journeyId;

    const query = baseQuery.journeyEditQuery(journeyId, userId);

    Group.findOne(query)
        .exec()
        .then((result) => {
            if (isEmpty(result)) {
                return res.status(400).json({
                    message: 'You have no rights to perform this action'
                });
            } else {
                next();
            }
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });
};

export default {
    groupEdit,
    journeyEdit,
    userData,
    groupData,
    journeyData
};
