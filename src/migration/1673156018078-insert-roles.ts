import { MigrationInterface, QueryRunner } from 'typeorm';

export class insertRoles1673156018078 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
            CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
            INSERT INTO roles (id,name) VALUES (uuid_generate_v4(),'user');
            INSERT INTO roles (id,name) VALUES (uuid_generate_v4(),'moderator');
            INSERT INTO roles (id,name) VALUES (uuid_generate_v4(),'admin');
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
