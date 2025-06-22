import { DomainEvents } from '@/core/events/domain-events'
import { PaginationParams } from '@/core/share-repo/pagination-params'
import { AnswerAttachmentsRepository } from '@/domain/forum/application/repositories/answer-attachments-repository'
import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import { Answer } from '@/domain/forum/enterprise/entities/answer'

export class InMemoryAnswersRepository implements AnswersRepository {
  public answers: Answer[] = []

  constructor(
    private answerAttachmentsRepository: AnswerAttachmentsRepository,
  ) {}

  async create(answer: Answer) {
    this.answers.push(answer)

    DomainEvents.dispatchEventsForAggregate(answer.id)
  }

  async findById(id: string) {
    const answer = this.answers.find((a) => a.id.toString() === id)

    if (!answer) {
      return null
    }

    return answer
  }

  async findManyByAnswerId(answerId: string, { page }: PaginationParams) {
    const answers = this.answers
      .filter((a) => a.questionId.toString() === answerId) // retorno pela data mais recente
      .slice((page - 1) * 20, page * 20)

    return answers
  }

  async save(answer: Answer) {
    const answerIndex = this.answers.findIndex((a) => a.id === answer.id)

    this.answers[answerIndex] = answer

    DomainEvents.dispatchEventsForAggregate(answer.id)
  }

  async delete(answer: Answer) {
    const answerIndex = this.answers.findIndex((a) => a.id === answer.id)

    this.answers.splice(answerIndex, 1)

    this.answerAttachmentsRepository.deleteManyByAnswerId(answer.id.toString())
  }
}
