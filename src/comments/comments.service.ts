import { Injectable } from '@nestjs/common'
import { CreateCommentDto } from './dto/create-comment.dto'
import { UpdateCommentDto } from './dto/update-comment.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Comment } from './entities/comment.entity'
import * as sanitizeHtml from 'sanitize-html'
import { escape } from 'lodash'
import { CloudinaryService } from 'src/cloudinary/cloudinary.service'

@Injectable()
export class CommentsService {
	constructor(
		@InjectRepository(Comment)
		private readonly commentRepository: Repository<Comment>,
		private readonly cloudinaryService: CloudinaryService,
	) {}
	async create(createCommentDto: CreateCommentDto) {
		const sanitizedText = sanitizeHtml(createCommentDto.text, {
			allowedTags: ['a', 'code', 'i', 'strong'],
		})
		console.log(createCommentDto)

		if (createCommentDto.file) {
			try {
				const previewNew =
					'data:image/png;base64,' + createCommentDto.file.toString()
				const cloudinaryImg = await this.cloudinaryService.upload(previewNew)
				createCommentDto.file = cloudinaryImg.url
			} catch (error) {
				console.log(error.message)
			}
		}

		const newComment = {
			text: escape(sanitizedText),
			user: { id: +createCommentDto.userId },
			image: { id: +createCommentDto.imageId },
			file: createCommentDto.file.toString(),
		}

		const comment = await this.commentRepository.save(newComment)

		return this.commentRepository.findOne({
			where: { id: comment.id },
			relations: ['user'],
		})
	}

	async findAll(imageId: number) {
		const comments = await this.commentRepository.find({
			where: { image: { id: imageId } },
		})

		return comments
	}
	async findAllWithPagination(
		imageId: number,
		page: number,
		limit: number,
		sortBy: string = 'id',
		sortOrder: 'ASC' | 'DESC' = 'DESC',
	) {
		const [comments, total] = await this.commentRepository.findAndCount({
			where: { image: { id: imageId } },
			take: limit,
			skip: (page - 1) * limit,
			order: { [sortBy]: sortOrder },
			relations: ['user', 'image'],
		})

		return { comments, total }
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
