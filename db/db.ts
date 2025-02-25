import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { chatTable } from "./schema";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set in environment variables");
}

const schema = { chatTable };
const client = postgres(process.env.DATABASE_URL);
export const db = drizzle(client, { schema });

// Health check function
export async function checkDatabaseConnection() {
  try {
    await client`SELECT 1`;
    return true;
  } catch (error) {
    console.error("Database connection error:", error);
    return false;
  }
} 