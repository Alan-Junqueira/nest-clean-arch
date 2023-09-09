import { UniqueEntityId } from "@/core/entity/unique-entity-id";
import { Question } from "../../enterprise/entities/question";
import { IQuestionsRepository } from "../repositories/questions-repository";
import { Either, right } from "@/core/either";
import { QuestionAttachment } from "../../enterprise/entities/question-attachment";
import { QuestionAttachmentList } from "../../enterprise/entities/question-attachment-list";

interface ICreateQuestionUseCaseRequest {
  authorId: string;
  title: string;
  content: string;
  attachmentIds: Array<string>;
}

type ICreateQuestionUseCaseResponse = Either<
  null,
  {
    question: Question;
  }
>;

export class CreateQuestionUseCase {
  constructor(private questionsRepository: IQuestionsRepository) {}

  async execute({
    authorId,
    content,
    title,
    attachmentIds,
  }: ICreateQuestionUseCaseRequest): Promise<ICreateQuestionUseCaseResponse> {
    const question = Question.create({
      authorId: new UniqueEntityId(authorId),
      title,
      content,
    });

    const questionAttachments = attachmentIds.map((id) => {
      return QuestionAttachment.create({
        attachmentId: new UniqueEntityId(id),
        questionId: question.id,
      });
    });

    question.attachments = new QuestionAttachmentList(questionAttachments);

    await this.questionsRepository.create(question);

    return right({ question });
  }
}
