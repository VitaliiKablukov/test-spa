import { Injectable } from '@nestjs/common'
import { CreateAnswersCommentDto } from './dto/create-answers-comment.dto'
import { UpdateAnswersCommentDto } from './dto/update-answers-comment.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { AnswersComment } from './entities/answers-comment.entity'
import { Repository } from 'typeorm'
import * as sanitizeHtml from 'sanitize-html'
import { escape } from 'lodash'
import { CloudinaryService } from 'src/cloudinary/cloudinary.service'
@Injectable()
export class AnswersCommentService {
	constructor(
		@InjectRepository(AnswersComment)
		private readonly answersCommentRepository: Repository<AnswersComment>,
		private readonly cloudinaryService: CloudinaryService,
	) {}
	async create(createAnswersCommentDto: CreateAnswersCommentDto) {
		const sanitizedText = sanitizeHtml(createAnswersCommentDto.text, {
			allowedTags: ['a', 'code', 'i', 'strong'],
		})
		if (createAnswersCommentDto.file) {
			try {
				const previewNew =
					'data:image/png;base64,' + createAnswersCommentDto.file.toString()
				const cloudinaryImg = await this.cloudinaryService.upload(previewNew)
				createAnswersCommentDto.file = cloudinaryImg.url
			} catch (error) {
				console.log(error.message)
			}
		}
		const newComment = {
			text: escape(sanitizedText),
			user: { id: +createAnswersCommentDto.userId },
			comment: { id: +createAnswersCommentDto.commentId },
			file: createAnswersCommentDto.file.toString(),
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
