import {
  Body,
  Controller,
  HttpCode,
  Post,
  UsePipes,
  HttpStatus,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation.pipe'
import { RegisterStudentUseCase } from '@/domain/forum/application/use-cases/register-students'

const createAccountBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
})

type TCreateAccountBodySchema = z.infer<typeof createAccountBodySchema>

@Controller('/accounts')
export class CreateAccountController {
  constructor(private registerStudent: RegisterStudentUseCase) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ZodValidationPipe(createAccountBodySchema))
  async handle(@Body() body: TCreateAccountBodySchema) {
    const { name, email, password } = body

    const result = await this.registerStudent.execute({
      email,
      name,
      password,
    })

    if (result.isLeft()) {
      throw new Error()
    }
  }
}
