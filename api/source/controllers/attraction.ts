import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import IAttraction from '../models/interfaces/attraction';
import Attraction from '../models/schemas/attraction';

const ObjectId = mongoose.Types.ObjectId;

const NAMESPACE = 'Attraction Controller';

const createAttraction = (req: Request, res: Response, next: NextFunction) => {
    const attraction: IAttraction = req.body;
    const prefix = 'attraction';
    const id = new ObjectId();

    const newAttraction = new Attraction({
        _id: id,
        name: attraction.name,
        description: attraction.description,
        address: attraction.address,
        additionalInfo: attraction.additionalInfo,
        coverPhotoRef: [prefix, id].join('/')
    });

    newAttraction
        .save()
        .then((attraction) => {
            return res.status(200).json({
                message: 'Success',
                objectId: attraction._id
            });
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });
};

const editAttraction = (req: Request, res: Response, next: NextFunction) => {
    const attractionId = req.params.attractionId;
    const data = req.body;

    Attraction.findByIdAndUpdate(attractionId, data)
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

const deleteAttraction = (req: Request, res: Response, next: NextFunction) => {
    const attractionId = req.params.attractionId;

    Attraction.findByIdAndDelete(attractionId)
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

const getAttractions = (req: Request, res: Response, next: NextFunction) => {
    Attraction.find()
        .exec()
        .then((attractions) => {
            return res.status(200).json(attractions);
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });
};

const getAttraction = (req: Request, res: Response, next: NextFunction) => {
    const attractionId = req.params.attractionId;

    Attraction.findById(attractionId)
        .exec()
        .then((attraction) => {
            return res.status(200).json(attraction);
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });
};

export default {
    createAttraction,
    editAttraction,
    deleteAttraction,
    getAttraction,
    getAttractions
};
