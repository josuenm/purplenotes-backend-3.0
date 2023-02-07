declare namespace Express {
  export interface Request {
    user: Document<User>;
  }
}
