import { Either, left, right } from "@/core/either";
import { Answer } from "../../enterprise/entities/answer";
import { IAnswersRepository } from "../repositories/answers-repository";
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";
import { NotAllowedError } from "@/core/errors/errors/not-allowed-error";
import { AnswerAttachmentList } from "../../enterprise/entities/answer-attachment-list";
import { UniqueEntityId } from "@/core/entity/unique-entity-id";
import { IAnswerAttachmentsRepository } from "../repositories/answer-attachments-repository";
import { AnswerAttachment } from "../../enterprise/entities/answer-attachment";

interface IEditAnswerUseCaseRequest {
  authorId: string;
  answerId: string;
  content: string;
  attachmentIds: Array<string>;
}

type IEditAnswerUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    answer: Answer;
  }
>;

export class EditAnswerUseCase {
  constructor(
    private answersRepository: IAnswersRepository,
    private answerAttachmentsRepository: IAnswerAttachmentsRepository
  ) {}

  async execute({
    authorId,
    content,
    answerId,
    attachmentIds,
  }: IEditAnswerUseCaseRequest): Promise<IEditAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId);

    if (!answer) {
      return left(new ResourceNotFoundError());
    }

    if (authorId !== answer.authorId.toString()) {
      return left(new NotAllowedError());
    }

    const currentAnswerAttachments =
      await this.answerAttachmentsRepository.findManyByAnswerId(answerId);

    const answerAttachmentList = new AnswerAttachmentList(
      currentAnswerAttachments
    );

    const answerAttachments = attachmentIds.map((id) => {
      return AnswerAttachment.create({
        attachmentId: new UniqueEntityId(id),
        answerId: answer.id,
      });
    });

    answerAttachmentList.update(answerAttachments);

    answer.attachments = answerAttachmentList;

    answer.content = content;

    await this.answersRepository.save(answer);

    return right({
      answer,
    });
  }
}
