import { UniqueEntityId } from '@/core/entity/unique-entity-id'
import { Optional } from '@/core/types/optional'
import { Comment, ICommentsProps } from './comment'

export interface IAnswerCommentProps extends ICommentsProps {
  answerId: UniqueEntityId
}

export class AnswerComment extends Comment<IAnswerCommentProps> {
  get answerId() {
    return this.props.answerId
  }

  static create(
    props: Optional<IAnswerCommentProps, 'createdAt'>,
    id?: UniqueEntityId,
  ) {
    const answerComment = new AnswerComment(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return answerComment
  }
}
