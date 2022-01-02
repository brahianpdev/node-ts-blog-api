import { Request, Response } from 'express';
import { isValidObjectId, ObjectId } from 'mongoose';

import { Category, Post, User } from '../models';

const collectionsAllowed = ['users', 'category', 'posts', 'roles'];

const searchUsers = async (term = '', res: Response) => {
	const isMongoID = isValidObjectId(term);

	if (isMongoID) {
		const user = await User.findById(term);
		return res.json({
			results: user ? [user] : [],
		});
	}

	const regex = new RegExp(term, 'i');
	const users = await User.find({
		$or: [{ nickname: regex }, { email: regex }],
		$and: [{ state: true }],
	});

	return res.json({
		results: users,
	});
};

const searchCategories = async (term = '', res: Response) => {
	const isMongoID = isValidObjectId(term);

	if (isMongoID) {
		const category = await Category.findById(term);
		return res.json({
			results: category ? [category] : [],
		});
	}

	const regex = new RegExp(term, 'i');
	const categories = await Category.find({ name: regex, state: true });

	res.json({
		results: categories,
	});
};

const searchPosts = async (term = '', res: Response) => {
	const isMongoID = isValidObjectId(term);

	if (isMongoID) {
		const post = await Post.findById(term);
		// .populate('category','nickname');
		return res.json({
			results: post ? [post] : [],
		});
	}

	const regex = new RegExp(term, 'i');
	const posts = await Post.find({ name: regex, state: true });
	// .populate('category','name')

	res.json({
		results: posts,
	});
};

class searchController {
	async search(req: Request, res: Response) {
		const { collection, term } = req.params;

		if (!collectionsAllowed.includes(collection)) {
			return res.status(400).json({
				message: `The allowed collections are ${collectionsAllowed}`,
			});
		}

		switch (collection) {
			case 'users':
				searchUsers(term, res);
				break;
			case 'category':
				searchCategories(term, res);
				break;
			case 'posts':
				searchPosts(term, res);
				break;

			default:
				res.status(500).json({
					message: 'Search failed...',
				});
		}
	}
}

export default new searchController();
