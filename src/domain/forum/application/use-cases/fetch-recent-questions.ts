import { IQuestionsRepository } from "../repositories/questions-repository";
import { Question } from "../../enterprise/entities/question";
import { Either, left, right } from "@/core/either";
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";

interface IFetchRecentQuestionsRequest {
  page: number;
}

type IFetchRecentQuestionsResponse = Either<
  ResourceNotFoundError,
  {
    questions: Question[];
  }
>;

export class FetchRecentQuestionsUseCase {
  constructor(private questionsRepository: IQuestionsRepository) {}

  async execute({
    page,
  }: IFetchRecentQuestionsRequest): Promise<IFetchRecentQuestionsResponse> {
    const questions = await this.questionsRepository.findManyRecent({ page });

    if (!questions) {
      return left(new ResourceNotFoundError());
    }

    return right({ questions });
  }
}
