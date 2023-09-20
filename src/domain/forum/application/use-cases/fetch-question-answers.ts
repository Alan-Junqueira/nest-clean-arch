import { IAnswersRepository } from '../repositories/answers-repository'
import { Answer } from '../../enterprise/entities/answer'
import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { Injectable } from '@nestjs/common'

interface IFetchQuestionAnswersRequest {
  page: number
  questionId: string
}

type IFetchQuestionAnswersResponse = Either<
  ResourceNotFoundError,
  {
    answers: Answer[]
  }
>

@Injectable()
export class FetchQuestionAnswersUseCase {
  constructor(private answersRepository: IAnswersRepository) {}

  async execute({
    page,
    questionId,
  }: IFetchQuestionAnswersRequest): Promise<IFetchQuestionAnswersResponse> {
    const answers = await this.answersRepository.findManyByQuestionId(
      questionId,
      { page },
    )

    if (!answers) {
      return left(new ResourceNotFoundError())
    }

    return right({ answers })
  }
}
