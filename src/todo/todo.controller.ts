import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Req } from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from './todo.model';
import { TodoCreationPipe } from './pipes/todo-creation.pipe';
import { Request } from 'express';
import { ApiResponse } from '@nestjs/swagger';

@Controller('/todo')
export class TodoController {

  public constructor(private todoService: TodoService) {
  }

  @Get()
  @ApiResponse({ status: 200, type: [Todo]})
  public getAll(): Promise<Todo[]> {
    return this.todoService.getAll();
  }

  @Get('/:id')
  public findOneById(@Param('id') id: string) {
    return this.todoService.fincOneById(id);
  }

  @Post()
  public createOne(@Body(new TodoCreationPipe()) todo: Todo, @Req() req: Request) {
    return this.todoService.createOne(todo)
      .then(t => {
        req.res.setHeader('location', `/todo/${t._id}`);
        return t;
      });
  }

  @Put('/:id')
  public updateOneById(@Param('id') id: string, @Body(new TodoCreationPipe()) todo: Todo) {
    return this.todoService.updateOne(id, todo);
  }

  @Delete('/:id')
  @HttpCode(204)
  public deleteOneById(@Param('id') id: string) {
    return this.todoService.deleteOneById(id);
  }
}
