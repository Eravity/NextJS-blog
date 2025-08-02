import { config } from "dotenv";

// Load environment-specific .env file if it exists, otherwise load default .env
const envFile = process.env.NODE_ENV
  ? `.env.${process.env.NODE_ENV}.local`
  : ".env.development.local";

config({ path: envFile });

// Also try to load a general .env file as fallback
config();

export const { DB_URI } = process.env;
