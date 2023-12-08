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

import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { AnswersCommentService } from './answers-comment.service'

@Controller('answers-comments')
export class AnswersCommentController {
	constructor(private readonly answersCommentsService: AnswersCommentService) {}

	@Get(':id')
	@UseGuards(JwtAuthGuard)
	findAll(@Param('id') id: string) {
		console.log(id)

		return this.answersCommentsService.findAll(+id)
	}

	@Get('/allCommentsWithPagination/:id')
	@UseGuards(JwtAuthGuard)
	findAllWithPagination(
		@Param('id') imageId: number,
		@Query('page') page: number = 1,
		@Query('limit') limit: number = 25,
		@Query('sortBy') sortBy: string = 'id',
		@Query('sortOrder') sortOrder: 'ASC' | 'DESC' = 'DESC',
	) {
		return this.answersCommentsService.findAllWithPagination(
			+imageId,
			+page,
			+limit,
			sortBy,
			sortOrder,
		)
	}

	// @Patch(':id')
	// update(
	// 	@Param('id') id: string,
	// 	@Body() updateAnswersCommentDto: UpdateAnswersCommentDto,
	// ): string {
	// 	return this.answersCommentsService.update(+id, updateAnswersCommentDto)
	// }

	// @Delete(':id')
	// remove(@Param('id') id: string) {
	// 	return this.answersCommentsService.remove(+id)
	// }
}
