import { WebSocketGateway, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { AnswersCommentService } from './answers-comment.service';
import { CreateAnswersCommentDto } from './dto/create-answers-comment.dto';
import { UpdateAnswersCommentDto } from './dto/update-answers-comment.dto';

@WebSocketGateway()
export class AnswersCommentGateway {
  constructor(private readonly answersCommentService: AnswersCommentService) {}

  @SubscribeMessage('createAnswersComment')
  create(@MessageBody() createAnswersCommentDto: CreateAnswersCommentDto) {
    return this.answersCommentService.create(createAnswersCommentDto);
  }

  @SubscribeMessage('findAllAnswersComment')
  findAll() {
    return this.answersCommentService.findAll();
  }

  @SubscribeMessage('findOneAnswersComment')
  findOne(@MessageBody() id: number) {
    return this.answersCommentService.findOne(id);
  }

  @SubscribeMessage('updateAnswersComment')
  update(@MessageBody() updateAnswersCommentDto: UpdateAnswersCommentDto) {
    return this.answersCommentService.update(updateAnswersCommentDto.id, updateAnswersCommentDto);
  }

  @SubscribeMessage('removeAnswersComment')
  remove(@MessageBody() id: number) {
    return this.answersCommentService.remove(id);
  }
}
