import { QuestionAttachmentsRepository } from '@/domain/forum/application/repositories/question-attachments-repository'
import { QuestionAttachment } from '@/domain/forum/enterprise/entities/question-attachment'

export class InMemoryQuestionAttachmentsRepository
  implements QuestionAttachmentsRepository {

  public questionsComment: QuestionAttachment[] = []
  async createMany(attachments: QuestionAttachment[]): Promise<void> {
    this.questionsComment.push(...attachments)
  }

  async deleteMany(attachments: QuestionAttachment[]): Promise<void> {
    const questionAttachments = this.questionsComment.filter((item) => {
      return !attachments.some((attachments) => attachments.equals(item))
    })

    this.questionsComment = questionAttachments
  }

  async findManyByQuestionId(questionId: string) {
    const questionComments = this.questionsComment.filter(
      (q) => q.questionId.toString() === questionId,
    )

    return questionComments
  }

  async deleteManyByQuestionId(questionId: string): Promise<void> {
    const questionComments = this.questionsComment.filter(
      (q) => q.questionId.toString() !== questionId,
    )

    this.questionsComment = questionComments
  }
}
