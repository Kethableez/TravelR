import express from 'express';
import controller from './../controllers/user';

import extractJWT from '../middleware/exctract-jwt';

const router = express.Router();

router.get('/get/:userId', extractJWT, controller.getUser);
router.get('/all', extractJWT, controller.getUsers);
router.get('/check/:selector/:value', controller.check);

router.post('/login', controller.login);
router.post('/register', controller.createUser);
router.post('/edit/:userId', extractJWT, controller.editUser);
router.post('/delete/:userId', extractJWT, controller.deleteUser);

// TOOD: Edit, delete => check if user had priviliges
export = router;
