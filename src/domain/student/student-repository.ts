import { Student } from "./student"
import { StudentId } from "./student-id"



export interface StudentRepository {
  findById(id: StudentId): Promise<Student | null>
  save(student: Student): Promise<void>
  delete(id: StudentId): Promise<void>
  findAll(): Promise<Student[]>
}
