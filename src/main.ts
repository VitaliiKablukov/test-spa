import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import helmet from 'helmet'
async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	app.use(
		helmet({
			contentSecurityPolicy: {
				directives: {
					defaultSrc: ["'self'"],
					scriptSrc: ["'self'"],
					styleSrc: ["'self'"],
				},
			},
		}),
	)
	app.setGlobalPrefix('api')
	app.enableCors()
	await app.listen(3000)
}
bootstrap()
