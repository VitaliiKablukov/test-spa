import { Test, TestingModule } from '@nestjs/testing';
import { AnswersCommentService } from './answers-comment.service';

describe('AnswersCommentService', () => {
  let service: AnswersCommentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnswersCommentService],
    }).compile();

    service = module.get<AnswersCommentService>(AnswersCommentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
