import { PaginationParams } from '@/core/share-repo/pagination-params'
import { AnswerCommentsRepository } from '@/domain/forum/application/repositories/answer-comments-repository'
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment'
import { CommentWithAuthor } from '@/domain/forum/enterprise/entities/value-objects/comment-with-author'
import { InMemoryStudentsRepository } from './in-memory-students-repository'

export class InMemoryAnswerCommentsRepository
  implements AnswerCommentsRepository {
  public answersComment: AnswerComment[] = []

  constructor(
    private studentsRepository: InMemoryStudentsRepository
  ) { }

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

  async findManyByAnswerIdWithAuthor(answerId: string, { page }: PaginationParams) {
    const answerComments = this.answersComment
      .filter((q) => q.answerId.toString() === answerId)
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

    return answerComments
  }

  async delete(answerComment: AnswerComment) {
    const answerCommentIndex = this.answersComment.findIndex(
      (a) => a.id === answerComment.id,
    )

    this.answersComment.splice(answerCommentIndex, 1)
  }
}
