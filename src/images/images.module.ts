import { Module } from '@nestjs/common'
import { ImagesService } from './images.service'
import { ImagesController } from './images.controller'
import { HttpModule } from '@nestjs/axios'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Image } from './entities/image.entity'
import { CacheModule } from '@nestjs/cache-manager'
import { ConfigService } from '@nestjs/config'

import * as redisStore from 'cache-manager-redis-store'
import { RedisClientOptions } from 'redis'

@Module({
	imports: [
		HttpModule,
		TypeOrmModule.forFeature([Image]),
		CacheModule.registerAsync({
			useFactory: (configService: ConfigService) => {
				const redisConfig: RedisClientOptions = {
					host: configService.get('DB_HOST'),
					port: +configService.get('REDIS_PORT'),
				}

				return {
					store: redisStore.create(redisConfig),
					...redisConfig,
					ttl: 86400,
					max: 1000,
				}
			},
			inject: [ConfigService],
		}),
	],
	controllers: [ImagesController],
	providers: [ImagesService],
})
export class ImagesModule {}
