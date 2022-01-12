import { Comment } from '../models';

export class CommentService {
	async commentDelete(id: any) {
		try {
			const comment = await Comment.findByIdAndUpdate(id, { state: false }, { new: true });
			return comment;
		} catch (error) {
			throw Error('Failed to delete User...');
		}
	}
}
