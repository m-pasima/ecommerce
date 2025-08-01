
// Author: Pasima
// Date: 2025-07-31
// Purpose: Authentication controller

import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import prisma from '../prisma';
import env from '../config';


const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export async function signup(req: Request, res: Response) {


  const result = signupSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ error: result.error });
  }
  const { email, password } = result.data;
  const hashed = await bcrypt.hash(password, 10);
  try {
    const user = await prisma.user.create({
      data: { email, password: hashed },
    });
    res.status(201).json({ id: user.id, email: user.email });
  } catch (e) {
    res.status(400).json({ error: 'User already exists' });
  }
}

export async function login(req: Request, res: Response) {

  const result = signupSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ error: result.error });
  }
  const { email, password } = result.data;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign(
    { userId: user.id, role: user.role },
    env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  res.json({ token });
}
