import { Injectable } from '@nestjs/common'
import { CreateCommentDto } from './dto/create-comment.dto'
import { UpdateCommentDto } from './dto/update-comment.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Comment } from './entities/comment.entity'

@Injectable()
export class CommentsService {
	constructor(
		@InjectRepository(Comment)
		private readonly commentRepository: Repository<Comment>,
	) {}
	create(createCommentDto: CreateCommentDto) {
		const newComment = {
			text: createCommentDto.text,
			user: { id: +createCommentDto.userId },
			image: { id: +createCommentDto.imageId },
		}
		return this.commentRepository.save(newComment)
	}

	async findAll(imageId: number) {
		const comments = await this.commentRepository.find({
			where: { image: { id: imageId } },
		})

		return comments
	}
	async findAllWithPagination(imageId: number, page: number, limit: number) {
		const comments = await this.commentRepository.find({
			where: { image: { id: imageId } },
		})

		return comments
	}

	findOne(id: number) {
		return `This action returns a #${id} comment`
	}

	update(id: number, updateCommentDto: UpdateCommentDto) {
		return `This action updates a #${id} comment`
	}

	remove(id: number) {
		return `This action removes a #${id} comment`
	}
}
