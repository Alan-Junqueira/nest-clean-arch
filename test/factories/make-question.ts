import { faker } from '@faker-js/faker'

import { UniqueEntityId } from "@/core/entity/unique-entity-id";
import { IQuestionProps, Question } from "@/domain/forum/enterprise/entities/question";
import { Slug } from "@/domain/forum/enterprise/entities/value-objects/slug";

export function makeQuestion(
  override: Partial<IQuestionProps> = {},
  id?: UniqueEntityId,
) {
  const question = Question.create({
    authorId: new UniqueEntityId(),
    title: faker.lorem.sentence(),
    slug: Slug.create('example-question'),
    content: faker.lorem.text(),
    ...override
  }, id)

  return question
}