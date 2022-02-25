import express from 'express';
import controller from './../controllers/attraction';

import extractJWT from '../middleware/exctract-jwt';

const router = express.Router();

router.get('/all', controller.getAttractions);
router.get('/get/:attractionId', controller.getAttraction);

router.post('/create', controller.createAttraction);
router.post('/edit/:attractionId', controller.editAttraction);
router.post('/delete/:attractionId', controller.deleteAttraction);

export = router;
