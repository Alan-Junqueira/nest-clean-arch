import { CurrentUser } from '@/infra/auth/current-user.decorator'
import { TUserPayload } from '@/infra/auth/jwt.strategy'
import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Put,
} from '@nestjs/common'

import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation.pipe'
import { EditQuestionUseCase } from '@/domain/forum/application/use-cases/edit-question'

const editQuestionBodySchema = z.object({
  title: z.string(),
  content: z.string(),
})

const bodyValidationPipe = new ZodValidationPipe(editQuestionBodySchema)

type TEditQuestionBodySchema = z.infer<typeof editQuestionBodySchema>

@Controller('/questions/:id')
export class EditQuestionController {
  constructor(private editQuestion: EditQuestionUseCase) {}

  @Put()
  @HttpCode(HttpStatus.NO_CONTENT)
  async handle(
    @CurrentUser() user: TUserPayload,
    @Body(bodyValidationPipe) body: TEditQuestionBodySchema,
    @Param('id') questionId: string,
  ) {
    const { content, title } = body
    const { sub: userId } = user

    const result = await this.editQuestion.execute({
      title,
      content,
      authorId: userId,
      attachmentIds: [],
      questionId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
