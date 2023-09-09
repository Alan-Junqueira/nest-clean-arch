import { IPaginationParams } from "@/core/repositories/pagination-params";
import { QuestionComment } from "../../enterprise/entities/question-comment";

export interface IQuestionCommentsRepository {
  create(question: QuestionComment): Promise<void>;
  delete(question: QuestionComment): Promise<void>;
  findById(id: String): Promise<QuestionComment | null>;
  findManyByQuestionId(
    questionId: string,
    params: IPaginationParams
  ): Promise<QuestionComment[]>;
}
