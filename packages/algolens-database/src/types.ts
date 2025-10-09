// Database entity types
export interface User {
  id: string;
  email: string;
  username?: string;
  name?: string;
  avatar?: string;
  paddle_customer_id?: string;
  created: string;
  updated: string;
}

export interface Bookmark {
  id: string;
  user: string;
  problem: string;
  created: string;
  updated: string;
}

export interface PaddleEvent {
  id: string;
  event_id: string;
  event_type: string;
  occurred_at: string;
  notification_id: string;
  data: any;
  signature?: string;
  processing_status: string;
  created: string;
  updated: string;
}

export interface Problem {
  id: string;
  title: string;
  emoji?: string;
  difficulty: "Easy" | "Medium" | "Hard";
  category?: string;
  tags: string[];
  isBookmarked?: boolean;
  repl?: {
    args: Array<{
      name: string;
      type: string;
    }>;
    returns: {
      type: string;
    };
  };
  tests?: Array<{
    id: string;
    argValues: any[];
    expectedResult: any;
  }>;
  generateSteps?: any;
  testcases?: any;
  explanation?: any;
  variables?: any;
  groups?: any;
  codeGenerationSignature?: {
    signature: string;
    name: string;
  };
  created: string;
  updated: string;
}

// PocketBase record types
export type BaseRecord = {
  id: string;
  created: string;
  updated: string;
};

export type AuthRecord = BaseRecord & {
  email: string;
  emailVisibility: boolean;
  username: string;
  verified: boolean;
};

// Environment-specific types
export interface DatabaseConfig {
  url: string;
  adminUsername?: string;
  adminPassword?: string;
}

// Error types
export class DatabaseError extends Error {
  constructor(
    message: string,
    public code?: string
  ) {
    super(message);
    this.name = "DatabaseError";
  }
}

export class AuthenticationError extends DatabaseError {
  constructor(message: string) {
    super(message, "AUTH_ERROR");
    this.name = "AuthenticationError";
  }
}

export class ValidationError extends DatabaseError {
  constructor(message: string) {
    super(message, "VALIDATION_ERROR");
    this.name = "ValidationError";
  }
}
