import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from 'src/auth/user.schema';


@Injectable()
export class UsersService {
  constructor(
  @InjectModel(User.name)
  private userModel: Model<User>) { }

  async findByUsername(username: string) {
    const result = this.userModel.findOne({ username }).lean()

    return result
  }

  async create(username: string, password: string) {
    const hashed = await bcrypt.hash(password, 10);
    const result = await this.userModel.create({ username, password: hashed });
    return result
  }

  async validateUser(username: string, password: string) {
    const user = await this.findByUsername(username);
    if (!user) throw new Error("User Not Found.")
    if (! await bcrypt.compare(password, user.password)) throw new Error("password invalid.")
    return user;
  }
}
