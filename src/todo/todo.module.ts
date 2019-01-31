import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoSchema } from './schemas/todo.schema';
import { TodoActionsController } from './todo-actions.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {schema: TodoSchema, name: 'TodoSchema'},
    ]),
  ],
  controllers: [TodoController, TodoActionsController],
  providers: [TodoService],
})
export class TodoModule {
}
