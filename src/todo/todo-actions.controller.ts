import { Controller, Put } from '@nestjs/common';
import { TodoService } from './todo.service';

@Controller()
export class TodoActionsController {

  public constructor(private readonly todoService: TodoService) {
  }

  @Put('/check_all_todo')
  public checkAll() {
    return this.todoService.checkAllTodo();
  }

  @Put('/uncheck_all_todo')
  public uncheckAll() {
    return this.todoService.uncheckAllTodo();
  }

}
