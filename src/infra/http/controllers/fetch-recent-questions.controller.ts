import { BadRequestException, Controller, Get, Query } from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation.pipe'
import { FetchRecentQuestionsUseCase } from '@/domain/forum/application/use-cases/fetch-recent-questions'
import { QuestionPresenter } from '../presenters/question-presenter'

const pageQueryParamSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1))

const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema)

type TPageQueryParamSchema = z.infer<typeof pageQueryParamSchema>

@Controller('/questions')
export class FetchRecentQuestionsController {
  constructor(private fetchResentQuestions: FetchRecentQuestionsUseCase) {}

  @Get()
  async handle(
    @Query('page', queryValidationPipe) page: TPageQueryParamSchema,
  ) {
    const result = await this.fetchResentQuestions.execute({ page })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    const { questions } = result.value

    return { questions: questions.map(QuestionPresenter.toHTTP) }
  }
}
