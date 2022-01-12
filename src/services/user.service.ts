import bcrypt from 'bcrypt';
import { User } from '../models';

export class UserService {

	private userFiltered = (user: any) => {
		const { id, password, $__, ...rest } = user;
		return { ...rest };
	};

	async userUpdate(id: any, password: any, rest: any) {
		try {
			if (password) {
				const salt = bcrypt.genSaltSync();
				rest.password = bcrypt.hashSync(password, salt);
			}

			const user = await User.findByIdAndUpdate(id, rest);
			const userUpdate = this.userFiltered(user);
			return userUpdate;
		} catch (error) {
			throw Error('Failed to update User...');
		}
	}

	async userDelete(id: any) {
		try {
			const user = await User.findByIdAndUpdate(id, { state: false });
			const userDeleted = this.userFiltered(user);
			return userDeleted;
		} catch (error) {
			throw Error('Failed to delete User...');
		}
	}

	async userGet(id: string) {
		try {
			const user = await User.findById(id);
			const userFiltered = this.userFiltered(user);

			return userFiltered;
		} catch (error) {
			throw Error('Failed to get User...');
		}
	}
}
