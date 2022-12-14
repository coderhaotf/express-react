declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production";
      PORT?: number;
      SESSION_SECRET: string | string[];
      SESSION_NAME?: string;
      COOKIE_DOMAIN?: string;
      database?: {
        username?: string;
        password?: string;
        host?: string;
        port?: number;
        protocol?: string;
        database?: string;
      };
      jwt?: {
        secret_key?: string;
        expired?: string;
      };
      logging?: boolean;
    }
  }
}

export {};
