import { UniqueEntityId } from "@/core/entity/unique-entity-id";
import { expect } from "vitest";
import { InMemoryAnswerCommentsRepository } from "test/repositories/in-memory-answer-comments-repository";
import { FetchAnswerCommentsUseCase } from "./fetch-answer-comments";
import { makeAnswerComment } from "test/factories/make-answer-comment";

let inMemoryAnswerCommentRepository: InMemoryAnswerCommentsRepository;
let sut: FetchAnswerCommentsUseCase;

describe("Fetch Answer Comment", () => {
  beforeEach(() => {
    inMemoryAnswerCommentRepository = new InMemoryAnswerCommentsRepository();
    sut = new FetchAnswerCommentsUseCase(inMemoryAnswerCommentRepository);
  });

  it("Should be able to fetch answer comment", async () => {
    await inMemoryAnswerCommentRepository.create(
      makeAnswerComment({
        answerId: new UniqueEntityId("answer-1"),
      })
    );
    await inMemoryAnswerCommentRepository.create(
      makeAnswerComment({
        answerId: new UniqueEntityId("answer-1"),
      })
    );
    await inMemoryAnswerCommentRepository.create(
      makeAnswerComment({
        answerId: new UniqueEntityId("answer-1"),
      })
    );

    const result = await sut.execute({
      answerId: "answer-1",
      page: 1,
    });
  
    if (result.isRight()) {
      expect(result.value?.answerComments).toHaveLength(3);
    }
  });

  it("Should be able to fetch paginated answer comment", async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswerCommentRepository.create(
        makeAnswerComment({
          answerId: new UniqueEntityId("answer-1"),
        })
      );
    }

    const result = await sut.execute({
      answerId: "answer-1",
      page: 2,
    });

    if (result.isRight()) {
      expect(result.value?.answerComments).toHaveLength(2);
    }
  });
});
