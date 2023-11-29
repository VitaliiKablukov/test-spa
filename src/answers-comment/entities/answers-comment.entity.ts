import { Comment } from 'src/comments/entities/comment.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class AnswersComment {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  text: string;

  @ManyToOne(() => User, (user) => user.answersComments)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Comment, (comment) => comment.answerComments)
  @JoinColumn({ name: 'comment_id' })
  comment: Comment;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;
}
