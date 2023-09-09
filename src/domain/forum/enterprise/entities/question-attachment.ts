import { Entity } from "@/core/entity/entity";
import { UniqueEntityId } from "@/core/entity/unique-entity-id";

export interface IQuestionAttachmentProps {
  questionId: UniqueEntityId;
  attachmentId: UniqueEntityId;
}

export class QuestionAttachment extends Entity<IQuestionAttachmentProps> {
  get questionId() {
    return this.props.questionId;
  }

  get attachmentId() {
    return this.props.attachmentId;
  }

  static create(props: IQuestionAttachmentProps, id?: UniqueEntityId) {
    const attachment = new QuestionAttachment(props, id);

    return attachment;
  }
}
