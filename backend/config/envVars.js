import dotenv from 'dotenv';
dotenv.config();
export const ENV_VARS = {
    MONGO_URI: "mongodb+srv://vasanthp2610:vasanth2610@cluster0.h1wtv.mongodb.net/dailydo",
    PORT: 3000,
    JWT_SECRET: "my_really_hard_to_decode_secret",
    NODE_ENV: "development",
} 