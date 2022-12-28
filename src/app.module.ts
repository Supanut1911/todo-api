import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { configService } from './config/config-service';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    TodoModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
