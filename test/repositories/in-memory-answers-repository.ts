import { DomainEvents } from "@/core/events/domain-events";
import { IPaginationParams } from "@/core/repositories/pagination-params";
import { IAnswerAttachmentsRepository } from "@/domain/forum/application/repositories/answer-attachments-repository";
import { IAnswersRepository } from "@/domain/forum/application/repositories/answers-repository";
import { Answer } from "@/domain/forum/enterprise/entities/answer";

export class InMemoryAnswersRepository implements IAnswersRepository {
  public items: Answer[] = [];
  constructor(
    private answerAttachmentsRepository: IAnswerAttachmentsRepository
  ) {}

  async create(answer: Answer) {
    this.items.push(answer);

    DomainEvents.dispatchEventsForAggregate(answer.id);
  }

  async delete(answer: Answer): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === answer.id);

    this.items.splice(itemIndex, 1);
    this.answerAttachmentsRepository.deleteManyByAnswerId(answer.id.toString());

    DomainEvents.dispatchEventsForAggregate(answer.id);
  }

  async findById(id: string): Promise<Answer | null> {
    const answer = this.items.find((item) => item.id.toString() === id);

    if (!answer) {
      return null;
    }

    return answer;
  }

  async findManyByQuestionId(
    questionId: string,
    { page }: IPaginationParams
  ): Promise<Answer[]> {
    const answers = this.items
      .filter((item) => item.questionId.toString() === questionId)
      .slice((page - 1) * 20, page * 20);

    return answers;
  }

  async save(answer: Answer): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === answer.id);

    this.items.splice(itemIndex, 1, answer);
  }
}
