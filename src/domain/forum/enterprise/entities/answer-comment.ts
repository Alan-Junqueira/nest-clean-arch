import { UniqueEntityId } from "@/core/entity/unique-entity-id";
import { Optional } from "@/core/types/optional";
import { Comment, ICommentsProps } from "./comment";

export interface IAnswerCommentsProps extends ICommentsProps {
  answerId: UniqueEntityId;
}

export class AnswerComment extends Comment<IAnswerCommentsProps> {
  get answerId() {
    return this.props.answerId;
  }

  static create(
    props: Optional<IAnswerCommentsProps, "createdAt">,
    id?: UniqueEntityId
  ) {
    const answerComment = new AnswerComment(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id
    );

    return answerComment;
  }
}
