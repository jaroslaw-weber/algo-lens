import { DatabaseConfig, DatabaseError } from "./types";

/**
 * Detects if code is running in a browser environment
 */
export function isBrowser(): boolean {
  return (
    typeof window !== "undefined" && typeof window.document !== "undefined"
  );
}

/**
 * Detects if code is running in a Node.js environment
 */
export function isNode(): boolean {
  return (
    typeof process !== "undefined" &&
    process.versions != null &&
    process.versions.node != null
  );
}

/**
 * Gets database configuration from environment variables
 * Handles both client and server environments
 */
export function getDatabaseConfig(): DatabaseConfig {
  const config: DatabaseConfig = {
    url: "",
  };

  if (isBrowser()) {
    // Client-side: use process.env (works in both browser and Node.js)
    const url =
      process.env.PUBLIC_POCKETBASE_URL ||
      "https://db-algolens.jarek-backend.top/";

    if (!url) {
      throw new DatabaseError(
        "PUBLIC_POCKETBASE_URL is required in browser environment"
      );
    }

    config.url = url;
  } else if (isNode()) {
    // Server-side: use process.env
    const url =
      process.env.PUBLIC_POCKETBASE_URL ||
      "https://db-algolens.jarek-backend.top/";
    const adminUsername = process.env.PUBLIC_PB_ADMIN_USERNAME;
    const adminPassword = process.env.PUBLIC_PB_ADMIN_PASSWORD;

    if (!url) {
      throw new DatabaseError(
        "PUBLIC_POCKETBASE_URL is required in server environment"
      );
    }

    config.url = url;
    config.adminUsername = adminUsername;
    config.adminPassword = adminPassword;
  } else {
    throw new DatabaseError("Unsupported environment");
  }

  return config;
}

/**
 * Validates database configuration
 */
export function validateDatabaseConfig(config: DatabaseConfig): void {
  if (!config.url) {
    throw new DatabaseError("Database URL is required");
  }

  try {
    new URL(config.url);
  } catch {
    throw new DatabaseError("Invalid database URL format");
  }

  if (isNode() && config.adminUsername && !config.adminPassword) {
    throw new DatabaseError(
      "Admin password is required when admin username is provided"
    );
  }

  if (isNode() && config.adminPassword && !config.adminUsername) {
    throw new DatabaseError(
      "Admin username is required when admin password is provided"
    );
  }
}

/**
 * Creates a standardized error message from PocketBase errors
 */
export function formatPocketBaseError(error: any): string {
  if (error?.response?.data?.message) {
    return error.response.data.message;
  }

  if (error?.message) {
    return error.message;
  }

  if (typeof error === "string") {
    return error;
  }

  return "An unknown database error occurred";
}

/**
 * Retries a database operation with exponential backoff
 */
export async function retryOperation<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 1000
): Promise<T> {
  let lastError: any;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;

      if (attempt === maxRetries) {
        break;
      }

      // Exponential backoff with jitter
      const delay = baseDelay * Math.pow(2, attempt) + Math.random() * 1000;
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  throw lastError;
}

/**
 * Checks if an error is a network error that should be retried
 */
export function isRetryableError(error: any): boolean {
  const errorMessage = formatPocketBaseError(error).toLowerCase();
  return (
    errorMessage.includes("network") ||
    errorMessage.includes("timeout") ||
    errorMessage.includes("connection") ||
    error.code === "ECONNRESET" ||
    error.code === "ETIMEDOUT"
  );
}

/**
 * Safely parses JSON with error handling
 */
export function safeJsonParse<T>(json: string, fallback: T): T {
  try {
    return JSON.parse(json);
  } catch {
    return fallback;
  }
}

/**
 * Creates a query string from an object
 */
export function createQueryString(params: Record<string, any>): string {
  const searchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null) {
      searchParams.set(key, String(value));
    }
  }

  return searchParams.toString();
}

/**
 * Debounces a function call
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return (...args: Parameters<T>) => {
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      func(...args);
    }, wait);
  };
}
