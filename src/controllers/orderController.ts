import { Response } from 'express';
import Stripe from 'stripe';
import prisma from '../prisma';
import { PrismaClient } from '@prisma/client';
import env from '../config';
import { AuthRequest } from '../middleware/auth';

const db: PrismaClient = prisma;

const stripe = new Stripe(env.STRIPE_SECRET, { apiVersion: '2022-11-15' });

export async function checkout(req: AuthRequest, res: Response) {
  try {
    if (!req.user) return res.status(401).json({ error: 'Unauthorized' });

    const items = await db.cartItem.findMany({
      where: { userId: req.user.userId },
      include: { product: true },
    });

    if (items.length === 0) return res.status(400).json({ error: 'Cart empty' });

    const amount = items.reduce(
      (sum, i) => sum + i.product.price * i.quantity,
      0
    );

    const payment = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: 'usd',
    });

    await Promise.all(
      items.map((i) =>
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

