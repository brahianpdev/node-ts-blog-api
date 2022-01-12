import { Category } from '../models';

export class CategoryService {
	async categoryCreate(name: any) {
		try {
			const categoryDB = await Category.findOne({ name });

			if (categoryDB) {
				throw Error(`The category ${categoryDB.name}, already exist`);
			}

			const category = new Category({ name });
			await category.save();

			return category;
		} catch (error) {
			throw Error('Failed to create Category...');
		}
	}

	async categoryGet(id: any) {
		try {
			const category = await Category.findById(id);
			return category;
		} catch (error) {
			throw Error('Failed to get Category...');
		}
	}

	async categoryUpdate(id: any, data: any) {
		try {
			const category = await Category.findByIdAndUpdate(id, data, { new: true });
			return category;
		} catch (error) {
			throw Error('Failed to update Category...');
		}
	}

	async categoryDelete(id: any) {
		try {
			const category = await Category.findByIdAndUpdate(id, { state: false }, { new: true });
			return category;
		} catch (error) {
			throw Error('Failed to removed Category...');
		}
	}
}
