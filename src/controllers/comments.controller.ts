import { Request, Response } from 'express';
import { Comment } from '../models';

class commentController {
	async createComment(req: Request, res: Response) {
		
		try {
			const description = req.body.description;

			const commentDB = await Comment.findOne({ description });

			if (commentDB) {
				return res.status(400).json({
					msg: `The comment ${commentDB.description}, already exist`,
				});
			}

			const data = {
				description,
				user: req.params.id,
			};

			const comment = new Comment(data);
			await comment.save();

			res.status(201).json(comment);
		} catch (error) {
			res.status(500).json(error);
		}
	}

	async getComment(req: Request, res: Response) {
		
		try {
			const id = req.params.id;
			const comment = await Comment.findById(id)
			.populate('nickname', 'name');

			return res.json(comment);
		} catch (error) {
			res.status(500).json(error);
		}
	}

	async getAllComments(req: Request, res: Response) {

		try {
			const { limit = 5, from = 0 } = req.query;
			const query = { state: true };

			const [total, comments] = await Promise.all([
				Comment.countDocuments(query),
				Comment.find(query)
					.populate('nickname')
					.skip(Number(from))
					.limit(Number(limit)),
			]);

			return res.json({
				total,
				comments,
			});
		} catch (error) {
			res.status(500).json(error);
		}
	}

	async updateComment(req: Request, res: Response) {
		try {
			const id = req.params.id;
			const { state, user, ...data } = req.body;

			data.name = data.name.toUpperCase();
			data.user = req.user._id;

			const category = await Comment.findByIdAndUpdate(id, data, { new: true });

			return res.json(category);
		} catch (error) {
			res.status(500).json(error);
		}
	}

	async deleteComment(req: Request, res: Response) {
		try {
			const id = req.params.id;
			const deletedComment = await Comment.findByIdAndUpdate(id, { state: false }, { new: true });

			return res.json(deletedComment);
		} catch (error) {
			res.status(500).json(error);
		}
	}
}

export default new commentController();
