import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import e, { Request } from 'express';
import { ITodo } from 'types/todo';
import { AddtodoDto } from './dto/addtodoDto';
import { EditTodoDto } from './dto/editTodoDto';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  async getTodos(): Promise<ITodo[]> {
    return await this.todoService.getTodos();
  }

  @Get('/:id')
  async getTodoById(@Param('id') id: string): Promise<ITodo> {
    return await this.todoService.getTodoById(id);
  }

  @Put('test')
  async postTest() {
    return 'post test';
  }

  @Post()
  async addTodo(@Body() addTodoDto: AddtodoDto) {
    const { name, desc } = addTodoDto;
    return await this.todoService.addTodo(name, desc);
  }

  @Patch('/:id')
  async completeTodo(@Param('id') id: string) {
    return await this.todoService.completeTodo(id);
  }

  @Delete('/:id')
  async deleteTodobyId(@Param('id') id: string) {
    return await this.todoService.deleteTodobyId(id);
  }

  @Put('/:id')
  async editTodoById(
    @Param('id') id: string,
    @Body() editTodoDto: EditTodoDto,
  ) {
    const { name, description } = editTodoDto;
    return await this.todoService.editTodoById(id, name, description);
  }
}
