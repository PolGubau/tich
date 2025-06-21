import { StudentId } from "./student-id"
import { StudentPrimitive } from "./types"



export interface StudentRepository {
  findById(id: StudentId): Promise<StudentPrimitive | null>
  save(student: StudentPrimitive): Promise<void>
  delete(id: StudentId): Promise<void>
  findAll(): Promise<StudentPrimitive[]>
}
