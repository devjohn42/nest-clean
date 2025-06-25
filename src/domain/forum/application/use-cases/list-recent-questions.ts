import { Either, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
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

@Injectable()
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
