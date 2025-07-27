import { PaginationParams } from '@/core/share-repo/pagination-params'
import { QuestionCommentsRepository } from '@/domain/forum/application/repositories/question-comments-repository'
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment'
import { CommentWithAuthor } from '@/domain/forum/enterprise/entities/value-objects/comment-with-author'
import { InMemoryStudentsRepository } from './in-memory-students-repository'

export class InMemoryQuestionCommentsRepository
  implements QuestionCommentsRepository {
  public questionsComment: QuestionComment[] = []

  constructor(
    private studentsRepository: InMemoryStudentsRepository
  ) { }

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

  async findManyByQuestionIdWithAuthor(questionId: string, { page }: PaginationParams) {
    const questionComments = this.questionsComment
      .filter((q) => q.questionId.toString() === questionId)
      .slice((page - 1) * 20, page * 20)
      .map(comment => {
        const author = this.studentsRepository.students.find(student => {
          return student.id.equals(comment.authorId)
        })

        if (!author) throw new Error(`Author with ID "${comment.authorId.toString()}" does not exist.`)

        return CommentWithAuthor.create({
          commentId: comment.id,
          content: comment.content,
          createdAt: comment.createdAt,
          updatedAt: comment.updatedAt,
          authorId: comment.authorId,
          author: author.name

        })
      })

    return questionComments
  }

  async delete(questionComment: QuestionComment) {
    const questionCommentIndex = this.questionsComment.findIndex(
      (q) => q.id === questionComment.id,
    )

    this.questionsComment.splice(questionCommentIndex, 1)
  }
}
