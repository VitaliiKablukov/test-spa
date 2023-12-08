import { AnswersComment } from 'src/answers-comment/entities/answers-comment.entity'
import { Image } from 'src/images/entities/image.entity'
import { User } from 'src/user/entities/user.entity'
import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm'

@Entity()
export class Comment {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	text: string

	@Column({ default: '' })
	file?: string

	@ManyToOne(() => User, (user) => user.comments)
	@JoinColumn({ name: 'user_id' })
	user: User

	@ManyToOne(() => Image, (image) => image.comments)
	@JoinColumn({ name: 'image_id' })
	image: Image

	@OneToMany(() => AnswersComment, (answersComment) => answersComment.user, {
		onDelete: 'CASCADE',
	})
	answerComments: AnswersComment[]

	@CreateDateColumn()
	createdAt: Date

	@CreateDateColumn()
	updatedAt: Date
}
