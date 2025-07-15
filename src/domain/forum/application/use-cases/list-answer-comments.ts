import { Either, right } from '@/core/either'
import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comments-repository'
import { AnswerComment } from '../../enterprise/entities/answer-comment'

interface FetchAnswerCommentsRequest {
  answerId: string
  page: number
}

type FetchAnswerCommentsResponse = Either<
  null,
  {
    answerComments: AnswerComment[]
  }
>

export class FetchAnswerCommentsUseCase {
  constructor(
    private answerCommentsRepository: InMemoryAnswerCommentsRepository,
  ) { }

  async execute({
    answerId,
    page,
  }: FetchAnswerCommentsRequest): Promise<FetchAnswerCommentsResponse> {
    const answerComments =
      await this.answerCommentsRepository.findManyByAnswerId(answerId, {
        page,
      })

    return right({
      answerComments,
    })
  }
}
