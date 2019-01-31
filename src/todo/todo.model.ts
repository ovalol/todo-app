import { ApiModelProperty } from '@nestjs/swagger';

export class Todo {

  @ApiModelProperty()
  public readonly _id?: string;

  @ApiModelProperty()
  public readonly text: string;

  @ApiModelProperty()
  public readonly checked: boolean;

  @ApiModelProperty()
  public readonly createdAt?: string;

  @ApiModelProperty()
  public readonly updatedAt?: string;
}
