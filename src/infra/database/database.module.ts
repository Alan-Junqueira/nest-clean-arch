import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { PrismaAnswerAttachmentsRepository } from './prisma/repositories/prisma-answer-attachments-repository'
import { PrismaAnswerCommentsRepository } from './prisma/repositories/prisma-answer-comments-repository'
import { PrismaAnswersRepository } from './prisma/repositories/prisma-answers-repository'
import { PrismaQuestionAttachmentsRepository } from './prisma/repositories/prisma-question-attachments-repository'
import { PrismaQuestionCommentsRepository } from './prisma/repositories/prisma-question-comments-repository'
import { PrismaQuestionsRepository } from './prisma/repositories/prisma-questions-repository'
import { IQuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import { IStudentsRepository } from '@/domain/forum/application/repositories/students-repository'
import { PrismaStudentsRepository } from './prisma/repositories/prisma-students-repository'
import { IAnswerAttachmentsRepository } from '@/domain/forum/application/repositories/answer-attachments-repository'
import { IAnswerCommentsRepository } from '@/domain/forum/application/repositories/answer-comments-repository'
import { IAnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import { IQuestionAttachmentsRepository } from '@/domain/forum/application/repositories/question-attachments-repository'
import { IQuestionCommentsRepository } from '@/domain/forum/application/repositories/question-comments-repository'

@Module({
  providers: [
    PrismaService,
    {
      provide: IQuestionsRepository,
      useClass: PrismaQuestionsRepository,
    },
    {
      provide: IStudentsRepository,
      useClass: PrismaStudentsRepository,
    },
    {
      provide: IAnswerAttachmentsRepository,
      useClass: PrismaAnswerAttachmentsRepository,
    },
    {
      provide: IAnswerCommentsRepository,
      useClass: PrismaAnswerCommentsRepository,
    },
    {
      provide: IAnswersRepository,
      useClass: PrismaAnswersRepository,
    },
    {
      provide: IQuestionAttachmentsRepository,
      useClass: PrismaQuestionAttachmentsRepository,
    },
    {
      provide: IQuestionCommentsRepository,
      useClass: PrismaQuestionCommentsRepository,
    },
  ],
  exports: [
    PrismaService,
    IQuestionsRepository,
    IStudentsRepository,
    IAnswerAttachmentsRepository,
    IAnswerCommentsRepository,
    IAnswersRepository,
    IQuestionAttachmentsRepository,
    IQuestionCommentsRepository,
  ],
})
export class DatabaseModule {}
