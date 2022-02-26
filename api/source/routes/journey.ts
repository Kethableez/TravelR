import express from 'express';
import controller from './../controllers/journey';

import extractJWT from '../middleware/exctract-jwt';
import checkUserRights from '../middleware/check-user-rights';


const router = express.Router();

router.get('/all', controller.getJourneys);
router.get('/get/:journeyId', controller.getJourney);

router.post('/create', controller.createJourney);
router.post('/edit/:journeyId', extractJWT, checkUserRights.checkJourneyRights, controller.editJourney);
router.post('/delete/:journeyId', extractJWT, checkUserRights.checkJourneyRights, controller.deleteJourney);

export = router;
