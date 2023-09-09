import { faker } from '@faker-js/faker'

import { UniqueEntityId } from "@/core/entity/unique-entity-id";
import { Answer, IAnswerProps } from '@/domain/forum/enterprise/entities/answer';

export function makeAnswer(
  override: Partial<IAnswerProps> = {},
  id?: UniqueEntityId,
) {
  const answer = Answer.create({
    authorId: new UniqueEntityId(),
    questionId: new UniqueEntityId(),
    content: faker.lorem.text(),
    ...override
  }, id)

  return answer
}