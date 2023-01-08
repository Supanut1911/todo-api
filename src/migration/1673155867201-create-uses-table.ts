import { MigrationInterface, QueryRunner } from 'typeorm';

export class createUsesTable1673155867201 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
            create table users (
                id uuid primary key not null DEFAULT uuid_generate_v4(),
                username text not null,
                password text
            );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        drop table users.;
    `);
  }
}
