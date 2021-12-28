import 'express';

declare module 'express' {
	interface Request {
		user?: any;
		jwtPayload?: any;
		currentUser?: any;
		nickname: any;
	}
}
