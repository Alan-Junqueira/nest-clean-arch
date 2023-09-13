import { CurrentUser } from '@/infra/auth/current-user.decorator'
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard'
import { TUserPayload } from '@/infra/auth/jwt.strategy'
import { PrismaService } from '@/infra/prisma/prisma.service'
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common'

import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation.pipe'

const createQuestionBodySchema = z.object({
  title: z.string(),
  content: z.string(),
})

const bodyValidationPipe = new ZodValidationPipe(createQuestionBodySchema)

type TCreateQuestionBodySchema = z.infer<typeof createQuestionBodySchema>

@Controller('/questions')
@UseGuards(JwtAuthGuard)
export class CreateQuestionController {
  constructor(private prisma: PrismaService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async handle(
    @CurrentUser() user: TUserPayload,
    @Body(bodyValidationPipe) body: TCreateQuestionBodySchema,
  ) {
    const { content, title } = body
    const { sub: userId } = user

    const slug = this.convertToSlug(title)

    await this.prisma.question.create({
      data: {
        content,
        title,
        slug,
        authorId: userId,
      },
    })
  }

  private convertToSlug(title: string) {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
  }
}
