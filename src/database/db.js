import pgk from "pg";
import dotenv from "dotenv";
const { Pool } = pgk;
dotenv.config();

const connection = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export { connection };
