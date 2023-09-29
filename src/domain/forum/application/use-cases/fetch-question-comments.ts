import { Either, left, right } from '@/core/either'
import { IQuestionCommentsRepository } from '../repositories/question-comments-repository'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { Injectable } from '@nestjs/common'
import { CommentWithAuthor } from '../../enterprise/entities/value-objects/comment-with-author'

interface IFetchQuestionCommentsRequest {
  page: number
  questionId: string
}

type IFetchQuestionCommentsResponse = Either<
  ResourceNotFoundError,
  {
    comments: CommentWithAuthor[]
  }
>

@Injectable()
export class FetchQuestionCommentsUseCase {
  constructor(
    private questionCommentsRepository: IQuestionCommentsRepository,
  ) {}

  async execute({
    page,
    questionId,
  }: IFetchQuestionCommentsRequest): Promise<IFetchQuestionCommentsResponse> {
    const comments =
      await this.questionCommentsRepository.findManyByQuestionIdWithAuthor(
        questionId,
        {
          page,
        },
      )

    if (!comments) {
      return left(new ResourceNotFoundError())
    }

    return right({ comments })
  }
}
