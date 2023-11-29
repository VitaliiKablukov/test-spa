import { Module } from '@nestjs/common';
import { AnswersCommentService } from './answers-comment.service';
import { AnswersCommentGateway } from './answers-comment.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnswersComment } from './entities/answers-comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AnswersComment])],
  providers: [AnswersCommentGateway, AnswersCommentService],
  exports: [TypeOrmModule],
})
export class AnswersCommentModule {}
