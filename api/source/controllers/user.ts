import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';

import logging from '../config/logging';
import User from '../models/schemas/user';
import IUser from '../models/interfaces/user';
import { head, isEmpty } from 'lodash';
import signJWT from '../functions/sign-jwt';

const ObjectId = mongoose.Types.ObjectId;

const NAMESPACE = 'User Controller';

const getQuery = (selector: string, value: string) => {
    const queryList = [
        {
            email: value
        },
        {
            username: value
        }
    ];
    const index = selector === 'email' ? 0 : 1;

    return queryList[index];
};

const createUser = (req: Request, res: Response, next: NextFunction) => {
    const user: IUser = req.body;

    bcryptjs.hash(user.password, 10, (hashError, hash) => {
        if (hashError) {
            return res.status(500).json({
                message: hashError.message,
                error: hashError
            });
        }

        const id = new ObjectId();

        const newUser = new User({
            _id: id,
            username: user.username,
            email: user.email,
            password: hash,
            firstName: user.firstName,
            lastName: user.lastName,
            birthdate: user.birthdate,
            avatarRef: user.avatarRef
        });

        newUser
            .save()
            .then((user) => {
                return res.status(201).json({
                    message: 'Created',
                    objectId: user._id
                });
            })
            .catch((error) => {
                return res.status(500).json({
                    message: error.message,
                    error: error
                });
            });
    });
};

const editUser = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId;
    const data = req.body;

    User.findByIdAndUpdate(userId, data)
        .exec()
        .then((user) => {
            return res.status(200).json({
                message: 'Data changed',
                object: user
            });
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });
    // id!!!
    // firstName: user.firstName,
    // lastName: user.lastName,
    // birthdate: user.birthdate,
    // avatarRef: user.avatarRef,
};

const deleteUser = (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId;
    User.findByIdAndDelete(userId)
        .exec()
        .then(() => {
            return res.status(200).json({
                message: 'Account removed'
            });
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });
};

const login = (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;

    User.find({ username })
        .exec()
        .then((users) => {
            if (users.length !== 1) {
                return res.status(400).json({
                    message: 'Invalid username'
                });
            }

            const user = head(users);

            bcryptjs.compare(
                password,
                (user as IUser).password,
                (error, result) => {
                    if (error) {
                        logging.error(NAMESPACE, error.message, error);
                        return res.status(401).json({
                            message: error.message,
                            error
                        });
                    } else if (result) {
                        signJWT(user as IUser, (_error, token) => {
                            if (_error) {
                                return res.status(500).json({
                                    message: 'An error has occured'
                                });
                            } else if (token) {
                                return res.status(200).json({
                                    id: user?._id,
                                    userData: user,
                                    token: token
                                });
                            }
                        });
                    } else {
                        return res.status(401).json({
                            message: 'Invalid username or password'
                        });
                    }
                }
            );
        })
        .catch((error) => {
            logging.error(NAMESPACE, error.message, error);
            return res.status(500).json(error.message);
        });
};

const getUser = (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId;

    User.findById(userId)
        .exec()
        .then((user) => {
            return res.status(200).json(user);
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });
};

const getUsers = (req: Request, res: Response, next: NextFunction) => {
    User.find()
        .exec()
        .then((users) => {
            return res.status(200).json(users);
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });
};

const check = (req: Request, res: Response, next: NextFunction) => {
    const selector = req.params.selector;
    const value = req.params.value;
    const query = getQuery(selector, value);

    User.find(query)
        .exec()
        .then((result) => {
            if (isEmpty(result)) {
                return res.status(200).json({
                    available: true
                });
            } else {
                return res.status(200).json({
                    available: false
                });
            }
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });
};

export default { createUser, editUser, deleteUser, login, getUser, getUsers, check };
