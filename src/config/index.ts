import dotenv from 'dotenv';
dotenv.config();

const {
    MONGO_URL,
    PORT_APP
} = process.env;

export const config = {
    db: {
        mongo: MONGO_URL
    },
    app: {
        port: PORT_APP
    }
}