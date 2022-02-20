import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';

import logging from '../config/logging';
import User from '../models/schemas/user';
import IUser from '../models/interfaces/user';
import { head } from 'lodash';
import signJWT from '../functions/sign-jwt';

const ObjectId = mongoose.Types.ObjectId;

const NAMESPACE = 'User Controller';

const createUser = (req: Request, res: Response, next: NextFunction) => {
    const user: IUser = req.body;

    bcryptjs.hash(user.password, 10, (hashError, hash) => {
        if (hashError) {
            return res.status(500).json({
                message: hashError.message,
                error: hashError
            });
        }

        const newUser = new User({
            _id: new ObjectId(),
            username: user.username,
            email: user.email,
            password: hash,
            firstName: user.firstName,
            lastName: user.lastName,
            birthdate: user.birthdate,
            avatarRef: user.avatarRef,
            groups: []
        });

        newUser
            .save()
            .then((user) => {
                return res.status(201).json(user);
            })
            .catch((error) => {
                return res.status(500).json({
                    message: error.message,
                    error: error
                });
            });
    });
};

const editUser = (req: Request, res: Response, next: NextFunction) => {};

const deleteUser = (req: Request, res: Response, next: NextFunction) => {};

const login = (req: Request, res: Response, next: NextFunction) => {
    let { username, password } = req.body;

    User.find({ username })
        .exec()
        .then((users) => {
            if (users.length !== 1) {
                return res.status(400).json({
                    message: 'Invalid username'
                });
            }

            bcryptjs.compare(
                password,
                (head(users) as IUser).password,
                (error, result) => {
                    if (error) {
                        logging.error(NAMESPACE, error.message, error);
                        return res.status(401).json({
                            message: error.message,
                            error
                        });
                    } else if (result) {
                        signJWT(head(users) as IUser, (_error, token) => {
                            if (_error) {
                                return res.status(500).json({
                                    message: 'An error has occured'
                                });
                            } else if (token) {
                                return res.status(200).json({
                                    token
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

const getUser = (req: Request, res: Response, next: NextFunction) => {};

const getUsers = (req: Request, res: Response, next: NextFunction) => {};

const checkUsername = (req: Request, res: Response, next: NextFunction) => {};

const checkEmail = (req: Request, res: Response, next: NextFunction) => {};

export default { createUser, login };
