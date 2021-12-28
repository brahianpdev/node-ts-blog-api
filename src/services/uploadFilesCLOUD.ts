import multer from 'multer';
import { Request } from 'express';
const cloudinary = require('cloudinary').v2;
import { CloudinaryStorage } from 'multer-storage-cloudinary';

import { config } from '../config';

const fileFilter = (req: Request, file: { mimetype: string | string[] }, cb: (arg0: any, arg1: boolean) => void) => {
	if (file.mimetype.includes('jpeg') || file.mimetype.includes('png') || file.mimetype.includes('jpg')) {
		cb(null, true);
	} else {
		cb(null, false);
	}
};

cloudinary.config({
	name: config.cloud.name,
	key: config.cloud.key,
	secret: config.cloud.secret,
});

const storage = new CloudinaryStorage({
	cloudinary: cloudinary,
});

const upload = multer({ storage: storage, fileFilter: fileFilter });

export default upload;

