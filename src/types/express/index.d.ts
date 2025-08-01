// src/types/express/index.d.ts

import { AuthPayload } from '../AuthPayload';

declare global {
  namespace Express {
    interface Request {
      user?: AuthPayload;
    }
  }
}

export {};
