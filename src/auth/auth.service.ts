import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { Users } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepo: Repository<Users>,

    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string) {
    const user = await this.userRepo
      .createQueryBuilder('user')
      .where(`user.username = :username`, { username })
      .getOne();

    if (user) {
      const isMatch = await bcrypt.compare(pass, user.password);
      if (!isMatch) {
        return null;
      }
      const { password, ...result } = user;
      return result;
    }
    return null;

    // if (user && user.password === password) {
    //   const { password, ...result } = user;
    //   return result;
    // }
    // return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  async signUp(username: string, password: string) {
    const user = await this.userRepo.findOne({ where: { username } });
    if (user) {
      throw new HttpException('Username taken', 400);
    }
    const saltOrRounds = 1;
    const hash = await bcrypt.hash(password, saltOrRounds);
    const newUser = await this.userService.create(username, hash);
    return newUser;
  }
}
