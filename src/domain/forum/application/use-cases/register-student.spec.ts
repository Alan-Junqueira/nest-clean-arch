import { RegisterStudentUseCase } from './register-students'
import { InMemoryStudentsRepository } from 'test/repositories/in-memory-students-repository'
import { FakeHasher } from 'test/cryptography/fake-hasher'

let inMemoryStudentsRepository: InMemoryStudentsRepository
let fakeHasher: FakeHasher
let sut: RegisterStudentUseCase

describe('Create Student', () => {
  beforeEach(() => {
    inMemoryStudentsRepository = new InMemoryStudentsRepository()
    fakeHasher = new FakeHasher()
    sut = new RegisterStudentUseCase(inMemoryStudentsRepository, fakeHasher)
  })

  it('Should be able to register a new student', async () => {
    const result = await sut.execute({
      name: 'Jhon Doe',
      email: 'jhondoe@example.com',
      password: '123456',
    })

    expect(result.isRight()).toBeTruthy()
    expect(result.value).toEqual({
      student: inMemoryStudentsRepository.items.at(0),
    })
  })

  it('Should hash student password upon registration', async () => {
    const result = await sut.execute({
      name: 'Jhon Doe',
      email: 'jhondoe@example.com',
      password: '123456',
    })

    const hashedPassword = await fakeHasher.hash('123456')

    expect(result.isRight()).toBeTruthy()
    expect(inMemoryStudentsRepository.items.at(0)?.password).toEqual(
      hashedPassword,
    )
  })
})
