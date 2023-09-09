import { faker } from "@faker-js/faker";

import { UniqueEntityId } from "@/core/entity/unique-entity-id";
import {
  IAnswerCommentsProps,
  AnswerComment,
} from "@/domain/forum/enterprise/entities/answer-comment";

export function makeAnswerComment(
  override: Partial<IAnswerCommentsProps> = {},
  id?: UniqueEntityId
) {
  const answerComment = AnswerComment.create(
    {
      authorId: new UniqueEntityId(),
      answerId: new UniqueEntityId(),
      content: faker.lorem.text(),
      ...override,
    },
    id
  );

  return answerComment;
}
