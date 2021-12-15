import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import User from '../models/User';

class authController {

	async register(req: Request, res: Response) {
		try {
			const salt = await bcrypt.genSalt(10);
			const password = req.body.password;
			const hashedPassword = await bcrypt.hash(password, salt);

			const newUser = new User({
				username: req.body.username,
				email: req.body.email,
				password: hashedPassword,
			});

			const user = await newUser.save();
			return res.status(200).json(user);
		} catch (error) {
			res.status(500).json(error);
		}
	}

	async login(req: Request, res: Response) {
		try {
			const user = await User.findOne({ username: req.body.username });
			const validated = await bcrypt.compare(req.body.password, user.password);

			if (!user || !validated) {
				return res.status(400).json('Wrong credentials!');
			}

			return res.status(200).json(user);
		} catch (error) {
			res.status(500).json(error);
		}
	}
}

export default new authController;