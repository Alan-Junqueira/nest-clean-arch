import { UniqueEntityId } from "@/core/entity/unique-entity-id";
import { Optional } from "@/core/types/optional";
import { Comment, ICommentsProps } from "./comment";

export interface IQuestionCommentsProps extends ICommentsProps {
  questionId: UniqueEntityId;
}

export class QuestionComment extends Comment<IQuestionCommentsProps> {
  get questionId() {
    return this.props.questionId;
  }

  static create(
    props: Optional<IQuestionCommentsProps, "createdAt">,
    id?: UniqueEntityId
  ) {
    const questionComment = new QuestionComment(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id
    );

    return questionComment;
  }
}
