import express from 'express';
import controller from './../controllers/group';

import extractJWT from '../middleware/exctract-jwt';

const router = express.Router();

router.get('/all', extractJWT, controller.getGroups);
router.get('/get/:groupId', extractJWT, controller.getGroup);
router.get('/get-user-groups/:userId', extractJWT, controller.getGroupsByUserId);

router.post('/create', extractJWT, controller.createGroup);
router.post('/join', extractJWT, controller.joinToGroup);
router.post('/add', extractJWT, controller.addToGroup);
router.post('/remove', extractJWT, controller.removeFromGroup);

// TOOD: Edit, delete, add => check if user had priviliges
export = router;
