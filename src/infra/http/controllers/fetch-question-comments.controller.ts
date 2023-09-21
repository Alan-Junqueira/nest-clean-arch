import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Query,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation.pipe'
import { FetchQuestionCommentsUseCase } from '@/domain/forum/application/use-cases/fetch-question-comments'
import { CommentPresenter } from '../presenters/comment.presenter'

const pageQueryParamSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1))

const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema)

type TPageQueryParamSchema = z.infer<typeof pageQueryParamSchema>

@Controller('/questions/:questionId/comments')
export class FetchQuestionCommentsController {
  constructor(private fetchResentQuestions: FetchQuestionCommentsUseCase) {}

  @Get()
  async handle(
    @Query('page', queryValidationPipe) page: TPageQueryParamSchema,
    @Param('questionId') questionId: string,
  ) {
    const result = await this.fetchResentQuestions.execute({ page, questionId })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    const { questionComments } = result.value

    return { questionComments: questionComments.map(CommentPresenter.toHTTP) }
  }
}
