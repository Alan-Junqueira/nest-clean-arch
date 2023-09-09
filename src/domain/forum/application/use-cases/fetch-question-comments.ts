import { Either, left, right } from "@/core/either";
import { QuestionComment } from "../../enterprise/entities/question-comment";
import { IQuestionCommentsRepository } from "../repositories/question-comments-repository";
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";

interface IFetchQuestionCommentsRequest {
  page: number;
  questionId: string;
}

type IFetchQuestionCommentsResponse = Either<
  ResourceNotFoundError,
  {
    questionComments: QuestionComment[];
  }
>;

export class FetchQuestionCommentsUseCase {
  constructor(
    private questionCommentsRepository: IQuestionCommentsRepository
  ) {}

  async execute({
    page,
    questionId,
  }: IFetchQuestionCommentsRequest): Promise<IFetchQuestionCommentsResponse> {
    const questionComments =
      await this.questionCommentsRepository.findManyByQuestionId(questionId, {
        page,
      });

    if (!questionComments) {
      return left(new ResourceNotFoundError());
    }

    return right({ questionComments });
  }
}
