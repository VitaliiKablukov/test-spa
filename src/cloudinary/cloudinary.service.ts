import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import * as cloudinary from 'cloudinary'

@Injectable()
export class CloudinaryService {
	constructor(private readonly configService: ConfigService) {
		this.configureCloudinary()
	}

	private configureCloudinary() {
		cloudinary.v2.config({
			cloud_name: this.configService.get('cloudinary.cloudName'),
			api_key: this.configService.get('cloudinary.apiKey'),
			api_secret: this.configService.get('cloudinary.apiSecret'),
		})
	}

	async upload(fileString: string): Promise<any> {
		const uploadedImage = await cloudinary.v2.uploader.upload(fileString, {
			folder: 'img',
		})
		return uploadedImage
	}
}
