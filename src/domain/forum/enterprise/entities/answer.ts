import { UniqueEntityId } from '@/core/entity/unique-entity-id'
import { Optional } from '@/core/types/optional'
import { AnswerAttachmentList } from './answer-attachment-list'
import { AggregateRoot } from '@/core/entity/aggregate-root'
import { AnswerCreatedEvent } from '../events/answer-created-event'

export interface IAnswerProps {
  authorId: UniqueEntityId
  questionId: UniqueEntityId
  content: string
  attachments: AnswerAttachmentList
  createdAt: Date
  updatedAt?: Date
}

export class Answer extends AggregateRoot<IAnswerProps> {
  get authorId() {
    return this.props.authorId
  }

  get questionId() {
    return this.props.questionId
  }

  get content() {
    return this.props.content
  }

  set content(content: string) {
    this.props.content = content
    this.touch()
  }

  get attachments() {
    return this.props.attachments
  }

  set attachments(attachments: AnswerAttachmentList) {
    this.props.attachments = attachments
    this.touch()
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  get excerpt() {
    return this.content.substring(0, 120).trimEnd().concat('...')
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  static create(
    props: Optional<IAnswerProps, 'createdAt' | 'attachments'>,
    id?: UniqueEntityId,
  ) {
    const answer = new Answer(
      {
        ...props,
        attachments: props.attachments ?? new AnswerAttachmentList(),
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    const isNewAnswer = !id
    if (isNewAnswer) {
      answer.addDomainEvent(new AnswerCreatedEvent(answer))
    }

    return answer
  }
}