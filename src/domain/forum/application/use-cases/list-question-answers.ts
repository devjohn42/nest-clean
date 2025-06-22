import { Either, right } from '@/core/either'
import { Answer } from '../../enterprise/entities/answer'
import { AnswersRepository } from '../repositories/answers-repository'

interface ListQuestionAnswersRequest {
  questionId: string
  page: number
}

type ListQuestionAnswersResponse = Either<
  null,
  {
    answers: Answer[]
  }
>

export class ListQuestionAnswersUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    questionId,
    page,
  }: ListQuestionAnswersRequest): Promise<ListQuestionAnswersResponse> {
    const answers = await this.answersRepository.findManyByAnswerId(
      questionId,
      { page },
    )

    return right({
      answers,
    })
  }
}
