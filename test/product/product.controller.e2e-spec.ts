import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';

let app: INestApplication;

beforeEach(async () => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  app = moduleFixture.createNestApplication();
  await app.init(); //initiate the NestJS application
});
describe('AppController (e2e)', () => {
  let token: string;
  it('/user/login (POST)', async () => {
    const { body } = await request(app.getHttpServer())
      .post('/user/login')
      .send({
        email:"mooo@gmail.com",
        password:"1234"
       })
      .expect(200);
      console.log(body);
      
      token = body.data;
  });

  it('/product/getProducts (GET) - should return all products from cache', async () => {
    const { body } = await request(app.getHttpServer())
      .get('/product/getProducts')
      .set({token:`test ${token}`})
      .expect(200);

    expect(body).toBeInstanceOf(Object);
  });
});

afterAll(async () => {
  app.close(); // close the NestJS application
});
