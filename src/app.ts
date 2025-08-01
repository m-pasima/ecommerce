
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import authRoutes from './routes/auth';
import productRoutes from './routes/products';
import cartRoutes from './routes/cart';
import orderRoutes from './routes/orders';

// ✅ Swagger UI imports
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

const app = express();

// ✅ Load OpenAPI doc
const swaggerDocument = YAML.load('./docs/openapi.yaml');

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// ✅ Health check
app.get('/health', (_req, res) => res.json({ status: 'ok' }));
app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});


// ✅ Mount API routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

// ✅ Swagger UI (OpenAPI docs)
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// ✅ 404 fallback
app.use((_req, res) => res.status(404).json({ error: 'Not Found' }));

// ✅ Global error handler
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

export default app;
