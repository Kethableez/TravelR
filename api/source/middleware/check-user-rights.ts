import { NextFunction, Request, Response } from 'express';
import { includes, isEmpty, isNil } from 'lodash';
import mongoose from 'mongoose';
import Group from '../models/schemas/group';

const ObjectId = mongoose.Types.ObjectId;

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

const checkJourneyRights = async (req: Request, res: Response, next: NextFunction) => {
    const userId = res.locals.jwt.id;
    const path = req.params.journeyId;
    const body = req.body.journeyId;

    const journeyId = !isNil(path) ? path : body;

    const query = {
        '$and': [
          {
            'journeys': new ObjectId(journeyId)
          }, {
            '$or': [
              {
                'founder': new ObjectId(userId)
              }, {
                'members': new ObjectId(userId)
              }
            ]
          }
        ]
      }

    Group.findOne(query).exec().then(result => {
        if (isEmpty(result)) {
            return res.status(400).json({
                message: 'You have no rights to perform this action'
            });
        }
        else {
            next();
        }
    }).catch(error => {
        return res.status(500).json({
            message: error.message,
            error
        })
    })
}

export default {
    checkGroupRights,
    checkJourneyRights   
};
