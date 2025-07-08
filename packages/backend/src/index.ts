import { Hono, Context } from "hono";
import PocketBase from 'pocketbase';
import 'dotenv/config'; // Assuming dotenv is used for environment variables

const port = process.env.PORT || 3000;

// Initialize Pocketbase Admin client
const PB_URL = process.env.POCKETBASE_URL ||  'https://db-algolens.jarek-backend.top/'; // Use environment variable
const pb = new PocketBase(PB_URL);

import app from "./router"; // Import the configured Hono app from router.ts

export { pb }; // Export the Pocketbase client instance


export default {
  port: port,
  fetch: app.fetch,
};
