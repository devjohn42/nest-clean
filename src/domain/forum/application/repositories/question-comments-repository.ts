import { PaginationParams } from '@/core/share-repo/pagination-params'
import { QuestionComment } from '../../enterprise/entities/question-comment'

export abstract class QuestionCommentsRepository {
  abstract create(questionComment: QuestionComment): Promise<void>
  abstract findById(id: string): Promise<QuestionComment | null>
  abstract findManyByQuestionId(
    quesitonId: string,
    params: PaginationParams,
  ): Promise<QuestionComment[]>

  abstract delete(questionComment: QuestionComment): Promise<void>
}
