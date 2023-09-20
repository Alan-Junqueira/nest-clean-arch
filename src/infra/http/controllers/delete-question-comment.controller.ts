import { DeleteQuestionCommentUseCase } from '@/domain/forum/application/use-cases/delete-question-comment'
import { CurrentUser } from '@/infra/auth/current-user.decorator'
import { TUserPayload } from '@/infra/auth/jwt.strategy'
import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
} from '@nestjs/common'

@Controller('/questions/comments/:id')
export class DeleteQuestionCommentController {
  constructor(private deleteQuestionComment: DeleteQuestionCommentUseCase) {}

  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  async handle(
    @CurrentUser() user: TUserPayload,
    @Param('id') questionCommentId: string,
  ) {
    const { sub: userId } = user

    const result = await this.deleteQuestionComment.execute({
      authorId: userId,
      questionCommentId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
