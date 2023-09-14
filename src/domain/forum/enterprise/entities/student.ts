import { Entity } from '@/core/entity/entity'
import { UniqueEntityId } from '@/core/entity/unique-entity-id'

interface IStudentProps {
  name: string
  email: string
  password: string
}

export class Student extends Entity<IStudentProps> {
  get name() {
    return this.props.name
  }

  get email() {
    return this.props.email
  }

  get password() {
    return this.props.password
  }

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
