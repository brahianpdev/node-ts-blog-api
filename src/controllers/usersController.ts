import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/User';
import Post from '../models/Post';

class userController {
	async updateUser(req: Request, res: Response) {
		if (req.body.userId === req.params.id) {
			if (req.body.password) {
				const salt = await bcrypt.genSalt(10);
				req.body.password = await bcrypt.hash(req.body.password, salt);
			}
			try {
				const updatedUser = await User.findByIdAndUpdate(
					req.params.id,
					{
						$set: req.body,
					},
					{ new: true },
				);
				return res.status(200).json(updatedUser);
			} catch (error) {
				res.status(500).json(error);
			}
		} else {
			res.status(401).json('You can update only your account');
		}
	}

	async deleteUser(req: Request, res: Response) {
		if (req.body.userId === req.params.id) {
			try {
				const user = await User.findById(req.params.id);
				try {
					await Post.deleteMany({ username: user.username });
					await User.findByIdAndDelete(req.params.id);
					return res.status(200).json('User has been deleted...');
				} catch (error) {
					res.status(500).json(error);
				}
			} catch (error) {
				res.status(404).json('User not found!');
			}
		} else {
			res.status(401).json('You can delete only your account!');
		}
	}

	async getUser(req: Request, res: Response) {
		try {
			const user = await User.findById(req.params.id);
			const { password, ...others } = user._doc;
			return res.status(200).json(others);
		} catch (error) {
			res.status(500).json(error);
		}
	}

}

export default new userController();
