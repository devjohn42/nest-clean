import { AnswerAttachmentsRepository } from '@/domain/forum/application/repositories/answer-attachments-repository'
import { AnswerAttachment } from '@/domain/forum/enterprise/entities/answer-attachment'

export class InMemoryAnswerAttachmentsRepository
  implements AnswerAttachmentsRepository {
  public answersComment: AnswerAttachment[] = []

  async createMany(attachments: AnswerAttachment[]): Promise<void> {
    this.answersComment.push(...attachments)
  }

  async deleteMany(attachments: AnswerAttachment[]): Promise<void> {
    const answerAttachments = this.answersComment.filter((item) => {
      return !attachments.some((attachments) => attachments.equals(item))
    })

    this.answersComment = answerAttachments
  }

  async findManyByAnswerId(answerId: string) {
    const answerComments = this.answersComment.filter(
      (a) => a.answerId.toString() === answerId,
    )

    return answerComments
  }

  async deleteManyByAnswerId(answerId: string): Promise<void> {
    const answerComments = this.answersComment.filter(
      (a) => a.answerId.toString() !== answerId,
    )

    this.answersComment = answerComments
  }
}
