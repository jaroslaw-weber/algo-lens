import { Hono, Context } from "hono";
import PocketBase from "pocketbase";
import { getDatabaseConfig } from "@algolens/database";
import "dotenv/config"; // Assuming dotenv is used for environment variables

const port = process.env.PORT || 3000;

// Initialize PocketBase client using config from new package
const config = getDatabaseConfig();
const pb = new PocketBase(config.url);

import app from "./router"; // Import the configured Hono app from router.ts

export { pb }; // Export the Pocketbase client instance

export default {
  port: port,
  fetch: app.fetch,
};
