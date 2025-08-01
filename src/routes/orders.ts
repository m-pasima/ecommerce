import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { checkout, orderHistory } from '../controllers/orderController';

const router = Router();
router.use(authenticate);
router.post('/checkout', checkout);
router.get('/', orderHistory);

export default router;
