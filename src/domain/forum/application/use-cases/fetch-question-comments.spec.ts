import { UniqueEntityId } from "@/core/entity/unique-entity-id";
import { expect } from "vitest";
import { InMemoryQuestionCommentsRepository } from "test/repositories/in-memory-question-comments-repository";
import { FetchQuestionCommentsUseCase } from "./fetch-question-comments";
import { makeQuestionComment } from "test/factories/make-question-comment";

let inMemoryQuestionCommentRepository: InMemoryQuestionCommentsRepository;
let sut: FetchQuestionCommentsUseCase;

describe("Fetch Question Comment", () => {
  beforeEach(() => {
    inMemoryQuestionCommentRepository =
      new InMemoryQuestionCommentsRepository();
    sut = new FetchQuestionCommentsUseCase(inMemoryQuestionCommentRepository);
  });

  it("Should be able to fetch question comment", async () => {
    await inMemoryQuestionCommentRepository.create(
      makeQuestionComment({
        questionId: new UniqueEntityId("question-1"),
      })
    );
    await inMemoryQuestionCommentRepository.create(
      makeQuestionComment({
        questionId: new UniqueEntityId("question-1"),
      })
    );
    await inMemoryQuestionCommentRepository.create(
      makeQuestionComment({
        questionId: new UniqueEntityId("question-1"),
      })
    );

    const result = await sut.execute({
      questionId: "question-1",
      page: 1,
    });

    if (result.isRight()) {
      expect(result.value?.questionComments).toHaveLength(3);
    }
  });

  it("Should be able to fetch paginated question comment", async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryQuestionCommentRepository.create(
        makeQuestionComment({
          questionId: new UniqueEntityId("question-1"),
        })
      );
    }

    const result = await sut.execute({
      questionId: "question-1",
      page: 2,
    });
    if (result.isRight()) {
      expect(result.value?.questionComments).toHaveLength(2);
    }
  });
});
