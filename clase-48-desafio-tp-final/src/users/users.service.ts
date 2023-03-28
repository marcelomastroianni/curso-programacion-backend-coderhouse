import { Injectable } from '@nestjs/common';

// This should be a real class/interface representing a user entity
export type User = any;

import { DaoFactory } from '../daos/';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

  usersDao: any;

  constructor() {
    this.usersDao = DaoFactory.getDao('usuarios');
  }

  createHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
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

  async create(user: any): Promise<User | undefined> {

    const user_from_db = await this.usersDao.getByUsername(user.username);
    if (user_from_db) {
       //logger.error(`Username already taken.`);
       //return done(null, false, { message: 'Username already taken.' }); 
      return null;

    }
    const newUser = await this.usersDao.save({ username:user.username, 
                                        password:this.createHash(user.password),
                                        email: user.email,
                                        edad: user.edad,
                                        address: user.address,
                                        phone: user.phone,
                                        alias: user.alias,
                                        avatar: user.avatar,
                                        is_admin: user.is_admin
                                      });
    const createdUser = await this.usersDao.getByUsername(user.username);
    //const newUserCreated = await this.usersDao.create(newUser);
    return createdUser;
  }

}