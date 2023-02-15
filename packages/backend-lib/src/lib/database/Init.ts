import { Injectable } from '@nestjs/common';
import { DatabaseClient } from './database-client';

@Injectable()
export class InitApp {
  constructor(private dataClient: DatabaseClient) {}

  async initRoles() {
    return await this.dataClient.role.createMany({
      data: [
        {
          id: 1,
          role_name: 'user',
        },
        {
          id: 2,
          role_name: 'admin',
        },
      ],
    });
  }

  async init() {
    const arrOfUsers = [];
    for (let i = 0; i < 10; i++) {
      arrOfUsers.push({
        email: i + '123b@g.com',
        password: '12345',
        roleId: 2,
      });
    }

    return await this.dataClient.user.createMany({
      data: arrOfUsers,
    });
  }

  async initProducts() {
    const arrOfPro = [];
    for (let i = 0; i < 50; i++) {
      arrOfPro.push({
        name: 'qwe' + i,
        description: '12345',
        price: 123,
      });
    }
    return await this.dataClient.product.createMany({
      data: arrOfPro,
    });
  }

  async initCollections() {
    const arrOfPro = [];
    for (let i = 0; i < 50; i++) {
      arrOfPro.push({
        name: 'qwef' + i,
      });
    }
    console.log(arrOfPro);
    return await this.dataClient.collections.createMany({
      data: arrOfPro,
    });
  }
}
