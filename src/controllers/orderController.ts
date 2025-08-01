import { Response } from 'express';
import Stripe from 'stripe';
import prisma from '../prisma';
import { PrismaClient } from '@prisma/client';
const db: PrismaClient = prisma;
import env from '../config';
import { AuthRequest } from '../middleware/auth';

const stripe = new Stripe(env.STRIPE_SECRET || 'test', { apiVersion: '2022-11-15' });

export async function checkout(req: AuthRequest, res: Response) {
  try {
    const items = await db.cartItem.findMany({
      where: { userId: req.user!.userId },
      include: { product: true },
    });
    if (items.length === 0) return res.status(400).json({ error: 'Cart empty' });

    let amount = 0;
    for (const i of items) {
      amount += i.product.price * i.quantity;
    }

    const payment = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: 'usd',
    });

    await Promise.all(
      items.map((i: (typeof items)[number]) =>
        db.order.create({
          data: {
            userId: req.user!.userId,
            productId: i.productId,
            quantity: i.quantity,
          },
        })
      )
    );

    await db.cartItem.deleteMany({ where: { userId: req.user!.userId } });

    res.json({ clientSecret: payment.client_secret });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Checkout failed' });
  }
}

export async function orderHistory(req: AuthRequest, res: Response) {
  try {
    const orders = await db.order.findMany({
      where: { userId: req.user!.userId },
      include: { product: true },
      orderBy: { createdAt: 'desc' },
    });
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
}
