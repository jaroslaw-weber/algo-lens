import PocketBase from "pocketbase";
import { AuthService } from "./auth";
import {
  User,
  Bookmark,
  Problem,
  DatabaseError,
  DatabaseConfig,
  AuthenticationError,
} from "./types";
import {
  getDatabaseConfig,
  validateDatabaseConfig,
  retryOperation,
  formatPocketBaseError,
  isNode,
} from "./utils";
import { bookmarkSchema, paginationSchema } from "./schemas";

/**
 * Server-side database interface for Node.js environments with admin capabilities
 */
export class DatabaseServer {
  private pb: PocketBase;
  private auth: AuthService;
  private config: DatabaseConfig;
  private isAdminAuthenticated: boolean = false;

  constructor(config?: Partial<DatabaseConfig>) {
    if (!isNode()) {
      throw new DatabaseError(
        "DatabaseServer can only be used in Node.js environments"
      );
    }

    this.config = config
      ? { ...getDatabaseConfig(), ...config }
      : getDatabaseConfig();
    validateDatabaseConfig(this.config);

    this.pb = new PocketBase(this.config.url);
    this.auth = new AuthService(this.pb);
  }

  /**
   * Authenticate as admin user
   */
  async authenticateAsAdmin(): Promise<void> {
    if (!this.config.adminUsername || !this.config.adminPassword) {
      throw new AuthenticationError("Admin credentials not provided");
    }

    try {
      await retryOperation(
        () =>
          this.pb
            .collection("_superusers")
            .authWithPassword(
              this.config.adminUsername!,
              this.config.adminPassword!
            ),
        2
      );
      this.isAdminAuthenticated = true;
    } catch (error) {
      this.isAdminAuthenticated = false;
      throw new AuthenticationError(
        `Admin authentication failed: ${formatPocketBaseError(error)}`
      );
    }
  }

  /**
   * Check if admin is authenticated
   */
  isAdmin(): boolean {
    return this.isAdminAuthenticated && this.pb.authStore.isValid;
  }

  /**
   * Ensure admin authentication
   */
  private ensureAdmin(): void {
    if (!this.isAdmin()) {
      throw new AuthenticationError("Admin authentication required");
    }
  }

  // Authentication methods (limited for server)
  get authService(): AuthService {
    return this.auth;
  }

  // Admin user management methods
  async getUser(id: string): Promise<User> {
    this.ensureAdmin();
    try {
      const record = await retryOperation(
        () => this.pb.collection("users").getOne(id),
        2
      );

      return {
        id: record.id,
        email: record.email,
        username: record.username,
        name: record.name,
        avatar: record.avatar,
        paddle_customer_id: record.paddle_customer_id,
        created: record.created,
        updated: record.updated,
      };
    } catch (error) {
      throw new DatabaseError(
        `Failed to get user: ${formatPocketBaseError(error)}`
      );
    }
  }

  async getUsers(options?: {
    page?: number;
    perPage?: number;
    sort?: string;
    filter?: string;
  }): Promise<{ items: User[]; totalItems: number; totalPages: number }> {
    this.ensureAdmin();
    try {
      const params = paginationSchema.parse(options || {});
      const records = await retryOperation(
        () =>
          this.pb.collection("users").getList(params.page, params.perPage, {
            sort: params.sort,
            filter: params.filter,
          }),
        2
      );

      const items: User[] = records.items.map((item) => ({
        id: item.id,
        email: item.email,
        username: item.username,
        name: item.name,
        avatar: item.avatar,
        paddle_customer_id: item.paddle_customer_id,
        created: item.created,
        updated: item.updated,
      }));

      return {
        items,
        totalItems: records.totalItems,
        totalPages: records.totalPages,
      };
    } catch (error) {
      throw new DatabaseError(
        `Failed to get users: ${formatPocketBaseError(error)}`
      );
    }
  }

  // Bookmark methods (admin access)
  async getAllBookmarks(options?: {
    page?: number;
    perPage?: number;
    sort?: string;
    filter?: string;
  }): Promise<{ items: Bookmark[]; totalItems: number; totalPages: number }> {
    this.ensureAdmin();
    try {
      const params = paginationSchema.parse(options || {});
      const records = await retryOperation(
        () =>
          this.pb.collection("bookmarks").getList(params.page, params.perPage, {
            sort: params.sort,
            filter: params.filter,
          }),
        2
      );

      return {
        items: records.items.map((item) => bookmarkSchema.parse(item)),
        totalItems: records.totalItems,
        totalPages: records.totalPages,
      };
    } catch (error) {
      throw new DatabaseError(
        `Failed to get bookmarks: ${formatPocketBaseError(error)}`
      );
    }
  }

  async deleteBookmark(id: string): Promise<void> {
    this.ensureAdmin();
    try {
      await retryOperation(() => this.pb.collection("bookmarks").delete(id), 2);
    } catch (error) {
      throw new DatabaseError(
        `Failed to delete bookmark: ${formatPocketBaseError(error)}`
      );
    }
  }

  // Problem methods (admin access)
  async createProblem(
    data: Omit<Problem, "id" | "created" | "updated">
  ): Promise<Problem> {
    this.ensureAdmin();
    try {
      const record = await retryOperation(
        () => this.pb.collection("problems").create(data),
        2
      );

      return record as unknown as Problem;
    } catch (error) {
      throw new DatabaseError(
        `Failed to create problem: ${formatPocketBaseError(error)}`
      );
    }
  }

  async updateProblem(
    id: string,
    data: Partial<Omit<Problem, "id" | "created" | "updated">>
  ): Promise<Problem> {
    this.ensureAdmin();
    try {
      const record = await retryOperation(
        () => this.pb.collection("problems").update(id, data),
        2
      );

      return record as unknown as Problem;
    } catch (error) {
      throw new DatabaseError(
        `Failed to update problem: ${formatPocketBaseError(error)}`
      );
    }
  }

  async deleteProblem(id: string): Promise<void> {
    this.ensureAdmin();
    try {
      await retryOperation(() => this.pb.collection("problems").delete(id), 2);
    } catch (error) {
      throw new DatabaseError(
        `Failed to delete problem: ${formatPocketBaseError(error)}`
      );
    }
  }

  async getProblem(id: string): Promise<Problem> {
    this.ensureAdmin();
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
    this.ensureAdmin();
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

  // Generic collection methods (admin access)
  async getRecords(
    collection: string,
    options?: {
      page?: number;
      perPage?: number;
      sort?: string;
      filter?: string;
    }
  ): Promise<{ items: any[]; totalItems: number; totalPages: number }> {
    this.ensureAdmin();
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
    this.ensureAdmin();
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
    this.ensureAdmin();
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
    this.ensureAdmin();
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
    this.ensureAdmin();
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

  // Cleanup
  async close(): Promise<void> {
    this.pb.authStore.clear();
    this.isAdminAuthenticated = false;
  }
}

// Default server instance
let defaultServer: DatabaseServer | null = null;

export async function getDefaultServer(): Promise<DatabaseServer> {
  if (!defaultServer) {
    defaultServer = new DatabaseServer();
    await defaultServer.authenticateAsAdmin();
  }
  return defaultServer;
}

export function setDefaultServer(server: DatabaseServer): void {
  defaultServer = server;
}
