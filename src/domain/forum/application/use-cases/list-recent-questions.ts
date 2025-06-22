import { Either, right } from '@/core/either'
import { Question } from '../../enterprise/entities/question'
import { QuestionsRepository } from '../repositories/questions-repository'

interface ListRecentQuestionsRequest {
  page: number
}

type ListRecentQuestionsResponse = Either<
  null,
  {
    questions: Question[]
  }
>

export class ListRecentQuestionsUseCase {
  constructor(private questionRepository: QuestionsRepository) {}

  async execute({
    page,
  }: ListRecentQuestionsRequest): Promise<ListRecentQuestionsResponse> {
    const questions = await this.questionRepository.findManyRecente({ page })

    return right({
      questions,
    })
  }
}
