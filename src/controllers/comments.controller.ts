import { Request, Response } from 'express';
import { Comment } from '../models';
import { CommentService } from '../services/comment.service';
class commentController {
	async createComment(req: Request, res: Response) {
		try {
			const { state, user, ...body } = req.body;

			const commentDB = await Comment.findOne({ comment: body.comment });

			if (commentDB) {
				return res.status(400).json({
					message: `The comment ${commentDB.comment}, already exist`,
				});
			}
			const data = {
				...body,
				comment: body.comment.toLowerCase(),
				user: req.params.id,
			};

			const comment = new Comment(data);

			await comment.save();

			res.status(201).json({
				message: 'Comment created successfully',
				comment,
			});
		} catch (error) {
			return res.status(500).json(error);
		}
	}

	async getComment(req: Request, res: Response) {
		try {
			const comment = await Comment.findById(req.params.id);
			// .populate('user', 'nickname').populate('category', 'name');

			res.json(comment);
		} catch (error) {
			return res.status(500).json(error);
		}
	}

	async getAllComments(req: Request, res: Response) {
		try {
			const { limit = 5, from = 0 } = req.query;
			const query = { state: true };

			const [total, comments] = await Promise.all([
				Comment.countDocuments(query),
				Comment.find(query)
					// .populate('user', 'nickname')  //
					// .populate('category', 'name')  //
					.skip(Number(from))
					.limit(Number(limit)),
			]);

			res.json({
				total,
				comments,
			});
		} catch (error) {
			return res.status(500).json(error);
		}
	}

	async updateComment(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const { state, user, ...rest } = req.body;

			if (rest.comment) {
				rest.comment = rest.comment.toLowerCase();
			}

			rest.user = req.user._id;

			const comment = await Comment.findByIdAndUpdate(id, rest, { new: true });

			res.status(200).json({
				message: 'Comment updated successfully',
				comment,
			});
		} catch (error) {
			return res.status(500).json(error);
		}
	}

	async deleteComment(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const deletedComment = await new CommentService().commentDelete(id);

			res.status(200).json({
				message: 'Post deleted successfully',
				deletedComment,
			});
		} catch (error) {
			return res.status(500).json(error);
		}
	}
}

export default new commentController();
