import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserModule } from './user/user.module'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CommentsModule } from './comments/comments.module'
import { AnswersCommentModule } from './answers-comment/answers-comment.module'
import { AuthModule } from './auth/auth.module'
import { ImagesModule } from './images/images.module'

import { CloudinaryService } from './cloudinary/cloudinary.service'
import cloudinaryConfig from './cloudinary/cloudinary.config'

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			load: [cloudinaryConfig],
		}),
		ConfigModule.forRoot({ isGlobal: true }),
		CommentsModule,
		UserModule,
		AnswersCommentModule,
		AuthModule,
		ImagesModule,
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: (configService: ConfigService) => ({
				type: 'postgres',
				host: configService.get('DB_HOST'),
				port: configService.get('DB_PORT'),
				username: configService.get('DB_USERNAME'),
				password: configService.get('DB_PASSWORD'),
				database: configService.get('DB_NAME'),
				synchronize: true,
				entities: [__dirname + '/**/*.entity{.js, .ts}'],
			}),

			inject: [ConfigService],
		}),
		CommentsModule,
		AnswersCommentModule,
		AuthModule,
		ImagesModule,
	],
	controllers: [AppController],
	providers: [AppService, CloudinaryService],
})
export class AppModule {}
