import { UniqueEntityId } from "@/core/entity/unique-entity-id";
import { IQuestionsRepository } from "../repositories/questions-repository";
import { QuestionComment } from "../../enterprise/entities/question-comment";
import { IQuestionCommentsRepository } from "../repositories/question-comments-repository";
import { Either, left, right } from "@/core/either";
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";

interface ICommentOnQuestionUseCaseRequest {
  authorId: string;
  questionId: string;
  content: string;
}

type ICommentOnQuestionUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    questionComment: QuestionComment;
  }
>;

export class CommentOnQuestionUseCase {
  constructor(
    private questionsRepository: IQuestionsRepository,
    private questionCommentRepository: IQuestionCommentsRepository
  ) {}

  async execute({
    authorId,
    content,
    questionId,
  }: ICommentOnQuestionUseCaseRequest): Promise<ICommentOnQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId);

    if (!question) {
      return left(new ResourceNotFoundError());
    }

    const questionComment = QuestionComment.create({
      authorId: new UniqueEntityId(authorId),
      content,
      questionId: new UniqueEntityId(questionId),
    });

    await this.questionCommentRepository.create(questionComment);

    return right({ questionComment });
  }
}
