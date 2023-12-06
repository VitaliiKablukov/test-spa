import {
	WebSocketGateway,
	SubscribeMessage,
	MessageBody,
	OnGatewayConnection,
	OnGatewayInit,
	OnGatewayDisconnect,
	WebSocketServer,
} from '@nestjs/websockets'
import { AnswersCommentService } from './answers-comment.service'
import { CreateAnswersCommentDto } from './dto/create-answers-comment.dto'
import { UpdateAnswersCommentDto } from './dto/update-answers-comment.dto'
import { Server, Socket } from 'socket.io'
@WebSocketGateway({ cors: { origin: '*' } })
export class AnswersCommentGateway
	implements OnGatewayConnection, OnGatewayInit, OnGatewayDisconnect
{
	constructor(private readonly answersCommentService: AnswersCommentService) {}

	@WebSocketServer() server: Server
	@SubscribeMessage('createAnswersComment')
	async create(
		@MessageBody() createAnswersCommentDto: CreateAnswersCommentDto,
	) {
		const newComment = await this.answersCommentService.create(
			createAnswersCommentDto,
		)
		if (newComment) {
			this.server.emit('clientComments', newComment)
			return newComment
		}
	}

	@SubscribeMessage('findOneAnswersComment')
	findOne(@MessageBody() id: number) {
		return this.answersCommentService.findOne(id)
	}

	@SubscribeMessage('updateAnswersComment')
	update(@MessageBody() updateAnswersCommentDto: UpdateAnswersCommentDto) {
		return this.answersCommentService.update(
			updateAnswersCommentDto.id,
			updateAnswersCommentDto,
		)
	}

	@SubscribeMessage('removeAnswersComment')
	remove(@MessageBody() id: number) {
		return this.answersCommentService.remove(id)
	}
	afterInit() {}
	handleConnection(client: Socket) {
		console.log(`Connected: ${client.id}`)
	}
	handleDisconnect(client: Socket) {
		console.log(`Disconnected: ${client.id}`)
	}
}
