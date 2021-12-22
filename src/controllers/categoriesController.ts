import { Request, Response } from 'express';
import Category from '../models/Category';

class categoriesController {
	async createCategory(req: Request, res: Response) {
		const newCategory = new Category(req.body);
		try {
			const savedCategory = await newCategory.save();
			return res.status(200).json(savedCategory);
		} catch (error) {
			res.status(500).json(error);
		}
	}

	async getCategory(req: Request, res: Response) {
		try {
			const category = await Category.findById(req.params.id);
			return res.status(200).json(category);
		} catch (err) {
			return res.status(500).json(err);
		}
	}

	async getAllCategories(req: Request, res: Response) {
		try {
			const categories = await Category.find();
			return res.status(200).json(categories);
		} catch (error) {
			res.status(500).json(error);
		}
	}


	async updateCategory(req: Request, res: Response) {
		try {
			const category = await Category.findById(req.params.id);
			if (category.username === req.body.username) {
				try {
					const updateCategory = await Category.findByIdAndUpdate(
						req.params.id,
						{
							$set: req.body,
						},
						{ new: true },
					);
					return res.status(200).json(updateCategory);
				} catch (error) {
					return res.status(500).json(error);
				}
			} else {
				return res.status(401).json('You can update only your category!');
			}
		} catch (err) {
			return res.status(500).json(err);
		}
	}

	async deleteCategory(req: Request, res: Response) {
		try {
			const category = await Category.findById(req.params.id);
			if (category.name === req.body.name) {
				try {
					await category.delete();
					res.status(200).json('The category has been deleted...');
				} catch (error) {
					return res.status(500).json(error);
				}
			} else {
				return res.status(401).json('You can delete only your category!');
			}
		} catch (error) {
			res.status(500).json(error);
		}
	}
}

export default new categoriesController();
