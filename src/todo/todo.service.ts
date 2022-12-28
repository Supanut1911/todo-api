import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ITodo } from 'types/todo';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepo: Repository<Todo>,
  ) {}

  async getTodos(): Promise<ITodo[]> {
    try {
      const todos = await this.todoRepo.find();
      return todos;
    } catch (error) {
      throw new BadRequestException(`Cannot fetch todos error:${error}`);
    }
  }

  async getTodoById(id: string): Promise<ITodo> {
    try {
      const todo = await this.todoRepo
        .createQueryBuilder('todo')
        .where('todo.id = :id', { id })
        .getOne();
      if (!todo) {
        throw new NotFoundException('Not found todo');
      }
      return todo;
    } catch (error) {
      throw new BadRequestException(`Cant fetch todo by id error:${error}`);
    }
  }

  async addTodo(name: string, desc: string) {
    const todo = await this.todoRepo.create();
    todo.name = name;
    todo.desc = desc;

    try {
      const todoCreated = await this.todoRepo.save(todo);
      return todoCreated;
    } catch (error) {
      throw new BadRequestException(`Create todo fail error: ${error}`);
    }
  }

  async completeTodo(id: string) {
    try {
      const todoFound = await this.todoRepo
        .createQueryBuilder('todo')
        .where(`todo.id = :id`, { id })
        .getOne();

      if (!todoFound) {
        throw new NotFoundException(`not found to id:${id}`);
      }
      todoFound.completed = true;
      const updateTodo = await this.todoRepo.save(todoFound);
      return updateTodo;
      // return {
      //   message: `update todo ${todoFound.name} to complete successfully`,
      // };
    } catch (error) {
      throw new BadRequestException('update complete todo fail');
    }
  }

  async deleteTodobyId(id: string) {
    await this.todoRepo.delete(id);
  }

  async editTodoById(id: string, name: string, description: string) {
    try {
      const todoFound = await this.getTodoById(id);
      todoFound.name = name;
      todoFound.desc = description;
      await this.todoRepo.save(todoFound);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
