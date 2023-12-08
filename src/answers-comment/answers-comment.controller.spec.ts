import { Test, TestingModule } from '@nestjs/testing'
import { AnswersCommentController } from './AnswersCommentController'

describe('AnswersCommentController', () => {
	let controller: AnswersCommentController

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [AnswersCommentController],
		}).compile()

		controller = module.get<AnswersCommentController>(AnswersCommentController)
	})

	it('should be defined', () => {
		expect(controller).toBeDefined()
	})
})
