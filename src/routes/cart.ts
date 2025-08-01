import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { addToCart, removeFromCart, viewCart } from '../controllers/cartController';

const router = Router();
router.use(authenticate);
router.get('/', viewCart);
router.post('/add', addToCart);
router.post('/remove', removeFromCart);

export default router;
