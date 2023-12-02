import { Module } from '@nestjs/common'
import { ImagesService } from './images.service'
import { ImagesController } from './images.controller'
import { HttpModule } from '@nestjs/axios'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Image } from './entities/image.entity'

@Module({
	imports: [HttpModule, TypeOrmModule.forFeature([Image])],
	controllers: [ImagesController],
	providers: [ImagesService],
})
export class ImagesModule {}
