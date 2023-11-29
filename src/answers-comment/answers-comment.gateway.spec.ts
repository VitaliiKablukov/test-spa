import { Test, TestingModule } from '@nestjs/testing';
import { AnswersCommentGateway } from './answers-comment.gateway';
import { AnswersCommentService } from './answers-comment.service';

describe('AnswersCommentGateway', () => {
  let gateway: AnswersCommentGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnswersCommentGateway, AnswersCommentService],
    }).compile();

    gateway = module.get<AnswersCommentGateway>(AnswersCommentGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
