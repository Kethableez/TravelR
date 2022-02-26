import express from 'express';
import controller from './../controllers/group';

import validateJWT from '../middleware/validate-jwt';
import validateRequest from '../middleware/request-validator';

const router = express.Router();

router.get('/all', validateJWT, controller.getGroups);
router.get('/get/:groupId', validateJWT, validateRequest.groupData, controller.getGroup);
router.get(
    '/get-user-groups/:userId',
    validateJWT,
    validateRequest.userData,
    controller.getGroupsByUserId
);

router.post('/create', validateJWT, controller.createGroup);
router.post(
    '/edit/:groupId',
    validateJWT,
    validateRequest.groupEdit,
    controller.editGroup
);
router.post(
    '/delete/:groupId',
    validateJWT,
    validateRequest.groupEdit,
    controller.deleteGroup
);
router.post('/join', validateJWT, controller.joinToGroup);
router.post('/add', validateJWT, validateRequest.groupEdit, controller.addToGroup);
router.post(
    '/remove',
    validateJWT,
    validateRequest.groupEdit,
    controller.removeFromGroup
);

// TOOD: Edit, delete, add => check if user had priviliges
export = router;
