import {
	Controller,
	Get,
	Body,
	Patch,
	Param,
	Delete,
	UseGuards,
	Query,
} from '@nestjs/common'
import { CommentsService } from './comments.service'

import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'

@Controller('comments')
export class CommentsController {
	constructor(private readonly commentsService: CommentsService) {}

	@Get(':id')
	@UseGuards(JwtAuthGuard)
	findOne(@Param('id') id: string) {
		console.log(id)

		return this.commentsService.findOne(+id)
	}

	@Get('/allCommentsWithPagination/:imageId')
	@UseGuards(JwtAuthGuard)
	findAllWithPagination(
		@Param() param,
		@Query('page') page: number,
		@Query('limit') limit: number,
		@Query('sortBy') sortBy: string = 'id',
		@Query('sortOrder') sortOrder: 'ASC' | 'DESC' = 'DESC',
	) {
		const { imageId } = param
		return this.commentsService.findAllWithPagination(
			+imageId,
			+page,
			+limit,
			sortBy,
			sortOrder,
		)
	}

	// @Patch(':id')
	// update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
	// 	return this.commentsService.update(+id, updateCommentDto)
	// }

	// @Delete(':id')
	// remove(@Param('id') id: string) {
	// 	return this.commentsService.remove(+id)
	// }
}
