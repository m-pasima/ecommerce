
// Author:Pasima
// Date: 2025-07-31
// Purpose: Auth route tests

jest.mock('../src/prisma', () => ({
  __esModule: true,
  default: {
    product: {
      findMany: jest.fn().mockResolvedValue([]),
      count: jest.fn().mockResolvedValue(0),
    },
  },
}));
process.env.DATABASE_URL = 'postgres://test';
process.env.JWT_SECRET = 'testsecret';

import request from 'supertest';
import app from '../src/app';

describe('Auth Routes', () => {
  it('should return 200 on health', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
  });

  it('lists products publicly', async () => {
    const res = await request(app).get('/api/products');
    expect(res.status).toBe(200);
    expect(res.body.products).toEqual([]);
  });
});
