import request from 'supertest';
import app from '../src/app';

describe('Auth Routes', () => {
  it('should return 200 on health', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
  });
});
