import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable } from 'rxjs';
import { Roles } from 'src/user/entities/roles.entity';
import { Repository } from 'typeorm';
import { Users } from '../entities/user.entity';
import { ROLES_KEY } from '../role.decorator';
import { ERole } from '../role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @InjectRepository(Users)
    private readonly UserRepo: Repository<Users>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requireRoles = this.reflector.getAllAndOverride<ERole[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requireRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    const foundUser = await this.UserRepo.createQueryBuilder('user')
      .where(`user.username = :username`, { username: user.username })
      .leftJoinAndSelect(`user.roles`, `roles`)
      .getOne();

    return requireRoles.some((role) =>
      foundUser.roles?.some((r) => r.name == role),
    );
  }
}
