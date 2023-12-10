import { Inject, Injectable } from '@nestjs/common'

import { CreateImageDto } from './dto/create-image.dto'
import { UpdateImageDto } from './dto/update-image.dto'
import { Image } from './entities/image.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { Cache } from 'cache-manager'
@Injectable()
export class ImagesService {
	constructor(
		@InjectRepository(Image)
		private readonly imagesRepository: Repository<Image>,
		@Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
	) {}
	async create(createImageDto: CreateImageDto) {
		return await this.imagesRepository.save(createImageDto)
	}
	async clearCache() {
		await this.cacheManager.reset()
	}

	async findAll(): Promise<Image[]> {
		const cacheKey = 'allImages'

		const cachedImages = await this.cacheManager.get<Image[]>(cacheKey)

		if (cachedImages) {
			return cachedImages
		}

		const allImages = await this.imagesRepository.find()

		await this.cacheManager.set(cacheKey, allImages, { ttl: 86400 })

		return allImages
	}

	async findOne(id: number) {
		return await this.imagesRepository.find({ where: { id } })
	}

	update(id: number, updateImageDto: UpdateImageDto) {
		return `This action updates a #${id} image`
	}

	remove(id: number) {
		return `This action removes a #${id} image`
	}
}
