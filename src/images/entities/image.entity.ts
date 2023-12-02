import { Comment } from 'src/comments/entities/comment.entity'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Image {
	@PrimaryGeneratedColumn()
	id: number
	@Column()
	largeImageURL: string
	@Column()
	webformatURL: string
	@Column()
	tags: string

	@OneToMany(() => Comment, (comment) => comment.image, { onDelete: 'CASCADE' })
	comments: Comment[]
}
