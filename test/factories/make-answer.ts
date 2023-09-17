import { faker } from '@faker-js/faker'

import { UniqueEntityId } from '@/core/entity/unique-entity-id'
import { Answer, IAnswerProps } from '@/domain/forum/enterprise/entities/answer'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { PrismaAnswerMapper } from '@/infra/database/prisma/mappers/prisma-answer-mapper'

export function makeAnswer(
  override: Partial<IAnswerProps> = {},
  id?: UniqueEntityId,
) {
  const answer = Answer.create(
    {
      authorId: new UniqueEntityId(),
      questionId: new UniqueEntityId(),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  )

  return answer
}

@Injectable()
export class AnswerFactory {
  constructor(private prisma: PrismaService) {}
  async makePrismaAnswer(data: Partial<IAnswerProps> = {}): Promise<Answer> {
    const answer = makeAnswer(data)

    await this.prisma.answer.create({
      data: PrismaAnswerMapper.toPrisma(answer),
    })

    return answer
  }
}
