import express from 'express';
import controller from './../controllers/group';

import extractJWT from '../middleware/exctract-jwt';

const router = express.Router();

router.get('/get/:userId', extractJWT, controller.getGoups);
router.post('/create', extractJWT, controller.createGroup);
router.post('/join', extractJWT, controller.joinToGroup);

export = router;
