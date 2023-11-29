import { AnswersComment } from 'src/answers-comment/entities/answers-comment.entity';
import { Comment } from 'src/comments/entities/comment.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Comment, (comment) => comment.user, { onDelete: 'CASCADE' })
  comments: Comment[];

  @OneToMany(() => AnswersComment, (answerComments) => answerComments.user, {
    onDelete: 'CASCADE',
  })
  answersComments: AnswersComment[];

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;

  @Column({ default: true })
  isActive: boolean;
}
