import dotenv from 'dotenv';
dotenv.config();

const {
	MONGO_URL,
	PORT_APP,
	SECRETOPRIVATEKEY,
	CLOUDINARY_CLOUD_NAME,
	CLOUDINARY_API_KEY,
	CLOUDINARY_API_SECRET,
	CLOUDINARY_URL,
} = process.env;

export const config = {
	db: {
		mongo: MONGO_URL,
	},
	app: {
		port: PORT_APP,
	},
	jwt: {
		key: SECRETOPRIVATEKEY,
	},
	cloud: {
		name: CLOUDINARY_CLOUD_NAME,
		key: CLOUDINARY_API_KEY,
		secret: CLOUDINARY_API_SECRET,
		url: CLOUDINARY_URL,
	},
};
