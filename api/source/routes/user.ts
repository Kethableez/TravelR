import express from 'express';
import controller from './../controllers/user';

const router = express.Router();

router.post('/login', controller.login);
router.post('/register', controller.createUser);

export = router;
