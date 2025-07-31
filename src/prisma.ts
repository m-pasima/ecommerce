// Author: Codex
// Date: 2025-07-31
// Purpose: Singleton PrismaClient instance

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default prisma;
