import { Injectable } from '@nestjs/common'
import { CreateAnswersCommentDto } from './dto/create-answers-comment.dto'
import { UpdateAnswersCommentDto } from './dto/update-answers-comment.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { AnswersComment } from './entities/answers-comment.entity'
import { Repository } from 'typeorm'
import * as sanitizeHtml from 'sanitize-html'
import { escape } from 'lodash'
@Injectable()
export class AnswersCommentService {
	constructor(
		@InjectRepository(AnswersComment)
		private readonly answersCommentRepository: Repository<AnswersComment>,
	) {}
	async create(createAnswersCommentDto: CreateAnswersCommentDto) {
		const sanitizedText = sanitizeHtml(createAnswersCommentDto.text, {
			allowedTags: ['a', 'code', 'i', 'strong'],
		})
		const newComment = {
			text: escape(sanitizedText),
			user: { id: +createAnswersCommentDto.userId },
			comment: { id: +createAnswersCommentDto.commentId },
		}
		const comment = await this.answersCommentRepository.save(newComment)

		return this.answersCommentRepository.findOne({
			where: { id: comment.id },
			relations: ['user'],
		})
	}

	async findAll(commentId: number) {
		const comments = await this.answersCommentRepository.find({
			where: { comment: { id: commentId } },
		})

		return comments
	}
	async findAllWithPagination(
		commentId: number,
		page: number,
		limit: number,
		sortBy: string = 'id',
		sortOrder: 'ASC' | 'DESC' = 'DESC',
	) {
		const [comments, total] = await this.answersCommentRepository.findAndCount({
			where: { comment: { id: commentId } },
			take: limit,
			skip: (page - 1) * limit,
			order: { [sortBy]: sortOrder },
			relations: ['user', 'comment'],
		})

		return { comments, total }
	}

	findOne(id: number) {
		return `This action returns a #${id} answersComment`
	}

	update(id: number, updateAnswersCommentDto: UpdateAnswersCommentDto) {
		return `This action updates a #${id} answersComment`
	}

	remove(id: number) {
		return `This action removes a #${id} answersComment`
	}
}
