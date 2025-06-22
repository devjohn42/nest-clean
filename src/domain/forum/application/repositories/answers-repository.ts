import { PaginationParams } from '@/core/share-repo/pagination-params'
import { Answer } from '../../enterprise/entities/answer'

export interface AnswersRepository {
  create(answer: Answer): Promise<void>
  findById(id: string): Promise<Answer | null>
  findManyByAnswerId(
    answerId: string,
    params: PaginationParams,
  ): Promise<Answer[]>
  save(answer: Answer): Promise<void>
  delete(answer: Answer): Promise<void>
}
