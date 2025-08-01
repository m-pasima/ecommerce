// Author: Codex
// Date: 2025-07-31
// Purpose: Load and validate environment variables

import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string(),
  STRIPE_SECRET: z.string().optional(),
  PORT: z.string().optional(),
});

const env = envSchema.parse(process.env);

export default env;
