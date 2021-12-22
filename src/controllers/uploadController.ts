import { Request, Response } from 'express';

class uploadController {
	async upload(req: Request, res: Response) {
		return res.status(200).json({
			message: 'File uploaded to Cloudinary correctly',
		});
	}
}

export default new uploadController();
