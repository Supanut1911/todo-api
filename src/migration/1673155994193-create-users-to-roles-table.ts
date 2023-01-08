import { MigrationInterface, QueryRunner } from 'typeorm';

export class createUsersToRolesTable1673155994193
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            create table users_to_roles (
                user_id uuid references users (id),
                role_id uuid references roles (id)
            );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    drop table users_to_roles;`);
  }
}
