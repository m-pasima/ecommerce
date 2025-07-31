// Author: Codex
// Date: 2025-07-31
// Purpose: Server entrypoint
import env from './config';

import app from './app';
const port = env.PORT ? Number(env.PORT) : 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
