import multer from 'multer';
import { extname } from 'path';
import fileUtils from '../functions/file-utils';
const imageMaxSize = 5 * 1024 * 1024;

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const path = fileUtils.getPath(req.params.selector);
        cb(null, path);
    },
    filename: (req, file, cb) => {
        const filename = [Date.now(), file.originalname].join('-');
        cb(null, filename);
    }
})

const upload = multer ({ 
    storage: storage,
    limits: { fileSize: imageMaxSize }
}).single('file');

export default upload;