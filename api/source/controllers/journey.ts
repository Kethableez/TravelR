import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import IJourney from '../models/interfaces/journey';
import Journey from '../models/schemas/journey';
import Group from '../models/schemas/group';
import { flatten, isEmpty } from 'lodash';

const ObjectId = mongoose.Types.ObjectId;

const NAMESPACE = 'Journey Controller';

const basePipeline: any[] = [
    {
        $lookup: {
            from: 'attractions',
            localField: 'attractions.attractionRef',
            foreignField: '_id',
            as: 'attractions'
        }
    }
];

const createJourney = async (req: Request, res: Response, next: NextFunction) => {
    const { groupId, data } = req.body;
    const prefix = 'journey';
    const group = await Group.findById(groupId);

    if (group && data) {
        const id = new ObjectId();

        const newJourney = new Journey({
            _id: id,
            name: data.name,
            description: data.description,
            coverPhotoRef: [prefix, id].join('/'),
            startDate: data.startDate,
            endDate: data.endDate,
            attractions: data.attractions.map((a: string) => {
                return { attractionRef: new ObjectId(a) };
            })
        });

        newJourney
            .save()
            .then((journey) => {
                group.journeys.push(id);
                group
                    .save()
                    .then(() => {
                        return res.status(200).json({
                            message: 'Created',
                            objectId: journey._id
                        });
                    })
                    .catch((error) => {
                        return res.status(500).json({
                            message: error.message,
                            error
                        });
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
            message: 'Missing data in request'
        });
    }
};

const editJourney = (req: Request, res: Response, next: NextFunction) => {
    const journeyId = req.params.journeyId;
    const data = req.body;

    if (!isEmpty(data.attractions)) {
        data.attractions.forEach((attraction: any) => {
            attraction.attractionRef = new ObjectId(attraction.attractionRef);
        });
    }

    Journey.findByIdAndUpdate(journeyId, data)
        .exec()
        .then(() => {
            return res.status(200).json({
                message: 'Updated'
            });
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });
};

const deleteJourney = async (req: Request, res: Response, next: NextFunction) => {
    const journeyId = req.params.journeyId;

    const group = await Group.findOne({ journeys: new ObjectId(journeyId) });
    if (group) {
        group.journeys = group.journeys.filter((j) => j.toString() !== journeyId);
        group.save();
    }

    Journey.findByIdAndDelete(journeyId)
        .exec()
        .then(() => {
            return res.status(200).json({
                message: 'Deleted'
            });
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });
};

const getJourney = (req: Request, res: Response, next: NextFunction) => {
    const journeyId = req.params.journeyId;

    const byId: any = {
        $match: { _id: new ObjectId(journeyId) }
    };

    const pipeline: any[] = flatten([byId, basePipeline]);

    Journey.aggregate(pipeline)
        .exec()
        .then((journey) => {
            return res.status(200).json(journey);
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });
};

const getJourneys = (req: Request, res: Response, next: NextFunction) => {
    Journey.aggregate(basePipeline)
        .exec()
        .then((journeys) => {
            return res.status(200).json(journeys);
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });
};

export default {
    createJourney,
    editJourney,
    deleteJourney,
    getJourney,
    getJourneys
};
