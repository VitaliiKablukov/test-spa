import {
	Controller,
	Get,
	Body,
	Patch,
	Param,
	Delete,
	UseGuards,
} from '@nestjs/common'
import { CommentsService } from './comments.service'

import { UpdateCommentDto } from './dto/update-comment.dto'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'

@Controller('comments')
export class CommentsController {
	constructor(private readonly commentsService: CommentsService) {}

	@Get(':id')
	@UseGuards(JwtAuthGuard)
	findAll(@Param('id') id: string) {
		console.log(id)

		return this.commentsService.findAll(+id)
	}

	@Get('/allCommentsWithPagination')
	@UseGuards(JwtAuthGuard)
	findAllWithPagination(@Param() param) {
		const { page, limit, imageId } = param
		return this.commentsService.findAllWithPagination(+imageId, +page, +limit)
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
		return this.commentsService.update(+id, updateCommentDto)
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.commentsService.remove(+id)
	}
}
