import { NextFunction, Request, Response } from 'express';
import { isNil } from "lodash";
import fs from 'fs'

import fileUtils from '../functions/file-utils';

const upload = (req: Request, res: Response, next: NextFunction) => {
    const filename = req.file?.filename;

    return res.status(200).json({
        message: 'Uploaded',
        filename: filename
    })
}

const removeFile = (req: Request, res: Response, next: NextFunction) => {
    const selector = req.params.selector;
    const filename = req.params.filename;

    const path = fileUtils.getPath(selector, filename);

    fs.unlink(path, (error) => {
        if (error) {
            return res.status(500).json({
                message: error.message,
                error
            })
        }
        else {
            return res.status(200).json({
                message: 'Discard action success'
            })
        }
    })
}

const download = (req: Request, res: Response, next: NextFunction) => {
    const selector = req.params.selector;
    const filename = req.params.filename;

    const path = fileUtils.getPath(selector, filename);

    res.download(path, filename, (error) => {
        if (error) {
            return res.status(500).json({
                message: error.message,
                error
            })
        }
    })
}

export default {
    upload,
    removeFile,
    download
}