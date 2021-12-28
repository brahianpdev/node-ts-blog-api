import { Request, Response } from 'express';

export const isAdmin = (req: Request, res: Response, next: any) => {
	if (!req.user) {
		return res.status(500).json({
			message: 'To validate the role, first validate the token',
		});
	}

	const { role, nickname } = req.user;

	if (role !== 'ADMIN_ROLE') {
		return res.status(401).json({
			message: `${nickname} is not ADMIN`,
		});
	}

	next();
};

export const haveRole = (...roles: any[]) => {
	return (req: Request, res: Response, next: any) => {
		if (!req.user) {
			return res.status(500).json({
				message: 'To validate the role, first validate the token',
			});
		}

		if (!roles.includes(req.user.role)) {
			return res.status(401).json({
				message: `The service requires one of these roles: ${roles}`,
			});
		}

		next();
	};
};
