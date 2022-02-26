import express from 'express';
import controller from './../controllers/journey';

import validateJWT from '../middleware/validate-jwt';
import validateRequest from '../middleware/request-validator';

const router = express.Router();

router.get('/all', controller.getJourneys);
router.get('/get/:journeyId', validateRequest.journeyData, controller.getJourney);

router.post('/create', controller.createJourney);
router.post(
    '/edit/:journeyId',
    validateJWT,
    validateRequest.journeyEdit,
    controller.editJourney
);
router.post(
    '/delete/:journeyId',
    validateJWT,
    validateRequest.journeyEdit,
    controller.deleteJourney
);

export = router;
