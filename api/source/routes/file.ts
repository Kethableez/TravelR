import express from 'express';

import upload from '../middleware/file-upload';
import controller from '../controllers/file';

const router = express.Router();

router.get('/download/:selector/:filename', controller.download);
router.get('/remove/:selector/:filename', controller.removeFile);

router.post('/upload/:selector', upload, controller.upload);

export = router;
