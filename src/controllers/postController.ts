import { Request, Response } from 'express';
import Post from '../models/Post';

class postController {
	async createPost(req: Request, res: Response) {
		const newPost = new Post(req.body);
		try {
			const savedPost = await newPost.save();
			return res.status(200).json(savedPost);
		} catch (error) {
			return res.status(500).json(error);
		}
	}

	async getPost(req: Request, res: Response) {
		try {
			const post = await Post.findById(req.params.id);
			return res.status(200).json(post);
		} catch (err) {
			return res.status(500).json(err);
		}
	}

	async getAllPost(req: Request, res: Response) {
		const username = req.query.user;
		const catName = req.query.cat;
		try {
			let posts: any[];
			if (username) {
				posts = await Post.find({ username });
			} else if (catName) {
				posts = await Post.find({
					categories: {
						$in: [catName],
					},
				});
			} else {
				posts = await Post.find();
			}
			return res.status(200).json(posts);
		} catch (err) {
			return res.status(500).json(err);
		}
	}

	async updatePost(req: Request, res: Response) {
		try {
			const post = await Post.findById(req.params.id);
			if (post.username === req.body.username) {
				try {
					const updatedPost = await Post.findByIdAndUpdate(
						req.params.id,
						{
							$set: req.body,
						},
						{ new: true },
					);
					return res.status(200).json(updatedPost);
				} catch (error) {
					return res.status(500).json(error);
				}
			} else {
				return res.status(401).json('You can update only your post!');
			}
		} catch (err) {
			return res.status(500).json(err);
		}
	}

	async deletePost(req: Request, res: Response) {
		try {
			const post = await Post.findById(req.params.id);
			if (post.username === req.body.username) {
				try {
					await post.delete();
					res.status(200).json('The post has been deleted...');
				} catch (error) {
					return res.status(500).json(error);
				}
			} else {
				return res.status(401).json('You can delete only your post!');
			}
		} catch (error) {
			res.status(500).json(error);
		}
	}
}

export default new postController();
