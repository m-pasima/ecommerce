import { Request, Response } from 'express';
import { z } from 'zod';
import prisma from '../prisma';

const productSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  price: z.number(),
});

export async function createProduct(req: Request, res: Response) {
  const result = productSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ error: result.error });
  }
  try {
    const product = await prisma.product.create({ data: result.data });
    res.status(201).json(product);
  } catch (e) {
    res.status(500).json({ error: 'Failed to create product' });
  }
}

export async function listProducts(req: Request, res: Response) {
  const page = parseInt((req.query.page as string) || '1');
  const pageSize = parseInt((req.query.pageSize as string) || '10');
  const search = (req.query.search as string) || '';
  const where = search
    ? { name: { contains: search, mode: 'insensitive' as const } }
    : {};
  try {
    const [products, total] = await Promise.all([
      prisma.product.findMany({ where, skip: (page - 1) * pageSize, take: pageSize }),
      prisma.product.count({ where }),
    ]);
    res.json({ products, total });
  } catch (e) {
    res.status(500).json({ error: 'Failed to list products' });
  }
}

export async function getProduct(req: Request, res: Response) {
  const id = Number(req.params.id);
  try {
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) return res.status(404).json({ error: 'Not found' });
    res.json(product);
  } catch (e) {
    res.status(500).json({ error: 'Failed to get product' });
  }
}

export async function updateProduct(req: Request, res: Response) {
  const id = Number(req.params.id);
  const result = productSchema.partial().safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ error: result.error });
  }
  try {
    const product = await prisma.product.update({ where: { id }, data: result.data });
    res.json(product);
  } catch (e) {
    res.status(404).json({ error: 'Product not found' });
  }
}

export async function deleteProduct(req: Request, res: Response) {
  const id = Number(req.params.id);
  try {
    await prisma.product.delete({ where: { id } });
    res.status(204).send();
  } catch (e) {
    res.status(404).json({ error: 'Product not found' });
  }
}
