import { Response } from 'express';
import prisma from '../prisma';
import { PrismaClient } from '@prisma/client';
const db: PrismaClient = prisma;
import { AuthRequest } from '../middleware/auth';
import { z } from 'zod';

const addSchema = z.object({ productId: z.number(), quantity: z.number().min(1) });

export async function addToCart(req: AuthRequest, res: Response) {
  const result = addSchema.safeParse(req.body);
  if (!result.success) return res.status(400).json({ error: result.error });
  const { productId, quantity } = result.data;
  try {
    await db.cartItem.upsert({
      where: { userId_productId: { userId: req.user!.userId, productId } },
      update: { quantity: { increment: quantity } },
      create: { userId: req.user!.userId, productId, quantity },
    });
    res.status(200).json({ message: 'Added to cart' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add to cart' });
  }
}

export async function removeFromCart(req: AuthRequest, res: Response) {
  const result = z.object({ productId: z.number() }).safeParse(req.body);
  if (!result.success) return res.status(400).json({ error: result.error });
  const { productId } = result.data;
  try {
    await db.cartItem.delete({
      where: { userId_productId: { userId: req.user!.userId, productId } },
    });
    res.status(200).json({ message: 'Removed' });
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: 'Item not found' });
  }
}

export async function viewCart(req: AuthRequest, res: Response) {
  try {
    const items = await db.cartItem.findMany({
      where: { userId: req.user!.userId },
      include: { product: true },
    });
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch cart' });
  }
}
