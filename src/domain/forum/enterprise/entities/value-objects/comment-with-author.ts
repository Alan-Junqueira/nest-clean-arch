import { UniqueEntityId } from '@/core/entity/unique-entity-id'
import { ValueObject } from '@/core/entity/value-object'

export interface ICommentWithAuthorProps {
  commentId: UniqueEntityId
  content: string
  authorId: UniqueEntityId
  author: string
  createdAt: Date
  updatedAt?: Date | null
}

export class CommentWithAuthor extends ValueObject<ICommentWithAuthorProps> {
  get commentId() {
    return this.props.commentId
  }

  get content() {
    return this.props.content
  }

  get authorId() {
    return this.props.authorId
  }

  get author() {
    return this.props.author
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  static create(props: ICommentWithAuthorProps) {
    return new CommentWithAuthor(props)
  }
}
