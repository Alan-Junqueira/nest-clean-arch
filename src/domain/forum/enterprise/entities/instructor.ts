import { Entity } from '@/core/entity/entity'
import { UniqueEntityId } from '@/core/entity/unique-entity-id'

interface IInstructorProps {
  name: string
}

export class Instructor extends Entity<IInstructorProps> {
  static create(props: IInstructorProps, id?: UniqueEntityId) {
    const student = new Instructor(
      {
        ...props,
      },
      id,
    )

    return student
  }
}
