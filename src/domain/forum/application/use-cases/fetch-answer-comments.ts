import { Either, left, right } from "@/core/either";
import { AnswerComment } from "../../enterprise/entities/answer-comment";
import { IAnswerCommentsRepository } from "../repositories/answer-comments-repository";
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";

interface IFetchAnswerCommentsRequest {
  page: number;
  answerId: string;
}

type IFetchAnswerCommentsResponse = Either<
  ResourceNotFoundError,
  {
    answerComments: AnswerComment[];
  }
>;

export class FetchAnswerCommentsUseCase {
  constructor(private answerCommentsRepository: IAnswerCommentsRepository) {}

  async execute({
    page,
    answerId,
  }: IFetchAnswerCommentsRequest): Promise<IFetchAnswerCommentsResponse> {
    const answerComments =
      await this.answerCommentsRepository.findManyByAnswerId(answerId, {
        page,
      });

    if (!answerComments) {
      left(new ResourceNotFoundError());
    }

    return right({ answerComments });
  }
}
