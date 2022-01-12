import bcrypt from 'bcrypt';

import User from '../models/user.model';

export class AuthService {
	private userFiltered = (user: any) => {
		const { nickname, email, password, role } = user;
		const newUser = new User({ nickname, email, password, role }); // Revisar de sacar el new User de aqui!
		return newUser;
	};

	async authRegister(user: any, password: any) {
		try {
			const salt = bcrypt.genSaltSync();
			user.password = bcrypt.hashSync(password, salt);

			const newUser = this.userFiltered(user).save();
			return newUser;
		} catch (error) {
			throw Error('Failed to register User...');
		}
	}

	async authLogin(email: any, password: any) {
		const user = await User.findOne({ email });

		if (!user) {
			throw Error('User and or password is incorrect: email');
		}

		if (!user.state) {
			throw Error('User and or password is incorrect - state: false');
		}

		const validPassword = bcrypt.compareSync(password, user.password);
		if (!validPassword) {
			throw Error('User and or password is incorrect: password');
		}

		const userLogin = this.userFiltered(email);
		return userLogin ;
	}
}
