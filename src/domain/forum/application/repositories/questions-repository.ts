import { IPaginationParams } from '@/core/repositories/pagination-params'
import { Question } from '../../enterprise/entities/question'

export interface IQuestionsRepository {
  create(question: Question): Promise<void>
  delete(question: Question): Promise<void>
  findById(id: string): Promise<Question | null>
  findBySlug(slug: string): Promise<Question | null>
  findManyRecent(params: IPaginationParams): Promise<Array<Question>>
  save(question: Question): Promise<void>
}
