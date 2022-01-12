import { Post } from '../models';

export class PostService {

	async postCreate(title: any) {
		const postDB = await Post.findOne({ title });

		if (postDB) {
			throw Error(`The post ${postDB.title}, already exist`);
		}

		const post = new Post(title);
		await post.save();
		return post;
	}

	async postDelete(id: any) {

		try {
			const post = await Post.findByIdAndUpdate(id, { state: false }, { new: true });
			return post;
		} catch (error) {
			throw Error('Failed to delete User...');
		}
	}


}
