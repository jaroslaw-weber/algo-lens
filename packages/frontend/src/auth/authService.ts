import { pb } from "./pocketbase";
import type {
  AuthMethodsList,
  BaseAuthStore,
  RecordAuthResponse,
  RecordModel,
} from "pocketbase";

// Manually defined types based on Pocketbase expected data structure
interface UserCreateParams {
  email: string;
  password: string;
  passwordConfirm: string;
  [key: string]: any; // Allow for other potential fields
}

interface UserLoginParams {
  identity: string; // Can be email or username
  password: string;
}

export const authService = {
  /**
   * Registers a new user with email and password.
   * @param userData - User registration data (email, password, passwordConfirm).
   * @returns A promise that resolves with the authentication response.
   */
  async register(
    userData: UserCreateParams
  ): Promise<RecordAuthResponse<RecordModel>> {
    return await pb.collection("users").create(userData);
  },

  /**
   * Logs in a user with email and password.
   * @param credentials - User login credentials (identity, password).
   * @returns A promise that resolves with the authentication response.
   */
  async login(
    credentials: UserLoginParams
  ): Promise<RecordAuthResponse<RecordModel>> {
    return await pb
      .collection("users")
      .authWithPassword(credentials.identity, credentials.password);
  },

  /**
   * Logs out the current user.
   */
  logout(): void {
    pb.authStore.clear();
  },

  /**
   * Checks if the current user is authenticated.
   * @returns True if the user is authenticated, false otherwise.
   */
  isAuthenticated(): boolean {
    return pb.authStore.isValid;
  },

  /**
   * Gets the current authenticated user record.
   * @returns The authenticated user record or null if not authenticated.
   */
  getUser(): RecordModel | null {
    return pb.authStore.model;
  },

  /**
   * Gets the authentication token.
   * @returns The authentication token or an empty string if not authenticated.
   */
  getToken(): string {
    return pb.authStore.token;
  },

  /**
   * Subscribes to authentication state changes.
   * @param callback - The callback function to execute on state change.
   * @returns A function to unsubscribe from the changes.
   */
  onAuthStateChange(
    callback: (token: string, model: RecordModel | null) => void
  ): () => void {
    return pb.authStore.onChange(callback);
  },

  /**
   * Gets the current user's plan status.
   * @returns 'free' if the user is not authenticated or their plan is not 'premium', 'premium' otherwise.
   */
  getUserPlan(): "free" | "premium" {
    const user = this.getUser();
    if (!user || user.plan !== "premium") {
      return "free";
    }
    return "premium";
  },

  /**
   * Refreshes the authentication data from the server.
   * @returns A promise that resolves when the refresh is complete.
   */
  async refreshAuth(): Promise<void> {
    if (pb.authStore.isValid) {
      await pb.collection("users").authRefresh();
    }
  },
};
