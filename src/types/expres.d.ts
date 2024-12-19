declare namespace Express {
  export interface Request {
    user?: {
      name?: string;
      email?: string;
      password?: string;
      role?: string;
    };
  }
  export interface Response {
    user?: {
      name?: string;
      email?: string;
      password?: string;
      role?: string;
    };
  }
}




