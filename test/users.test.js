const request = require('supertest');

const app = require('../app');
const { User } = require('../models/users');

describe('signup api test', () => {
  test('[Success] 회원가입 성공', async () => {
    await request(app)
      .post('/users/signup')
      .send({ email: 'user@example.com', password: 'user123@' })
      .expect(200);
  });

  test('[Fail] 유효하지 않은 이메일로 회원가입 실패 후 400코드 반환', async () => {
    await request(app)
      .post('/users/signup')
      .send({ email: 'test', password: 'password123@' })
      .expect(400, { message: 'INVALID EMAIL OR PASSWORD' });
  });

  test('[Success] 로그인 성공', async () => {
    await request(app)
      .post('/users/signin')
      .send({ email: 'test@example.com', password: 'test123@' })
      .expect(200);
  });

  test('[Fail] 비밀번호 잘못 입력 시 로그인 실패', async () => {
    await request(app)
      .post('/users/signin')
      .send({ email: 'test@example.com', password: 'test@' })
      .expect(400, { message: 'INVALID PASSWORD' });
  });
});
