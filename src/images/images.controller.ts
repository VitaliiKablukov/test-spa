import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
} from '@nestjs/common'
import { ImagesService } from './images.service'
import { CreateImageDto } from './dto/create-image.dto'
import { UpdateImageDto } from './dto/update-image.dto'

@Controller('images')
export class ImagesController {
	constructor(private readonly imagesService: ImagesService) {}

	@Post()
	create(@Body() createImageDto: CreateImageDto) {
		return this.imagesService.create(createImageDto)
	}

	@Get()
	findAll() {
		return this.imagesService.findAll()
	}

	@Get(':id')
	findOne(@Param('id') param, id: string) {
		const image = this.imagesService.findOne(param)

		return image
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateImageDto: UpdateImageDto) {
		return this.imagesService.update(+id, updateImageDto)
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.imagesService.remove(+id)
	}
}
