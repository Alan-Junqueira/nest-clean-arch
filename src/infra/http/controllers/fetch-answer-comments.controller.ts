import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Query,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation.pipe'
import { FetchAnswerCommentsUseCase } from '@/domain/forum/application/use-cases/fetch-answer-comments'
import { CommentWithAuthorPresenter } from '../presenters/comment-with-author-presenter'

const pageQueryParamSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1))

const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema)

type TPageQueryParamSchema = z.infer<typeof pageQueryParamSchema>

@Controller('/answers/:answerId/comments')
export class FetchAnswerCommentsController {
  constructor(private fetchResentQuestions: FetchAnswerCommentsUseCase) {}

  @Get()
  async handle(
    @Query('page', queryValidationPipe) page: TPageQueryParamSchema,
    @Param('answerId') answerId: string,
  ) {
    const result = await this.fetchResentQuestions.execute({ page, answerId })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    const { comments } = result.value

    return { comments: comments.map(CommentWithAuthorPresenter.toHTTP) }
  }
}
