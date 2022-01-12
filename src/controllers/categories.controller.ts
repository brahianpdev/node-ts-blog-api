import { Request, Response } from 'express';
import { Category } from '../models';
import { CategoryService } from '../services/categories.service';

class categoriesController {
	async createCategory(req: Request, res: Response) {
		try {
			const name = req.body.name.toUpperCase();
			const category = await new CategoryService().categoryCreate(name);

			res.status(201).json({
				message: 'Category created successfully',
				category,
			});
		} catch (error) {
			res.status(500).json(error);
		}
	}

	async getCategory(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const category = await new CategoryService().categoryGet(id);

			res.json({
				message: 'Category obtained successfully',
				category,
			});
		} catch (error) {
			res.status(500).json(error);
		}
	}

	async getAllCategories(req: Request, res: Response) {
		try {
			const { limit = 5, from = 0 } = req.query;
			const query = { state: true };

			const [total, categories] = await Promise.all([
				Category.countDocuments(query),
				Category.find(query).skip(Number(from)).limit(Number(limit)),
			]);

			return res.json({
				total,
				categories,
			});
		} catch (error) {
			res.status(500).json(error);
		}
	}

	async updateCategory(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const { state, user, ...data } = req.body;

			data.name = data.name.toUpperCase();
			data.user = req.user._id;

			const category = await new CategoryService().categoryUpdate(id, data);

			return res.json({
				message: 'Category updated successfully',
				category,
			});
		} catch (error) {
			res.status(500).json(error);
		}
	}

	async deleteCategory(req: Request, res: Response) {
		try {
			const { id } = req.params;

			const category = await new CategoryService().categoryDelete(id);
			return res.json({
				message: 'Category deleted successfully',
				category
			});
		} catch (error) {
			res.status(500).json(error);
		}
	}
}

export default new categoriesController();
