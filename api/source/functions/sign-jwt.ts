import jwt from 'jsonwebtoken';
import config from '../config/config';
import logging from '../config/logging';
import IUser from '../models/interfaces/user';

const NAMESPACE = 'Auth';

const signJWT = (
    user: IUser,
    callback: (error: Error | null | unknown, token: string | null) => void
): void => {
    const timeSinceEpoch = new Date().getTime();
    const expirationTime =
        timeSinceEpoch + Number(config.server.token.expireTime) * 100000;
    const expirationTimeInSec = Math.floor(expirationTime / 1000);

    logging.info(NAMESPACE, `Attempt to sign token for ${user.username}`);
    try {
        jwt.sign(
            {
                id: user._id
            },
            config.server.token.secret,
            {
                issuer: config.server.token.issuer,
                algorithm: 'HS256',
                expiresIn: expirationTimeInSec
            },
            (error, token) => {
                if (error) {
                    callback(error, null);
                } else if (token) {
                    callback(null, token);
                }
            }
        );
    } catch (error) {
        logging.error(NAMESPACE, 'Error', error);
        callback(error, null);
    }
};

export default signJWT;
