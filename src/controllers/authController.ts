import bcrypt from 'bcrypt';
import { generateJWT } from '../middlewares';
import { Request, Response } from 'express';

import { User } from '../models';
class authController {
	async register(req: Request, res: Response) {
		try {
			const { nickname, email, password, role } = req.body;

			const user = new User({ nickname, email, password, role });

			const salt = bcrypt.genSaltSync();
			user.password = bcrypt.hashSync(password, salt);

			const newUser = await user.save();

			return res.status(200).json({
				message: 'Registered user successfully',
				newUser,
			});
		} catch (error) {
			res.status(500).json(error);
		}
	}

	async login(req: Request, res: Response) {
		const { email, password } = req.body;

		try {
			const user = await User.findOne({ email });

			if (!user) {
				return res.status(400).json({
					message: 'User and or password is incorrect: email',
				});
			}

			if (!user.state) {
				return res.status(400).json({
					message: 'User and or password is incorrect - state: false',
				});
			}

			const validPassword = bcrypt.compareSync(password, user.password);
			if (!validPassword) {
				return res.status(400).json({
					message: 'User and or password is incorrect: password',
				});
			}

			const token = await generateJWT(user.id);

			res.json({
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
