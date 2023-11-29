import { Injectable } from '@nestjs/common';
import { CreateAnswersCommentDto } from './dto/create-answers-comment.dto';
import { UpdateAnswersCommentDto } from './dto/update-answers-comment.dto';

@Injectable()
export class AnswersCommentService {
  create(createAnswersCommentDto: CreateAnswersCommentDto) {
    return 'This action adds a new answersComment';
  }

  findAll() {
    return `This action returns all answersComment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} answersComment`;
  }

  update(id: number, updateAnswersCommentDto: UpdateAnswersCommentDto) {
    return `This action updates a #${id} answersComment`;
  }

  remove(id: number) {
    return `This action removes a #${id} answersComment`;
  }
}
