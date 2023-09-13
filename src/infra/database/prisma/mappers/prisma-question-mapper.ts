import { UniqueEntityId } from '@/core/entity/unique-entity-id'
import { Question } from '@/domain/forum/enterprise/entities/question'
import { Slug } from '@/domain/forum/enterprise/entities/value-objects/slug'
import { Prisma, Question as PrismaQuestion } from '@prisma/client'

export class PrismaQuestionMapper {
  static toDomain(raw: PrismaQuestion): Question {
    return Question.create(
      {
        title: raw.title,
        content: raw.content,
        authorId: new UniqueEntityId(raw.authorId),
        bestAnswerId: raw.bestAnswerId
          ? new UniqueEntityId(raw.bestAnswerId)
          : null,
        slug: Slug.create(raw.slug),
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityId(raw.id),
    )
  }

  static toPrisma(question: Question): Prisma.QuestionUncheckedCreateInput {
    return {
      id: question.id.toString(),
      authorId: question.authorId.toString(),
      ...(!!question.bestAnswerId && {
        bestAnswerId: question.bestAnswerId.toString(),
      }),
      title: question.title,
      content: question.content,
      slug: question.slug.value,
      ...(!!question.createdAt && { createdAt: question.createdAt }),
      ...(!!question.updatedAt && { updatedAt: question.updatedAt }),
    }
  }
}
