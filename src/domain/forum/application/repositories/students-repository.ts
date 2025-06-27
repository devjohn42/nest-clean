import { Student } from '../../enterprise/entities/Student'

export abstract class StudentsRepository {
  abstract create(student: Student): Promise<void>
  abstract findByEmail(email: string): Promise<Student | null>
}
