import PocketBase from "pocketbase";
import { AuthService } from "./auth";
import {
  User,
  Bookmark,
  Problem,
  DatabaseError,
  DatabaseConfig,
} from "./types";
import {
  getDatabaseConfig,
  validateDatabaseConfig,
  retryOperation,
  formatPocketBaseError,
} from "./utils";
import { bookmarkSchema, paginationSchema } from "./schemas";

/**
 * Client-side database interface for browser environments
 */
export class DatabaseClient {
  private pb: PocketBase;
  private auth: AuthService;
  private config: DatabaseConfig;

  constructor(config?: Partial<DatabaseConfig>) {
    this.config = config
      ? { ...getDatabaseConfig(), ...config }
      : getDatabaseConfig();
    validateDatabaseConfig(this.config);

    this.pb = new PocketBase(this.config.url);
    this.auth = new AuthService(this.pb);

    // Set up auto refresh for auth tokens
    this.pb.authStore.onChange(() => {
      // Auto-refresh logic can be added here if needed
    });
  }

  // Authentication methods
  get authService(): AuthService {
    return this.auth;
  }

  // User methods
  async getCurrentUser(): Promise<User | null> {
    return this.auth.getCurrentUser();
  }

  async isAuthenticated(): Promise<boolean> {
    return this.auth.isAuthenticated();
  }

  // Bookmark methods
  async addBookmark(problemId: string): Promise<Bookmark> {
    try {
      if (!this.auth.isAuthenticated()) {
        throw new DatabaseError("User must be authenticated to add bookmarks");
      }

      const userId = this.pb.authStore.model!.id;
      const record = await retryOperation(
        () =>
          this.pb.collection("bookmarks").create({
            user: userId,
            problem: problemId,
          }),
        2
      );

      return bookmarkSchema.parse(record);
    } catch (error) {
      throw new DatabaseError(
        `Failed to add bookmark: ${formatPocketBaseError(error)}`
      );
    }
  }

  async removeBookmark(problemId: string): Promise<void> {
    try {
      if (!this.auth.isAuthenticated()) {
        throw new DatabaseError(
          "User must be authenticated to remove bookmarks"
        );
      }

      const userId = this.pb.authStore.model!.id;
      const bookmark = await this.pb
        .collection("bookmarks")
        .getFirstListItem(`user='${userId}' && problem='${problemId}'`, {
          requestKey: null,
        });

      await retryOperation(
        () => this.pb.collection("bookmarks").delete(bookmark.id),
        2
      );
    } catch (error) {
      throw new DatabaseError(
        `Failed to remove bookmark: ${formatPocketBaseError(error)}`
      );
    }
  }

  async getUserBookmarks(userId?: string): Promise<Bookmark[]> {
    try {
      console.log("get user bookmarks");
      const targetUserId =
        userId ||
        (this.auth.isAuthenticated() ? this.pb.authStore.model!.id : null);
      if (!targetUserId) {
        throw new DatabaseError("User ID is required");
      }

      const records = await retryOperation(
        () =>
          this.pb.collection("bookmarks").getList(1, 100, {
            filter: `user='${targetUserId}'`,
            sort: "-created",
          }),
        2
      );

      console.log("good");

      return records.items.map((item) => bookmarkSchema.parse(item));
    } catch (error) {
      throw new DatabaseError(
        `Failed to get bookmarks: ${formatPocketBaseError(error)}`
      );
    }
  }

  async isProblemBookmarked(
    problemId: string,
    userId?: string
  ): Promise<boolean> {
    try {
      const targetUserId =
        userId ||
        (this.auth.isAuthenticated() ? this.pb.authStore.model!.id : null);
      if (!targetUserId) {
        return false;
      }

      const records = await this.pb.collection("bookmarks").getList(1, 1, {
        filter: `user='${targetUserId}' && problem='${problemId}'`,
      });

      return records.items.length > 0;
    } catch (error) {
      // If there's an error, assume not bookmarked
      return false;
    }
  }

  // Problem methods
  async getProblem(id: string): Promise<Problem> {
    try {
      const record = await retryOperation(
        () => this.pb.collection("problems").getOne(id),
        2
      );

      return record as unknown as Problem;
    } catch (error) {
      throw new DatabaseError(
        `Failed to get problem: ${formatPocketBaseError(error)}`
      );
    }
  }

  async getProblems(options?: {
    page?: number;
    perPage?: number;
    sort?: string;
    filter?: string;
  }): Promise<{ items: Problem[]; totalItems: number; totalPages: number }> {
    try {
      const params = paginationSchema.parse(options || {});
      const records = await retryOperation(
        () =>
          this.pb.collection("problems").getList(params.page, params.perPage, {
            sort: params.sort,
            filter: params.filter,
          }),
        2
      );

      return {
        items: records.items as unknown as Problem[],
        totalItems: records.totalItems,
        totalPages: records.totalPages,
      };
    } catch (error) {
      throw new DatabaseError(
        `Failed to get problems: ${formatPocketBaseError(error)}`
      );
    }
  }

  // Generic collection methods
  async getRecords(
    collection: string,
    options?: {
      page?: number;
      perPage?: number;
      sort?: string;
      filter?: string;
    }
  ): Promise<{ items: any[]; totalItems: number; totalPages: number }> {
    try {
      const params = paginationSchema.parse(options || {});
      const records = await retryOperation(
        () =>
          this.pb.collection(collection).getList(params.page, params.perPage, {
            sort: params.sort,
            filter: params.filter,
          }),
        2
      );

      return {
        items: records.items,
        totalItems: records.totalItems,
        totalPages: records.totalPages,
      };
    } catch (error) {
      throw new DatabaseError(
        `Failed to get records from ${collection}: ${formatPocketBaseError(error)}`
      );
    }
  }

  async getRecord(collection: string, id: string): Promise<any> {
    try {
      const record = await retryOperation(
        () => this.pb.collection(collection).getOne(id),
        2
      );

      return record;
    } catch (error) {
      throw new DatabaseError(
        `Failed to get record from ${collection}: ${formatPocketBaseError(error)}`
      );
    }
  }

  async createRecord(collection: string, data: any): Promise<any> {
    try {
      const record = await retryOperation(
        () => this.pb.collection(collection).create(data),
        2
      );

      return record;
    } catch (error) {
      throw new DatabaseError(
        `Failed to create record in ${collection}: ${formatPocketBaseError(error)}`
      );
    }
  }

  async updateRecord(collection: string, id: string, data: any): Promise<any> {
    try {
      const record = await retryOperation(
        () => this.pb.collection(collection).update(id, data),
        2
      );

      return record;
    } catch (error) {
      throw new DatabaseError(
        `Failed to update record in ${collection}: ${formatPocketBaseError(error)}`
      );
    }
  }

  async deleteRecord(collection: string, id: string): Promise<void> {
    try {
      await retryOperation(() => this.pb.collection(collection).delete(id), 2);
    } catch (error) {
      throw new DatabaseError(
        `Failed to delete record from ${collection}: ${formatPocketBaseError(error)}`
      );
    }
  }

  // Health check
  async healthCheck(): Promise<{ status: "ok" | "error" }> {
    try {
      await this.pb.health.check();
      return { status: "ok" };
    } catch (error) {
      return { status: "error" };
    }
  }
}

// Default client instance
let defaultClient: DatabaseClient | null = null;

export function getDefaultClient(): DatabaseClient {
  if (!defaultClient) {
    defaultClient = new DatabaseClient();
  }
  return defaultClient;
}

export function setDefaultClient(client: DatabaseClient): void {
  defaultClient = client;
}
