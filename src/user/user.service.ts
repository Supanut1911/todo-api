import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/auth/entities/user.entity';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { Roles } from './entities/roles.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,

    @InjectRepository(Roles)
    private roleRepository: Repository<Roles>,
  ) {}

  async findOne(username: string): Promise<Users | undefined> {
    const user = await this.userRepository.findOne({
      where: { username },
      relations: { roles: true },
    });
    return user;
  }

  async getProfile(username: string): Promise<UserDto | undefined> {
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user) {
      return undefined;
    }
    const userDto = new UserDto();
    userDto.id = user.id;
    userDto.username = user.username;
    return userDto;
  }

  async create(username: string, password: string): Promise<Users | undefined> {
    const user = new Users();
    user.username = username;
    user.password = password;
    const role = new Roles();
    role.id = `d48e5a5a-0c0d-4418-97bc-7641ebe91a47`;
    user.roles = [role];
    await this.userRepository.save(user);
    return user;
  }
}
