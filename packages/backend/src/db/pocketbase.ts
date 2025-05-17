import PocketBase from "pocketbase";

const PB_URL =
  process.env.PUBLIC_POCKETBASE_URL || "https://db-algolens.jarek-backend.top/";

const USERNAME = process.env.PUBLIC_PB_ADMIN_USERNAME;
const PASSWORD = process.env.PUBLIC_PB_ADMIN_PASSWORD;
export async function getPocketbase() {
  const pb = new PocketBase(PB_URL);
  if (!USERNAME) {
    throw new Error("USERNAME not specified");
  }
  if (!PASSWORD) {
    throw new Error("PASSWORD not specified");
  }
  await pb.collection("_superusers").authWithPassword(USERNAME, PASSWORD);

  return pb;
}
