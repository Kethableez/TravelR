import express from 'express';
import controller from './../controllers/user';
import validateRequest from '../middleware/request-validator';

import validateJWT from '../middleware/validate-jwt';

const router = express.Router();

router.get('/get/:userId', validateJWT, validateRequest.userData, controller.getUser);
router.get('/all', validateJWT, controller.getUsers);
router.get('/check/:selector/:value', controller.check);

router.post('/login', controller.login);
router.post('/register', controller.createUser);
router.post('/edit/:userId', validateRequest.userData, validateJWT, controller.editUser);
router.post(
    '/delete/:userId',
    validateJWT,
    validateRequest.userData,
    controller.deleteUser
);

// TOOD: Edit, delete => check if user had priviliges
export = router;
