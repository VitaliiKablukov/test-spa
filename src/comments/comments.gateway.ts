import {
	WebSocketGateway,
	SubscribeMessage,
	MessageBody,
	OnGatewayConnection,
	OnGatewayInit,
	OnGatewayDisconnect,
	WebSocketServer,
} from '@nestjs/websockets'
import { CommentsService } from './comments.service'
import { CreateCommentDto } from './dto/create-comment.dto'
import { UpdateCommentDto } from './dto/update-comment.dto'
import { Server, Socket } from 'socket.io'

@WebSocketGateway({ cors: { origin: '*' } })
export class CommentsGateway
	implements OnGatewayConnection, OnGatewayInit, OnGatewayDisconnect
{
	constructor(private readonly commentsService: CommentsService) {}

	@WebSocketServer() server: Server
	@SubscribeMessage('createComment')
	async create(@MessageBody() createCommentDto: CreateCommentDto) {
		const newComment = await this.commentsService.create(createCommentDto)
		if (newComment) {
			this.server.emit('clientComments', newComment)
			return newComment
		}
	}

	// @SubscribeMessage('findAllComments')
	// findAllById() {
	// 	return null
	// }

	// @SubscribeMessage('findOneComment')
	// findOne(@MessageBody() id: number) {
	// 	return this.commentsService.findOne(id)
	// }

	// @SubscribeMessage('updateComment')
	// update(@MessageBody() updateCommentDto: UpdateCommentDto) {
	// 	return this.commentsService.update(updateCommentDto.id, updateCommentDto)
	// }

	// @SubscribeMessage('removeComment')
	// remove(@MessageBody() id: number) {
	// 	return this.commentsService.remove(id)
	// }
	afterInit() {}
	handleConnection(client: Socket) {
		console.log(`Connected: ${client.id}`)
	}
	handleDisconnect(client: Socket) {
		console.log(`Disconnected: ${client.id}`)
	}
}
