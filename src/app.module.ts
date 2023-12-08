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
				host: configService.get('POSTGRES_HOST'),
				port: configService.get('POSTGRESS_PORT'),
				username: configService.get('POSTGRES_USER'),
				password: configService.get('POSTGRESS_PASSWORD'),
				database: configService.get('POSTGRES_DB'),
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
