import { Injectable } from '@nestjs/common'
import { CreateImageDto } from './dto/create-image.dto'
import { UpdateImageDto } from './dto/update-image.dto'
import { HttpService } from '@nestjs/axios'

import { Image } from './entities/image.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class ImagesService {
	constructor(
		@InjectRepository(Image)
		private readonly imagesRepository: Repository<Image>,
		private readonly httpService: HttpService,
	) {}
	create(createImageDto: CreateImageDto) {
		return 'This action adds a new image'
	}

	async findAll() {
		return await this.imagesRepository.find()
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
