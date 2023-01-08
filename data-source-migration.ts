import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.PG_HOST || 'localhost',
  port: +process.env.PG_PORT || 5432,
  username: process.env.PG_USERNAME || `postgres`,
  password: process.env.PG_PASSWORD || `postgres`,
  database: process.env.PG_DATABASE || 'todo',
  synchronize: false,
  logging: false,
  migrations: ['./src/migration/*.ts'],
  subscribers: [],
});
