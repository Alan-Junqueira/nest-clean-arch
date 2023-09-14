import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard'
import { Controller, Get, Query, UseGuards } from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation.pipe'
import { FetchRecentQuestionsUseCase } from '@/domain/forum/application/use-cases/fetch-recent-questions'

const pageQueryParamSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1))

const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema)

type TPageQueryParamSchema = z.infer<typeof pageQueryParamSchema>

@Controller('/questions')
@UseGuards(JwtAuthGuard)
export class FetchRecentQuestionsController {
  constructor(private fetchResentQuestions: FetchRecentQuestionsUseCase) {}

  @Get()
  async handle(
    @Query('page', queryValidationPipe) page: TPageQueryParamSchema,
  ) {
    const questions = await this.fetchResentQuestions.execute({ page })

    return { questions }
  }
}
