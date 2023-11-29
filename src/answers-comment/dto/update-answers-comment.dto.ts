import { PartialType } from '@nestjs/mapped-types';
import { CreateAnswersCommentDto } from './create-answers-comment.dto';

export class UpdateAnswersCommentDto extends PartialType(CreateAnswersCommentDto) {
  id: number;
}
