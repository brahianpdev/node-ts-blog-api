import { Request, Response } from 'express';
import upload from '../middlewares/multerUpload';

class uploadController {
	async uploadFile(req: Request, res: Response) {
		return res.status(200).json({
			message: 'File uploaded to Cloudinary correctly',
		});
	}
}

export default new uploadController();
