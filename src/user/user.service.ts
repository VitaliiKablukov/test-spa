import { BadRequestException, Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './entities/user.entity'
import { Repository } from 'typeorm'
import * as argon2 from 'argon2'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User)
		private readonly usersRepository: Repository<User>,
		private readonly jwtService: JwtService,
	) {}
	async create(createUserDto: CreateUserDto) {
		const existUser = await this.usersRepository.findOne({
			where: { email: createUserDto.email },
		})
		if (existUser) throw new BadRequestException('This email already exist')
		const user = await this.usersRepository.save({
			email: createUserDto.email,
			password: await argon2.hash(createUserDto.password),
			avatar: createUserDto.avatar && '',
		})
		const token = this.jwtService.sign({ email: createUserDto.email })

		return { user, token }
	}

	async findOne(email: string) {
		const existUser = this.usersRepository.findOne({ where: { email } })
		return existUser
	}
	findOneById(id: number) {
		return `This action returns a #${id} user`
	}

	update(id: number, updateUserDto: UpdateUserDto) {
		return `This action updates a #${id} user`
	}

	remove(id: number) {
		return `This action removes a #${id} user`
	}
}
