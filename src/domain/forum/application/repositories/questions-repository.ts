import { IPaginationParams } from '@/core/repositories/pagination-params'
import { Question } from '../../enterprise/entities/question'

export abstract class IQuestionsRepository {
  abstract create(question: Question): Promise<void>
  abstract delete(question: Question): Promise<void>
  abstract findById(id: string): Promise<Question | null>
  abstract findBySlug(slug: string): Promise<Question | null>
  abstract findManyRecent(params: IPaginationParams): Promise<Array<Question>>
  abstract save(question: Question): Promise<void>
}
