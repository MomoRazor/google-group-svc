import { config } from 'dotenv';
config();

if (!process.env.MONGO_URL) throw new Error(`Missing environment variable MONGO_URL!`);

export const MONGO_URL = process.env.MONGO_URL;

if (!process.env.RBAC_SECRET && !process.env.API_KEY)
    throw new Error(`Missing both RBAC_SECRET and API_KEY environment variables!`);

export const RBAC_SECRET = process.env.RBAC_SECRET;
export const API_KEY = process.env.API_KEY;

if (!process.env.PORT) throw new Error(`Missing environment variable PORT!`);

export const PORT = process.env.PORT;

if (!process.env.SERVICE_ACCOUNT_PATH)
    throw new Error(`Missing environment variable SERVICE_ACCOUNT_PATH!`);

export const SERVICE_ACCOUNT_PATH = process.env.SERVICE_ACCOUNT_PATH;
