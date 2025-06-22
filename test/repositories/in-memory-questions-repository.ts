import { DomainEvents } from '@/core/events/domain-events'
import { PaginationParams } from '@/core/share-repo/pagination-params'
import { QuestionAttachmentsRepository } from '@/domain/forum/application/repositories/question-attachments-repository'
import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import { Question } from '@/domain/forum/enterprise/entities/question'

export class InMemoryQuestionsRepository implements QuestionsRepository {
  public questions: Question[] = []

  constructor(
    private questionAttachmentsRepository: QuestionAttachmentsRepository,
  ) {}

  async create(question: Question) {
    this.questions.push(question)

    DomainEvents.dispatchEventsForAggregate(question.id)
  }

  async findBySlug(slug: string) {
    const question = this.questions.find((q) => q.slug.value === slug)

    if (!question) {
      return null
    }

    return question
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

    DomainEvents.dispatchEventsForAggregate(question.id)
  }

  async delete(question: Question) {
    const questionIndex = this.questions.findIndex((q) => q.id === question.id)

    this.questions.splice(questionIndex, 1)

    this.questionAttachmentsRepository.deleteManyByQuestionId(
      question.id.toString(),
    )
  }
}
