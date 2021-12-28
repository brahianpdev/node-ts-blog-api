import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { User } from '../models';
class userController {
	async updateUser(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const { _id, password, ...rest } = req.body;

			if (password) {
				const salt = bcrypt.genSaltSync();
				rest.password = bcrypt.hashSync(password, salt);
			}

			const user = await User.findByIdAndUpdate(id, rest);

			res.status(200).json({
				message: 'User updated successfully',
				user,
			});
		} catch (error) {
			res.status(500).json(error);
		}
	}

	async deleteUser(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const user = await User.findByIdAndUpdate(id, { state: false });

			res.status(200).json({
				message: 'User deleted successfully',
				user,
			});
		} catch (error) {
			res.status(500).json(error);
		}
	}

	async getAllUsers(req: Request, res: Response) {
		try {
			const { limit = 10, from = 0 } = req.query;
			const query = { state: true };

			const [total, users] = await Promise.all([
				User.countDocuments(query),
				User.find(query).limit(Number(limit)).skip(Number(from)),
			]);

			return res.status(200).json({
				total,
				users,
			});
		} catch (error) {
			res.status(500).json(error);
		}
	}

	async getUser(req: Request, res: Response) {
		try {
			const user = await User.findById(req.params.id);
			const { password, ...rest } = user._doc;

			return res.status(200).json(rest);
		} catch (error) {
			res.status(500).json(error);
		}
	}
}

export default new userController();
