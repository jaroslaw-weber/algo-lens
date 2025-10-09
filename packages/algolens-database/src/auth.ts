import PocketBase from "pocketbase";
import { User, AuthenticationError, DatabaseError } from "./types";
import { loginSchema, registerSchema } from "./schemas";
import {
  formatPocketBaseError,
  retryOperation,
  isRetryableError,
} from "./utils";

/**
 * Authentication service for PocketBase
 */
export class AuthService {
  constructor(private pb: PocketBase) {}

  /**
   * Authenticates a user with email and password
   */
  async login(email: string, password: string): Promise<User> {
    try {
      // Validate input
      loginSchema.parse({ email, password });

      // Attempt login
      const authData = await retryOperation(
        () => this.pb.collection("users").authWithPassword(email, password),
        2
      );

      return {
        id: authData.record.id,
        email: authData.record.email,
        username: authData.record.username,
        name: authData.record.name,
        avatar: authData.record.avatar,
        created: authData.record.created,
        updated: authData.record.updated,
      };
    } catch (error) {
      if (
        error &&
        typeof error === "object" &&
        "name" in error &&
        error.name === "ZodError"
      ) {
        throw new AuthenticationError("Invalid login credentials format");
      }

      const message = formatPocketBaseError(error);
      throw new AuthenticationError(`Login failed: ${message}`);
    }
  }

  /**
   * Registers a new user
   */
  async register(data: {
    email: string;
    password: string;
    passwordConfirm: string;
    username?: string;
    name?: string;
  }): Promise<User> {
    try {
      // Validate input
      registerSchema.parse(data);

      // Attempt registration
      const record = await retryOperation(
        () => this.pb.collection("users").create(data),
        2
      );

      // Auto-login after registration
      const authData = await this.pb
        .collection("users")
        .authWithPassword(data.email, data.password);

      return {
        id: authData.record.id,
        email: authData.record.email,
        username: authData.record.username,
        name: authData.record.name,
        avatar: authData.record.avatar,
        created: authData.record.created,
        updated: authData.record.updated,
      };
    } catch (error) {
      if (
        error &&
        typeof error === "object" &&
        "name" in error &&
        error.name === "ZodError"
      ) {
        throw new AuthenticationError("Invalid registration data format");
      }

      const message = formatPocketBaseError(error);
      throw new AuthenticationError(`Registration failed: ${message}`);
    }
  }

  /**
   * Logs out the current user
   */
  async logout(): Promise<void> {
    try {
      this.pb.authStore.clear();
    } catch (error) {
      throw new AuthenticationError(
        `Logout failed: ${formatPocketBaseError(error)}`
      );
    }
  }

  /**
   * Refreshes the current user's authentication token
   */
  async refreshAuth(): Promise<User | null> {
    try {
      if (!this.pb.authStore.isValid) {
        return null;
      }

      await this.pb.collection("users").authRefresh();
      const record = this.pb.authStore.model;

      if (!record) {
        return null;
      }

      return {
        id: record.id,
        email: record.email,
        username: record.username,
        name: record.name,
        avatar: record.avatar,
        created: record.created,
        updated: record.updated,
      };
    } catch (error) {
      // If refresh fails, clear auth store
      this.pb.authStore.clear();
      throw new AuthenticationError(
        `Auth refresh failed: ${formatPocketBaseError(error)}`
      );
    }
  }

  /**
   * Gets the current authenticated user
   */
  getCurrentUser(): User | null {
    if (!this.pb.authStore.isValid || !this.pb.authStore.model) {
      return null;
    }

    const record = this.pb.authStore.model;
    return {
      id: record.id,
      email: record.email,
      username: record.username,
      name: record.name,
      avatar: record.avatar,
      created: record.created,
      updated: record.updated,
    };
  }

  /**
   * Checks if user is authenticated
   */
  isAuthenticated(): boolean {
    return this.pb.authStore.isValid;
  }

  /**
   * Requests password reset
   */
  async requestPasswordReset(email: string): Promise<void> {
    try {
      await retryOperation(
        () => this.pb.collection("users").requestPasswordReset(email),
        2
      );
    } catch (error) {
      if (isRetryableError(error)) {
        throw new DatabaseError(
          `Password reset request failed: ${formatPocketBaseError(error)}`
        );
      }
      // Don't throw for non-retryable errors to avoid email enumeration
      console.warn(
        "Password reset request failed:",
        formatPocketBaseError(error)
      );
    }
  }

  /**
   * Confirms password reset
   */
  async confirmPasswordReset(
    token: string,
    password: string,
    passwordConfirm: string
  ): Promise<void> {
    try {
      await retryOperation(
        () =>
          this.pb
            .collection("users")
            .confirmPasswordReset(token, password, passwordConfirm),
        2
      );
    } catch (error) {
      throw new AuthenticationError(
        `Password reset confirmation failed: ${formatPocketBaseError(error)}`
      );
    }
  }

  /**
   * Updates user profile
   */
  async updateProfile(
    updates: Partial<Pick<User, "username" | "name" | "avatar">>
  ): Promise<User> {
    try {
      if (!this.isAuthenticated()) {
        throw new AuthenticationError(
          "User must be authenticated to update profile"
        );
      }

      const userId = this.pb.authStore.model!.id;
      const record = await retryOperation(
        () => this.pb.collection("users").update(userId, updates),
        2
      );

      return {
        id: record.id,
        email: record.email,
        username: record.username,
        name: record.name,
        avatar: record.avatar,
        created: record.created,
        updated: record.updated,
      };
    } catch (error) {
      if (error instanceof AuthenticationError) {
        throw error;
      }
      throw new DatabaseError(
        `Profile update failed: ${formatPocketBaseError(error)}`
      );
    }
  }

  /**
   * Changes user password
   */
  async changePassword(
    oldPassword: string,
    newPassword: string
  ): Promise<void> {
    try {
      if (!this.isAuthenticated()) {
        throw new AuthenticationError(
          "User must be authenticated to change password"
        );
      }

      await retryOperation(
        () =>
          this.pb.collection("users").update(this.pb.authStore.model!.id, {
            oldPassword,
            password: newPassword,
            passwordConfirm: newPassword,
          }),
        2
      );
    } catch (error) {
      throw new AuthenticationError(
        `Password change failed: ${formatPocketBaseError(error)}`
      );
    }
  }

  /**
   * Sets up auth store change listener
   */
  onAuthChange(
    callback: (isValid: boolean, user: User | null) => void
  ): () => void {
    const unsubscribe = this.pb.authStore.onChange(() => {
      const isValid = this.pb.authStore.isValid;
      const user = isValid ? this.getCurrentUser() : null;
      callback(isValid, user);
    });

    // Return unsubscribe function
    return unsubscribe;
  }
}
