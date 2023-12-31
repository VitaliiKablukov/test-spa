import { Module } from '@nestjs/common'
import { CommentsService } from './comments.service'
import { CommentsGateway } from './comments.gateway'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Comment } from './entities/comment.entity'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { CommentsController } from './comments.controller'
import { CloudinaryService } from 'src/cloudinary/cloudinary.service'

@Module({
	imports: [TypeOrmModule.forFeature([Comment])],

	providers: [CommentsGateway, CommentsService, CloudinaryService],
	exports: [TypeOrmModule],
	controllers: [CommentsController],
})
export class CommentsModule {}
