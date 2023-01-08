import { MigrationInterface, QueryRunner } from 'typeorm';

export class createRolesTable1673155965646 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    create table roles (
        id uuid primary key not null DEFAULT uuid_generate_v4(),
        name text not null unique
        );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        drop table roles;
    `);
  }
}
