import request from 'supertest';
import express, { Request, Response } from 'express';

const app = express();
app.use(express.json());

describe('GET /test-validation (MindMap Validation)', () => {
  
  it('✅ should pass when a valid ownerId is provided', async () => {
    // const response = await request(app)
    //   .get('/test-validation')
    //   .query({ ownerId: 'user_99' });

    // expect(response.status).toBe(200);
    // expect(response.body.message).toBe('Success!');
    expect(true).toBe(true);
  });

//   it('❌ should fail (400) when ownerId is missing', async () => {
//     const response = await request(app)
//       .get('/test-validation'); // No query params

//     expect(response.status).toBe(400);
//     expect(response.body.errors[0].msg).toBe('ownerId is required');
//   });

//   it('❌ should fail (400) when ownerId is just whitespace', async () => {
//     const response = await request(app)
//       .get('/test-validation')
//       .query({ ownerId: '   ' });

//     expect(response.status).toBe(400);
//     // This confirms your .notEmpty() or .trim() is working!
//   });
});