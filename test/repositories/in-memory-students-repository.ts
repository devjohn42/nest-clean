import { DomainEvents } from '@/core/events/domain-events'
import { StudentsRepository } from '@/domain/forum/application/repositories/students-repository'
import { Student } from '@/domain/forum/enterprise/entities/Student'

export class InMemoryStudentsRepository implements StudentsRepository {
  public students: Student[] = []

  async create(student: Student) {
    this.students.push(student)

    DomainEvents.dispatchEventsForAggregate(student.id)
  }

  async findByEmail(email: string) {
    const student = this.students.find((q) => q.email.toString() === email)

    if (!student) {
      return null
    }

    return student
  }
}
