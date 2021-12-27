import bcrypt from 'bcrypt';
import generateJWT from '../middlewares/generateJWT';
import { Request, Response } from 'express';

import User from '../models/User';
class authController {
	async register(req: Request, res: Response) {
		try {
			const { username, email, password, role } = req.body;

			const user = new User({ username, email, password, role });

			const salt = bcrypt.genSaltSync();
			user.password = bcrypt.hashSync(password, salt);

			const newUser = await user.save();

			return res.status(200).json(newUser);
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
					msg: 'User and or password is incorrect: email',
				});
			}

			if (!user.state) {
				return res.status(400).json({
					msg: 'User and or password is incorrect - state: false',
				});
			}

			const validPassword = bcrypt.compareSync(password, user.password);
			if (!validPassword) {
				return res.status(400).json({
					msg: 'User and or password is incorrect: password',
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
				msg: 'Contact the administrator',
			});
		}
	}
}

export default new authController();
