import PocketBase from "pocketbase";

// Replace with your Pocketbase service URL
const PB_URL =
  import.meta.env.PUBLIC_POCKETBASE_URL ||
  "https://db-algolens.jarek-backend.top/";

export const pb = new PocketBase(PB_URL);

// Optional: auto refresh authentication if the user is logged in
pb.authStore.onChange(() => {
  console.log("authStore changed", pb.authStore.isValid);
});

export async function addBookmark(problemId: string): Promise<void> {
  if (!pb.authStore.isValid) {
    console.error("User not logged in.");
    throw new Error("User not logged in.");
  }

  const userId = pb.authStore.model!.id;

  try {
    await pb.collection("bookmarks").create({
      user: userId,
      problem: problemId,
    });
    console.log(`Bookmark added for problem ${problemId}`);
  } catch (error) {
    console.error(`Error adding bookmark for problem ${problemId}:`, error);
    throw error;
  }
}

export async function removeBookmark(problemId: string): Promise<void> {
  if (!pb.authStore.isValid) {
    console.error("User not logged in.");
    throw new Error("User not logged in.");
  }

  const userId = pb.authStore.model!.id;

  try {
    const bookmark = await pb
      .collection("bookmarks")
      .getFirstListItem(`user='${userId}' && problem='${problemId}'`, {
        requestKey: null,
      });
    await pb.collection("bookmarks").delete(bookmark.id);
    console.log(`Bookmark removed for problem ${problemId}`);
  } catch (error) {
    console.error(`Error removing bookmark for problem ${problemId}:`, error);
    throw error;
  }
}

export function getCurrentUserEmail(): string | null {
  return pb.authStore.isValid && pb.authStore.model
    ? pb.authStore.model.email
    : null;
}
