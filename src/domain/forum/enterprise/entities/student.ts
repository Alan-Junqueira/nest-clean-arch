import { Entity } from '@/core/entity/entity'
import { UniqueEntityId } from '@/core/entity/unique-entity-id'

interface IStudentProps {
  name: string
}

export class Student extends Entity<IStudentProps> {
  static create(props: IStudentProps, id?: UniqueEntityId) {
    const student = new Student(
      {
        ...props,
      },
      id,
    )

    return student
  }
}
