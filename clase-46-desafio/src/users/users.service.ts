import { Injectable } from '@nestjs/common';

// This should be a real class/interface representing a user entity
export type User = any;

import { DaoFactory } from '../daos/';


@Injectable()
export class UsersService {

  usersDao: any;

  constructor() {
    this.usersDao = DaoFactory.getDao('usuarios');
  }


  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    const user = await this.usersDao.getByUsername(username);

    return user;

    //return this.users.find(user => user.username === username);
  }
}