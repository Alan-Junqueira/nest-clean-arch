import { UniqueEntityId } from '@/core/entity/unique-entity-id'
import { Optional } from '@/core/types/optional'
import { Comment, ICommentsProps } from './comment'

export interface IQuestionCommentProps extends ICommentsProps {
  questionId: UniqueEntityId
}

export class QuestionComment extends Comment<IQuestionCommentProps> {
  get questionId() {
    return this.props.questionId
  }

  static create(
    props: Optional<IQuestionCommentProps, 'createdAt'>,
    id?: UniqueEntityId,
  ) {
    const questionComment = new QuestionComment(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return questionComment
  }
}
