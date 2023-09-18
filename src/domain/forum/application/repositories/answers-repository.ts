import { IPaginationParams } from '@/core/repositories/pagination-params'
import { Answer } from '../../enterprise/entities/answer'

export abstract class IAnswersRepository {
  abstract create(answer: Answer): Promise<void>
  abstract delete(answer: Answer): Promise<void>
  abstract findById(id: string): Promise<Answer | null>
  abstract findManyByQuestionId(
    questionId: string,
    params: IPaginationParams,
  ): Promise<Answer[]>

  abstract save(answer: Answer): Promise<void>
}
