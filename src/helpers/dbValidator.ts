import { Comment } from '../models';
import Category from '../models/category.model';
import Post from '../models/post.model';
import Role from '../models/role.model';
import User from '../models/user.model';

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
		throw new Error(`Id does not exist ${id}`);
	}
};

export const existPostById = async (id: any) => {
	const postExists = await Post.findById(id);
	if (!postExists) {
		throw new Error(`Id does not exist ${id}`);
	}
};

export const existCommentById = async (id: any) => {
	const commentExist = await Comment.findById(id);
	if (!commentExist) {
		throw new Error(`Id does not exist ${id}`);
	}
};