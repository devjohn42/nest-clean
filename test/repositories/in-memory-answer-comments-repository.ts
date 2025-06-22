import { PaginationParams } from '@/core/share-repo/pagination-params'
import { AnswerCommentRepository } from '@/domain/forum/application/repositories/answer-comments-repository'
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment'

export class InMemoryAnswerCommentsRepository
  implements AnswerCommentRepository
{
  public answersComment: AnswerComment[] = []

  async create(answerComment: AnswerComment) {
    this.answersComment.push(answerComment)
  }

  async findById(id: string) {
    const answerComment = this.answersComment.find(
      (q) => q.id.toString() === id,
    )

    if (!answerComment) {
      return null
    }

    return answerComment
  }

  async findManyByAnswerId(answerId: string, { page }: PaginationParams) {
    const answerComments = this.answersComment
      .filter((a) => a.answerId.toString() === answerId)
      .slice((page - 1) * 20, page * 20)

    return answerComments
  }

  async delete(answerComment: AnswerComment) {
    const answerCommentIndex = this.answersComment.findIndex(
      (a) => a.id === answerComment.id,
    )

    this.answersComment.splice(answerCommentIndex, 1)
  }
}
