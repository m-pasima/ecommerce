
// Author: Pasima
// Date: 2025-07-31
// Purpose: Express application setup

import express from 'express';
const app = express();

app.use(express.json());

// ✅ Add this default route
app.get('/', (req, res) => {
  res.send('🚀 E-commerce API is running!');
});

// your other routes...
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);

// server listen
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

