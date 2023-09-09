import { IPaginationParams } from "@/core/repositories/pagination-params";
import { Answer } from "../../enterprise/entities/answer";

export interface IAnswersRepository {
  create: (answer: Answer) => Promise<void>;
  delete: (answer: Answer) => Promise<void>;
  findById: (id: string) => Promise<Answer | null>;
  findManyByQuestionId(
    questionId: string,
    params: IPaginationParams
  ): Promise<Answer[]>;
  save: (answer: Answer) => Promise<void>;
}
