import express from 'express';
import controller from './../controllers/journey';

import extractJWT from '../middleware/exctract-jwt';

const router = express.Router();

router.get('/all', controller.getJourneys);
router.get('/get/:journeyId', controller.getJourney);

router.post('/create', controller.createJourney);
router.post('/edit/:journeyId', controller.editJourney);
router.post('/delete/:journeyId', controller.deleteJourney);

export = router;
