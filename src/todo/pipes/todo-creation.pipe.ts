import { HttpException, Injectable, PipeTransform } from '@nestjs/common';
import { Todo } from '../todo.model';

@Injectable()
export class TodoCreationPipe implements PipeTransform {

  public transform(value: any): Todo {
    if (!value.text || value.text.length < 2) {
      throw new HttpException('Missing text field or too short string', 400);
    }
    if (value.checked !== true && value.checked !== false) {
      throw new HttpException('checked must be a boolean value', 400);
    }
    return {
      text: value.text,
      checked: value.checked,
    };
  }
}
