import { faker } from '@faker-js/faker'

import { UniqueEntityId } from '@/core/entity/unique-entity-id'
import {
  IStudentProps,
  Student,
} from '@/domain/forum/enterprise/entities/student'

export function makeStudent(
  override: Partial<IStudentProps> = {},
  id?: UniqueEntityId,
) {
  const student = Student.create(
    {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      ...override,
    },
    id,
  )

  return student
}
