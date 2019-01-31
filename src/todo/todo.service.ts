import { HttpException, Injectable } from '@nestjs/common';
import { TodoSchema } from './schemas/todo.schema';
import { Model } from 'mongoose';
import { TodoDocument } from './schemas/todo.document';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectID } from 'bson';
import { Todo } from './todo.model';
import { from, Observable, pipe } from 'rxjs';
import { flatMap, reduce } from 'rxjs/operators';

@Injectable()
export class TodoService {

  public constructor(@InjectModel('TodoSchema') private todoSchema: Model<TodoDocument>) {
  }

  public getAll(): Promise<TodoDocument[]> {
    return this.todoSchema.find().exec();
  }

  public fincOneById(id: string): Promise<TodoDocument> {
    if (ObjectID.isValid(id)) {
      return this.todoSchema.findById(id).exec()
        .then(todo => {
          if (todo) {
            return todo;
          }
          throw new HttpException('Todo not found', 404);
        });
    }
    throw new HttpException('Todo not found', 404);
  }

  public createOne(todo: Todo): Promise<TodoDocument> {
    const createdTodo = new this.todoSchema(todo);
    return createdTodo.save();
  }

  public updateOne(id: string, updatedTodo: Todo): Promise<TodoDocument> {
    if (ObjectID.isValid(id)) {
      return this.todoSchema.updateOne({_id: id}, updatedTodo).exec()
        .then(() => this.fincOneById(id));
    }
    throw new HttpException('Todo not found', 404);
  }

  public deleteOneById(id: string): Promise<void> {
    return this.fincOneById(id)
      .then(todo => todo.remove())
      .then(() => null);
  }

  public checkAllTodo(): Observable<TodoDocument[]> {
    return from(this.getAll())
      .pipe(
        this.toggleAllTodo(true),
      );
  }

  public uncheckAllTodo() {
    return from(this.getAll())
      .pipe(
        this.toggleAllTodo(false),
      );
  }

  private toggleAllTodo(check: boolean) {
      return pipe(
          flatMap((todos: TodoDocument[]) => from(todos)),
          flatMap(todo => this.updateOne(todo._id, { ...todo.toObject(), checked: check })),
          reduce((acc: TodoDocument[], curr: TodoDocument) => [...acc, curr], []),
      );
  }

}
