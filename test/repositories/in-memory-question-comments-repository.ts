import { PaginationParams } from '@/core/share-repo/pagination-params'
import { QuestionCommentsRepository } from '@/domain/forum/application/repositories/question-comments-repository'
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment'

export class InMemoryQuestionCommentsRepository
  implements QuestionCommentsRepository
{
  public questionsComment: QuestionComment[] = []

  async create(questionComment: QuestionComment) {
    this.questionsComment.push(questionComment)
  }

  async findById(id: string) {
    const questionComment = this.questionsComment.find(
      (q) => q.id.toString() === id,
    )

    if (!questionComment) {
      return null
    }

    return questionComment
  }

  async findManyByQuestionId(questionId: string, { page }: PaginationParams) {
    const questionComments = this.questionsComment
      .filter((q) => q.questionId.toString() === questionId)
      .slice((page - 1) * 20, page * 20)

    return questionComments
  }

  async delete(questionComment: QuestionComment) {
    const questionCommentIndex = this.questionsComment.findIndex(
      (q) => q.id === questionComment.id,
    )

    this.questionsComment.splice(questionCommentIndex, 1)
  }
}
