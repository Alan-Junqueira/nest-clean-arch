import { Either, left, right } from "@/core/either";
import { Question } from "../../enterprise/entities/question";
import { IQuestionsRepository } from "../repositories/questions-repository";
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";
import { NotAllowedError } from "@/core/errors/errors/not-allowed-error";
import { IQuestionAttachmentsRepository } from "../repositories/question-attachments-repository";
import { QuestionAttachmentList } from "../../enterprise/entities/question-attachment-list";
import { UniqueEntityId } from "@/core/entity/unique-entity-id";
import { QuestionAttachment } from "../../enterprise/entities/question-attachment";

interface IEditQuestionUseCaseRequest {
  authorId: string;
  questionId: string;
  title: string;
  content: string;
  attachmentIds: Array<string>;
}

type IEditQuestionUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    question: Question;
  }
>;

export class EditQuestionUseCase {
  constructor(
    private questionsRepository: IQuestionsRepository,
    private questionAttachmentsRepository: IQuestionAttachmentsRepository
  ) {}

  async execute({
    authorId,
    content,
    title,
    questionId,
    attachmentIds,
  }: IEditQuestionUseCaseRequest): Promise<IEditQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId);

    if (!question) {
      return left(new ResourceNotFoundError());
    }

    if (authorId !== question.authorId.toString()) {
      return left(new NotAllowedError());
    }

    const currentQuestionAttachments =
      await this.questionAttachmentsRepository.findManyByQuestionId(questionId);

    const questionAttachmentList = new QuestionAttachmentList(
      currentQuestionAttachments
    );

    const questionAttachments = attachmentIds.map((id) => {
      return QuestionAttachment.create({
        attachmentId: new UniqueEntityId(id),
        questionId: question.id,
      });
    });

    questionAttachmentList.update(questionAttachments);

    question.attachments = questionAttachmentList;
    question.title = title;
    question.content = content;

    await this.questionsRepository.save(question);

    return right({
      question,
    });
  }
}
