import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import * as dotenv from 'dotenv';
import { User } from 'src/auth/entities/user.entity';
import { Todo } from 'src/todo/entities/todo.entity';
dotenv.config();

class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach((k) => this.getValue(k, true));
    return this;
  }

  public getPort() {
    return this.getValue('PORT', true);
  }

  public isProduction() {
    const mode = this.getValue('MODE', false);
    return mode != 'DEV';
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',

      host: this.getValue('PG_HOST'),
      port: parseInt(this.getValue('PG_PORT')),
      username: this.getValue('PG_USERNAME'),
      password: this.getValue('PG_PASSWORD'),
      database: this.getValue('PG_DATABASE'),
      // ssl: true,
      extra: {
        // ssl: {
        //   rejectUnauthorized: false,
        // },
      },
      // ssl: {
      // ca: fs.readFileSync(
      //   path.join(__dirname, '../../credentials/ca-certificate.cer'),
      // ),
      //   rejectUnauthorized: false,
      // },

      entities: [Todo, User],

      // migrationsTableName: 'migration',

      // migrations: ['src/migration/*.ts'],

      // cli: {
      //   migrationsDir: 'src/migration',
      // },

      // ssl: this.isProduction(),
      // synchronize: Boolean(this.getValue('SYNCHRONIZE')),
      synchronize: true,
    };
  }
}

const configService = new ConfigService(process.env).ensureValues([
  'PG_HOST',
  'PG_PORT',
  'PG_USERNAME',
  'PG_PASSWORD',
  'PG_DATABASE',
  'SYNCHRONIZE',
]);

export { configService };
