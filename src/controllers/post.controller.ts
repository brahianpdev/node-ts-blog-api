import { Request, Response } from 'express';
import { Post } from '../models';
import { PostService } from '../services/post.service';

class postController {
	async createPost(req: Request, res: Response) {
		try {
			const { state, user, ...body } = req.body;

			const postDB = await Post.findOne({ title: body.title });

			if (postDB) {
				return res.status(400).json({
					message: `The post ${postDB.title}, already exist`,
				});
			}

			const data = {
				...body,
				title: body.title.toUpperCase(),
				user: req.params.id,
			};

			const post = new Post(data);

			await post.save();

			res.status(201).json({
				message: 'Post created successfully',
				post,
			});
		} catch (error) {
			return res.status(500).json(error);
		}
	}

	async getPost(req: Request, res: Response) {
		try {
			const post = await Post.findById(req.params.id)
			.populate('category')

			res.json(post);
		} catch (error) {
			return res.status(500).json(error);
		}
	}

	async getAllPost(req: Request, res: Response) {
		try {
			const { limit = 5, from = 0 } = req.query;
			const query = { state: true };

			const [total, posts] = await Promise.all([
				Post.countDocuments(query),
				Post.find(query)
					// .populate('user', 'nickname')  //
					// .populate('category', 'name')  //
					.skip(Number(from))
					.limit(Number(limit)),
			]);

			res.json({
				total,
				posts,
			});
		} catch (error) {
			return res.status(500).json(error);
		}
	}

	async updatePost(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const { state, user, ...rest } = req.body;

			if (rest.title) {
				rest.title = rest.title.toUpperCase();
			}

			rest.user = req.user._id;

			const post = await Post.findByIdAndUpdate(id, rest, { new: true });

			res.status(200).json({
				message: 'Post updated successfully',
				post,
			});
		} catch (error) {
			return res.status(500).json(error);
		}
	}

	async deletePost(req: Request, res: Response) {
		try {
			const { id } = req.params;

			const deletedPost = await new PostService().postDelete(id);

			res.status(200).json({
				message: 'Post deleted successfully',
				deletedPost,
			});
		} catch (error) {
			return res.status(500).json(error);
		}
	}
}

export default new postController();
