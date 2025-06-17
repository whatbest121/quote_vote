import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { UserDocument } from './user.schema';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) { }
  
  async validateUser(username: string, password: string) {
    const user = await this.usersService.validateUser(username, password);
    
    return user
  }
  async login(user: UserDocument) {
    const payload = { username: user.username, _id: user._id };
    return {
      userData: payload,
      token: this.jwtService.sign(payload),
    };
  }

}
