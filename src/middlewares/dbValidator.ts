import Category from '../models/Category';
import Post from '../models/Post';
import Role from '../models/Role';
import User from '../models/User';

export const validRole = async (role = '') => {
	const roleExists = await Role.findOne({ role });
	if (!roleExists) {
		throw new Error(`This role: ${role} does not exist`);
	}
};

export const validEmail = async (email = '') => {
	const emailExists = await User.findOne({ email });
	if (emailExists) {
		throw new Error(`This email: ${email} is already in use`);
	}
};

export const validUserByID = async (id: any) => {
	const userExists = await User.findById(id);
	if (!userExists) {
		throw new Error(`This id: ${id} is already in use`);
	}
};

export const existsCategoryById = async (id: any) => {
	const categoryExists = await Category.findById(id);
	if (!categoryExists) {
		throw new Error(`El id no existe ${id}`);
	}
};

export const existsProductById = async (id: any) => {
	const postExists = await Post.findById(id);
	if (!postExists) {
		throw new Error(`El id no existe ${id}`);
	}
};
