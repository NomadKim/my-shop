// import axios from 'axios';

// describe('GET /', () => {
//   it('should return a message', async () => {
//     const res = await axios.get(`/`);

//     expect(res.status).toBe(200);
//     expect(res.data).toEqual({ message: 'Hello API' });
//   });
// });

import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as pactum from 'pactum';
import { Test } from '@nestjs/testing';
import { AppModule } from 'backendnestlib';
import { UserDTO } from '@my-shop/dtos';

describe('App e2e testing', () => {
  let app: INestApplication;
  const user: UserDTO = {
    //   deepcode ignore NoHardcodedPasswords: <please specify a reason of ignoring this>
    email: 'q98jde@sdf.com',
    // deepcode ignore NoHardcodedPasswords: <please specify a reason of ignoring this>
    password: '4324234',
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      })
    );

    await app.init();
    await app.listen(3333);

    pactum.request.setBaseUrl('http://localhost:3333');
  });

  afterAll(() => {
    app.close();
  });

  describe('Auth Controller', () => {
    describe('Sign Up', () => {
      it('No Password', async () => {
        await pactum
          .spec()
          .post('/signup')
          .withBody({
            email: user.email,
          })
          .expectStatus(400);
      });

      it('No email', async () => {
        await pactum
          .spec()
          .post('/signup')
          .withBody({
            password: user.password,
          })
          .expectStatus(400);
      });

      it('Succesful signUp', async () => {
        await pactum
          .spec()
          .post('/signup')
          .withBody({
            email: user.email,
            password: user.password,
          })
          .expectStatus(201);
        // .stores('authToken', 'res.body.Authorization');
      });

      it('Succesful signUp', async () => {
        await pactum
          .spec()
          .post('/signup')
          .withBody({
            email: user.email,
            password: user.password,
          })
          .expectStatus(503);
        // .stores('authToken', 'res.body.Authorization');
      });
    });
  });

  describe('Product Controller', () => {
    beforeAll(async () => {
      await await pactum
        .spec()
        .post('/signin')
        .withBody({
          email: user.email,
          password: user.password,
        })
        .stores('authToken', 'res.body.Authorization');
    });
    it('Get Product', async () => {
      await pactum
        .spec()
        .get('/products')
        .withHeaders('Authorization', '$S{authToken}')
        .expectStatus(200);
    });
  });
});
