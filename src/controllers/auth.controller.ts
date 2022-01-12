import { generateJWT } from '../middlewares';
import { Request, Response } from 'express';

import { User } from '../models';
import { AuthService } from '../services/auth.service';
class authController {
	async register(req: Request, res: Response) {
		try {
			const { nickname, email, password, role } = req.body;
			const user = new User({ nickname, email, password, role });

			const userData = await new AuthService().authRegister(user, password);

			return res.status(200).json({
				message: 'Registered user successfully',
				userData,
			});
		} catch (error) {
			res.status(500).json(error);
		}
	}

	async login(req: Request, res: Response) {
		const { email, password } = req.body;

		try {
			const user = await User.findOne({ email });

			await new AuthService().authLogin(email, password);
			const token = await generateJWT(user.id);

			res.json({
				message: 'Logged in successfully',
				user,
				token,
			});
		} catch (error) {
			console.log(error);
			res.status(500).json({
				message: 'Contact the administrator',
			});
		}
	}
}

export default new authController();
