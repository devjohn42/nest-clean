import { DomainEvents } from '@/core/events/domain-events'
import { PaginationParams } from '@/core/share-repo/pagination-params'
import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import { Question } from '@/domain/forum/enterprise/entities/question'
import { QuestionDetails } from '@/domain/forum/enterprise/entities/value-objects/question-details'
import { InMemoryAttachmentsRepository } from './in-memory-attachments-repository'
import { InMemoryQuestionAttachmentsRepository } from './in-memory-question-attachments-repository'
import { InMemoryStudentsRepository } from './in-memory-students-repository'

export class InMemoryQuestionsRepository implements QuestionsRepository {
  public questions: Question[] = []

  constructor(
    private questionAttachmentsRepository: InMemoryQuestionAttachmentsRepository,
    private attachmentsRepository: InMemoryAttachmentsRepository,
    private studentsRepository: InMemoryStudentsRepository
  ) { }

  async create(question: Question) {
    this.questions.push(question)

    await this.questionAttachmentsRepository.createMany(
      question.attachments.getItems()
    )

    DomainEvents.dispatchEventsForAggregate(question.id)
  }

  async findBySlug(slug: string) {
    const question = this.questions.find((q) => q.slug.value === slug)

    if (!question) {
      return null
    }

    return question
  }

  async findDetailsBySlug(slug: string) {
    const question = this.questions.find((q) => q.slug.value === slug)

    if (!question) {
      return null
    }

    const author = this.studentsRepository.students.find((student) => {
      return student.id.equals(question.authorId)
    })

    if (!author) {
      throw new Error(
        `Author with ID "${question.authorId.toString()}" does not exist`
      )
    }

    const questionAttachments = this.questionAttachmentsRepository.questionsComment.filter((questionAttachment => {
      return questionAttachment.questionId.equals(question.id)
    }))

    const attachments = questionAttachments.map(questionAttachment => {
      const attachment = this.attachmentsRepository.attachments.find((attachment => {
        return attachment.id.equals(questionAttachment.attachmentId)
      }))

      if (!attachment) {
        throw new Error(
          `Attachment with ID "${questionAttachment.attachmentId.toString()}" does not exist`
        )
      }

      return attachment
    })

    return QuestionDetails.create({
      questionId: question.id,
      authorId: question.authorId,
      author: author.name,
      title: question.title,
      slug: question.slug,
      content: question.content,
      bestAnswerId: question.bestAnswerId,
      attachments,
      createdAt: question.createdAt,
      updatedAt: question.updatedAt
    })
  }

  async findById(id: string) {
    const question = this.questions.find((q) => q.id.toString() === id)

    if (!question) {
      return null
    }

    return question
  }

  async findManyRecente({ page }: PaginationParams) {
    const questions = this.questions
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()) // retorno pela data mais recente
      .slice((page - 1) * 20, page * 20)

    return questions
  }

  async save(question: Question) {
    const questionIndex = this.questions.findIndex((q) => q.id === question.id)

    this.questions[questionIndex] = question

    await this.questionAttachmentsRepository.createMany(
      question.attachments.getNewItems()
    )

    await this.questionAttachmentsRepository.deleteMany(
      question.attachments.getRemovedItems()
    )

    DomainEvents.dispatchEventsForAggregate(question.id)
  }

  async delete(question: Question) {
    const questionIndex = this.questions.findIndex((q) => q.id === question.id)

    this.questions.splice(questionIndex, 1)

    await this.questionAttachmentsRepository.deleteManyByQuestionId(
      question.id.toString(),
    )
  }
}
