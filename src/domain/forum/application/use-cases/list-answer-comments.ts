import { Either, right } from '@/core/either'
import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comments-repository'
import { AnswerComment } from '../../enterprise/entities/answer-comment'

interface ListAnswerCommentsRequest {
  answerId: string
  page: number
}

type ListAnswerCommentsResponse = Either<
  null,
  {
    answerComments: AnswerComment[]
  }
>

export class ListAnswerCommentsUseCase {
  constructor(
    private answerCommentsRepository: InMemoryAnswerCommentsRepository,
  ) {}

  async execute({
    answerId,
    page,
  }: ListAnswerCommentsRequest): Promise<ListAnswerCommentsResponse> {
    const answerComments =
      await this.answerCommentsRepository.findManyByAnswerId(answerId, {
        page,
      })

    return right({
      answerComments,
    })
  }
}
